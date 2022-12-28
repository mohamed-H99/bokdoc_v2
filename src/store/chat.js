import axios from "axios";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    onSnapshot,
    query,
    orderBy,
    limit,
    getCountFromServer,
} from "firebase/firestore";
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    getMetadata,
} from "firebase/storage";
import FireApp from "../Plugins/Firebase";
import VueFinalModal from "vue-final-modal";

const chat = {
    namespaced: true,

    state: () => ({
        chat_is_active: true,
        loading: false,
        sending: false,
        uploading: false,
        uploading_percentage: 0,
        uploading_status: "",
        typing: false,
        auto_message: "",
        show_auto_message: false,
        search_value: "",
        message_seen: false,
        show_box: false,
        show_contact_data: false,
        hold_scroll: false,
        contacts: [],
        unread_count: 0,
        all_messages_count: 0,
        contact_data: {
            messages: [],
        },
        message_types: {
            image: "image",
            audio: "audio",
            file: "file",
            text: "text",
        },
        message_limit: 10,
    }),

    getters: {
        filteredContacts: (state) => {
            const searchValue = state.search_value.trim().toLowerCase();

            if (searchValue) {
                return state.contacts.filter((item) =>
                    item.contact_name.toLowerCase().match(searchValue)
                );
            } else {
                return state.contacts;
            }
        },
        getContactsCount: (state) => {
            return state.contacts.length;
        },
        getAttachmentType: (state) => (value) => {
            const types = Object.values(state.message_types);

            const res = types.find((t) => value.match(t));

            return res ?? state.message_types.file;
        },
        getAttachmentPath:
            () =>
            ({ type, name, senderId, reciverId }) => {
                let path = FireApp.PATH_NAMES[type];
                path = path.replace("{sender_id}", senderId);
                path = path.replace("{reciver_id}", reciverId);
                path = `${path}/${Date.now()}_${name}`;

                return path;
            },
    },

    mutations: {
        setData(state, payload) {
            const keys = [];

            keys.forEach((key) => {
                state[key] = payload[key];
            });
        },
        setLoading(state, payload) {
            state.loading = !!payload;
        },
        setSending(state, payload) {
            state.sending = !!payload;
        },
        setUploading(state, payload) {
            state.uploading = !!payload;
        },
        setUploadingStatus(state, payload) {
            state.uploading_status = payload;
        },
        setUploadingPercentage(state, payload) {
            state.uploading_percentage = payload;
        },
        setTyping(state, payload) {
            state.typing = !!payload;
        },
        setMessageSeen(state, payload) {
            state.message_seen = !!payload;
        },
        setAutoMessage(state, payload) {
            state.auto_message = payload;
        },
        setSearchValue(state, payload) {
            state.search_value = payload;
        },
        setUnreadCount(state, payload) {
            state.unread_count = Number(payload);
        },
        setAllMessagesCount(state, payload) {
            state.all_messages_count = Number(payload);
        },
        setContacts(state, payload) {
            state.contacts = payload;
        },
        setContactData(state, payload) {
            state.contact_data = payload;
        },
        toggleBoxView(state) {
            state.show_box = !state.show_box;
        },
        setBoxView(state, payload) {
            state.show_box = !!payload;
        },
        setContactDataView(state, payload) {
            state.show_contact_data = !!payload;
        },
        setAutoMessageView(state, payload) {
            state.show_auto_message = !!payload;
        },
        setMessageLimit(state, payload) {
            state.message_limit = Number(payload);
        },
        setHoldScroll(state, payload) {
            state.hold_scroll = !!payload;
        },
    },

    actions: {
        async findUser(ctx, userId) {
            const { USERS_COL } = FireApp.DB_NAMES;

            const docRef = doc(FireApp.db, USERS_COL, userId);
            const docSnap = await getDoc(docRef);

            return docSnap.exists();
        },

        async findContact(ctx, { userId, contactId }) {
            const { USERS_COL, CONTACTS_COL } = FireApp.DB_NAMES;

            const docRef = doc(
                FireApp.db,
                USERS_COL,
                `${userId}/${CONTACTS_COL}/${contactId}`
            );
            const docSnap = await getDoc(docRef);

            return docSnap.exists();
        },

        async fetchContacts({ commit, rootState, dispatch }) {
            const user = rootState.auth.user_auth;

            if (!user) {
                return;
            }

            const { USERS_COL, CONTACTS_COL } = FireApp.DB_NAMES;
            const userId = `${user.type}_${user.id}`;

            const userExist = await dispatch("findUser", userId);
            if (!userExist) {
                return;
            }

            const contactsRef = collection(
                FireApp.db,
                `${USERS_COL}/${userId}/${CONTACTS_COL}`
            );
            if (!contactsRef) {
                return;
            }

            const unsub = onSnapshot(contactsRef, (querySnapshot) => {
                commit("setLoading", true);
                const items = [];

                if (querySnapshot.size > 0) {
                    let unreadCount = 0;
                    querySnapshot.docs.forEach(async (doc) => {
                        items.push({
                            id: doc.id,
                            ...doc.data(),
                        });

                        if (doc.data().last_message_seen === false) {
                            unreadCount++;
                        }
                    });
                    commit("setUnreadCount", unreadCount);
                }

                // track changes
                // querySnapshot.docChanges().forEach((change) => {
                //     if (change.type === "added") {
                //         console.log("added:", change.doc.data());
                //     }
                //     if (change.type === "modified") {
                //         console.log("modified", change.doc.data());
                //     }
                //     if (change.type === "removed") {
                //         console.log("removed", change.doc.data());
                //     }
                // });

                commit("setContacts", items);
                commit("setLoading", false);
            });
        },

        async fetchContactData(
            { state, commit, rootState, dispatch },
            payload
        ) {
            const user = rootState.auth.user_auth;

            if (!user) {
                return;
            }

            const { contact_id } = payload;
            if (state.contact_data.contact_id !== contact_id) {
                commit("setContactData", {
                    messages: [],
                });
            }

            commit("setAutoMessageView", false);
            commit("setLoading", true);
            commit("setContactDataView", true);

            const { USERS_COL, CONTACTS_COL, MESSAGES_COL } = FireApp.DB_NAMES;
            const userId = `${user.type}_${user.id}`;

            const userExist = true; // await dispatch("findUser", userId);
            if (!userExist) {
                return;
            }

            const contactRef = doc(
                FireApp.db,
                USERS_COL,
                `${userId}/${CONTACTS_COL}/${contact_id}`
            );

            // update last_message_seen status to (true)
            await updateDoc(contactRef, {
                last_message_seen: true,
            });
            let contactSnap = await getDoc(contactRef);

            const messagesRef = collection(
                FireApp.db,
                `${USERS_COL}/${userId}/${CONTACTS_COL}/${contact_id}/${MESSAGES_COL}`
            );

            const q = query(
                messagesRef,
                orderBy("message_time_milliseconds", "desc"),
                limit(state.message_limit)
            );

            const unsub = onSnapshot(q, async (querySnapshot) => {
                commit("setLoading", true);
                commit("setAutoMessageView", false);
                const items = [];

                if (querySnapshot.size > 0) {
                    // set all messages count
                    const sh = await getCountFromServer(messagesRef);
                    commit("setAllMessagesCount", sh.data().count);

                    let replied = false;
                    items.slice(0, 1).forEach((item) => {
                        if (item.message_sender_id === contact_id) {
                            replied = true;
                        }
                    });

                    if (replied || querySnapshot.size > 1) {
                        commit("setAutoMessageView", false);
                        commit("setAutoMessage", "");
                        commit("setTyping", false);
                    } else {
                        setTimeout(() => {
                            commit("setAutoMessageView", true);
                            dispatch("autoMessage");
                        }, 2000);
                    }

                    querySnapshot.docs.forEach(async (doc) => {
                        items.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                }

                // track changes
                // querySnapshot.docChanges().forEach((change) => {
                //     if (change.type === "added") {
                //         console.log("added:", change.doc.data());
                //     }
                //     if (change.type === "modified") {
                //         console.log("modified", change.doc.data());
                //     }
                //     if (change.type === "removed") {
                //         console.log("removed", change.doc.data());
                //     }
                // });

                // update last_message_seen status to (true)
                if (!!state.message_seen) {
                    await updateDoc(contactRef, {
                        last_message_seen: true,
                    });
                }

                commit("setContactData", {
                    ...contactSnap.data(),
                    last_message_seen: !!state.message_seen,
                    messages: items,
                });
                commit("setLoading", false);
                console.log('"setLoading", false');
            });
            // commit("setLoading", false);
        },

        async fetchMoreMessages({ state, dispatch, commit }, payload) {
            const { contact_id } = payload;
            commit("setMessageLimit", state.message_limit + 20);
            commit("setHoldScroll", true);
            dispatch("fetchContactData", {
                contact_id,
            });
        },

        async sendMessage({ state, commit, dispatch }, payload) {
            const { sender, reciver, message } = payload;

            const { USERS_COL, CONTACTS_COL, MESSAGES_COL } = FireApp.DB_NAMES;

            const userExist = true; // await dispatch("findUser", userId);
            if (!userExist) {
                return;
            }

            const messageId = Date.now();

            const senderMessageRef = doc(
                FireApp.db,
                USERS_COL,
                `${sender.id}/${CONTACTS_COL}/${reciver.id}/${MESSAGES_COL}/${messageId}`
            );
            const senderContactRef = doc(
                FireApp.db,
                USERS_COL,
                `${sender.id}/${CONTACTS_COL}/${reciver.id}`
            );

            const reciverMessageRef = doc(
                FireApp.db,
                USERS_COL,
                `${reciver.id}/${CONTACTS_COL}/${sender.id}/${MESSAGES_COL}/${messageId}`
            );
            const reciverContactRef = doc(
                FireApp.db,
                USERS_COL,
                `${reciver.id}/${CONTACTS_COL}/${sender.id}`
            );

            try {
                // commit("setLoading", true);
                commit("setSending", true);

                const messageData = {
                    message: message.content,
                    message_type: message.type,
                    message_sender_id: sender.id,
                    message_time_milliseconds: messageId,
                };
                if (message.type !== state.message_types.text) {
                    const { contentType, name, size, type } = message.metadata;
                    messageData.metadata = { contentType, name, size, type };
                }

                const lastMessageData = {
                    last_message: message.content,
                    last_message_type: message.type,
                    last_message_sender_id: sender.id,
                    last_message_time_milliseconds: messageId,
                    last_message_seen: true,
                };

                await setDoc(senderMessageRef, messageData);
                await updateDoc(senderContactRef, {
                    ...lastMessageData,
                    last_message_seen: true,
                });

                await setDoc(reciverMessageRef, messageData);
                await updateDoc(reciverContactRef, {
                    ...lastMessageData,
                    last_message_seen: false,
                });
                commit("setSending", false);

                if (state.all_messages_count === 0) {
                    dispatch("firstMessageRequest", {
                        message: message.content,
                        surgery: state.contact_data.surgery || "",
                        reciver_id: reciver.id.replace("doctor_", ""),
                    });
                }
            } catch (err) {
                // console.log("{send}", err);
            } finally {
                // commit("setLoading", false);
                commit("setSending", false);
            }
        },

        async uploadFiles({ commit, getters, dispatch }, payload) {
            const { sender, reciver, attachment } = payload;

            try {
                // commit("setLoading", true);

                const attType = getters["getAttachmentType"](attachment.type);

                const attPath = getters["getAttachmentPath"]({
                    type: attType,
                    name: attachment.name,
                    senderId: sender.id,
                    reciverId: reciver.id,
                });

                const attRef = ref(FireApp.storage, attPath);
                const uploadTask = uploadBytesResumable(attRef, attachment);

                commit("setSending", true);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        commit("setUploading", true);
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        commit("setUploadingPercentage", progress);
                        commit("setUploadingStatus", snapshot.state);
                    },
                    (error) => {
                        commit("setUploading", false);
                        // console.log("{uploadTask}", error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            async (downloadURL) => {
                                const metadata = await getMetadata(attRef);
                                commit("setUploading", false);

                                dispatch("sendMessage", {
                                    sender,
                                    reciver,
                                    message: {
                                        content: downloadURL,
                                        type: attType,
                                        metadata,
                                    },
                                });
                            }
                        );
                    }
                );
            } catch (err) {
                // console.log("{uploadFiles}", err);
            } finally {
                // commit("setLoading", false);
                commit("setSending", false);
            }

            return "";
        },

        async addContact({ commit, dispatch, rootState, getters }, payload) {
            const { sender, reciver } = payload;

            const { USERS_COL, CONTACTS_COL } = FireApp.DB_NAMES;

            const lastMessageSchema = {
                last_message: "",
                last_message_type: "",
                last_message_seen: true,
                last_message_sender_id: "",
                last_message_time_milliseconds: -1,
            };

            // patient
            const senderLastMessage = {
                ...lastMessageSchema,
                contact_id: String(reciver.id) || "",
                contact_name: reciver.name || "",
                contact_image: reciver.image || "",
                contact_country: reciver.country.name || "",
                contact_country_id: String(reciver.country.id) || "",
                contact_device_tokens: sender.deviceIds || [],
                surgery: reciver.surgery || "",
            };

            // doctor
            const reciverLastMessage = {
                ...lastMessageSchema,
                contact_id: String(sender.id) || "",
                contact_name: sender.name || "",
                contact_image: sender.image || "",
                contact_country: sender.country.name || "",
                contact_country_id: String(sender.country.id) || "",
                contact_device_tokens: reciver.deviceIds || [],
            };

            commit("setLoading", true);
            commit("setHoldScroll", false);
            const senderExist = await dispatch("findUser", sender.id);
            const reciverExist = await dispatch("findUser", reciver.id);

            // {sender}
            if (senderExist) {
                // check [reciver] exist in [sender] contacts
                const contactExist = await dispatch("findContact", {
                    userId: sender.id,
                    contactId: reciver.id,
                });

                // create new contact
                if (!!contactExist) {
                    dispatch("fetchContactData", {
                        contact_id: reciver.id,
                    });
                    commit("setBoxView", true);
                    commit("setContactDataView", true);
                    return;
                }
                const docRef = doc(
                    FireApp.db,
                    USERS_COL,
                    `${sender.id}/${CONTACTS_COL}/${reciver.id}`
                );

                try {
                    commit("setLoading", true);
                    await setDoc(docRef, senderLastMessage);
                } catch (err) {
                    // console.log("{sender} if {}", err);
                } finally {
                    commit("setLoading", false);
                }
            } else {
                // create new sender
                try {
                    commit("setLoading", true);
                    const senderRef = doc(FireApp.db, USERS_COL, sender.id);
                    await setDoc(senderRef, {
                        id: String(sender.id) || "",
                        name: sender.name || "",
                        image: sender.image || "",
                        country: sender.country.name || "",
                        country_id: String(sender.country.id) || "",
                        device_tokens: sender.deviceIds || [],
                    });

                    const docRef = doc(
                        FireApp.db,
                        USERS_COL,
                        `${sender.id}/${CONTACTS_COL}/${reciver.id}`
                    );

                    await setDoc(docRef, senderLastMessage);
                } catch (err) {
                } finally {
                    commit("setLoading", false);
                }
            }

            // {reciver}
            if (reciverExist) {
                // check [sender] exist in [reciver] contacts
                const contactExist = await dispatch("findContact", {
                    userId: reciver.id,
                    contactId: sender.id,
                });

                // create new contact
                if (!!contactExist) {
                    // console.log("{reciver} !!contactExist");
                    dispatch("fetchContactData", {
                        contact_id: reciver.id,
                    });
                    commit("setBoxView", true);
                    commit("setContactDataView", true);
                    return;
                }
                const docRef = doc(
                    FireApp.db,
                    USERS_COL,
                    `${reciver.id}/${CONTACTS_COL}/${sender.id}`
                );

                try {
                    commit("setLoading", true);
                    await setDoc(docRef, reciverLastMessage);
                } catch (err) {
                } finally {
                    commit("setLoading", false);
                }
            } else {
                // create new reciver
                try {
                    commit("setLoading", true);
                    const reciverRef = doc(FireApp.db, USERS_COL, reciver.id);
                    await setDoc(reciverRef, {
                        id: String(reciver.id) || "",
                        name: reciver.name || "",
                        image: reciver.image || "",
                        country: reciver.country.name || "",
                        country_id: String(reciver.country.id) || "",
                        device_tokens: reciver.deviceIds || [],
                    });

                    const docRef = doc(
                        FireApp.db,
                        USERS_COL,
                        `${reciver.id}/${CONTACTS_COL}/${sender.id}`
                    );

                    await setDoc(docRef, reciverLastMessage);
                } catch (err) {
                    // console.log("{reciver} else {}", err);
                } finally {
                    commit("setLoading", false);
                }
            }

            const contactsCount = getters["getContactsCount"];
            if (contactsCount <= 0) {
                dispatch("fetchContacts");
            }

            dispatch("fetchContactData", {
                contact_id: reciver.id,
            });
            commit("setBoxView", true);
            commit("setContactDataView", true);
        },

        async autoMessage({ commit, dispatch }) {
            const translate = (key) =>
                dispatch("translate", key, { root: true });
            commit("setAutoMessage", "");

            try {
                commit("setTyping", true);

                let msg = await translate(
                    "Doctor's response rate, according to his previous conversations"
                );
                const hours = 24; // await axios.get("");
                let res = await translate(hours > 1 ? "Hours" : "Hour");

                msg = msg + ` ${hours} ${res}`;
                commit("setAutoMessage", msg);
            } catch (err) {
                // console.log(err);
            } finally {
                setTimeout(async () => {
                    commit("setTyping", false);
                }, 3000);
            }
        },

        async firstMessageRequest({ rootState }, payload) {
            const { surgery, message, reciver_id } = payload;
            const auth = rootState.auth.user_auth;
            const patient = rootState.auth.patient;

            if (!auth || !patient) {
                return;
            }

            const data = {
                deviceIds: auth.deviceIds,
                name: auth.name,
                user_id: auth.id,
                avatar: auth.avatar || "",
                countryId: patient.coutrny_id || "",
                surgery,
                patient_id: patient.id,
                message,
                provider_id: reciver_id,
            };

            try {
                await axios.post("/send-notification-chat", data);
            } catch (err) {
                // console.log("{firstMessageRequest}", err);
            } finally {
            }
        },
    },
};

export default chat;
