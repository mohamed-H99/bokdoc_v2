<template>
    <div v-if="contactsCount > 0" class="chat">
        <button
            v-if="!!auth"
            type="button"
            class="chat-btn"
            @click="$store.commit('chat/toggleBoxView')"
            aria-label="toggle chat"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
            >
                <g data-name="Group 5613" transform="translate(-1768 -6923)">
                    <circle
                        data-name="Ellipse 1386"
                        cx="42.5"
                        cy="42.5"
                        r="42.5"
                        transform="translate(1768 6923)"
                        style="fill: #24bce3"
                    />
                    <g data-name="chat (6)">
                        <g data-name="Group 5605">
                            <g data-name="Group 5604">
                                <path
                                    data-name="Path 4683"
                                    d="M15.7 155C7.082 155 0 160.921 0 168.2a12.3 12.3 0 0 0 3.2 8.161L.276 179.7a1.116 1.116 0 0 0 .84 1.85h15.7c6.36 0 14.579-5.476 14.579-13.352C31.39 160.921 24.308 155 15.7 155zm-6.774 15.247a2.232 2.232 0 1 1 2.232-2.232 2.234 2.234 0 0 1-2.232 2.232zm6.769 0a2.232 2.232 0 1 1 2.232-2.232 2.234 2.234 0 0 1-2.227 2.232zm6.769 0a2.232 2.232 0 1 1 2.232-2.232 2.234 2.234 0 0 1-2.232 2.232z"
                                    transform="translate(1791.457 6802.988)"
                                    style="fill: #fff"
                                />
                            </g>
                        </g>
                        <g data-name="Group 5607">
                            <g data-name="Group 5606">
                                <path
                                    data-name="Path 4684"
                                    d="m151.28 22.71-2.627-3.065a11.083 11.083 0 0 0 2.9-7.366c0-6.768-6.507-12.273-14.5-12.273-7.232 0-13.377 4.507-14.461 10.373A20.645 20.645 0 0 1 129.16 9.3c9.771 0 17.8 6.825 17.916 15.249h3.358a1.117 1.117 0 0 0 .846-1.839z"
                                    transform="translate(1677.992 6946.451)"
                                    style="fill: #fff"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>

            <span v-show="unreadCount > 0" class="chat-notification">
                {{ unreadCount }}
            </span>
        </button>

        <chat-box />
        <chat-attachment-modal />
    </div>
</template>

<script>
import ChatBox from "@components/base/Chat/ChatBox.vue";
import ChatAttachmentModal from "@components/modal/ChatAttachmentModal.vue";

export default {
    components: {
        ChatBox,
        ChatAttachmentModal,
    },

    computed: {
        unreadCount() {
            return this.$store.state.chat.unread_count;
        },
        auth() {
            return this.$store.state.auth.user_auth;
        },
        contactsCount() {
            return this.$store.getters["chat/getContactsCount"];
        },
    },

    mounted() {
        this.$store.dispatch("chat/fetchContacts");
    },
};
</script>
