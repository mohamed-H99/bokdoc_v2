<template>
    <form id="" class="chat-content-form" @submit.prevent="send">
        <div class="typing-box" :class="{ show: typing }">
            <strong> {{ contactData.contact_name }}: </strong>
            <span> {{ $t("is typing") + "..." }}</span>
        </div>

        <div
            v-show="uploading"
            class="progress-bar"
            :style="{ '--p': uploadingPercentage + '%' }"
        ></div>

        <div class="form-group">
            <!-- :disabled="loading" -->
            <input
                type="text"
                class="form-control"
                :placeholder="$t('Type your message') + '...'"
                v-model.trim="messageContent"
            />
        </div>

        <div class="actions">
            <div>
                <label
                    for="attachments"
                    class="chat-btn chat-btn-sub"
                    :class="{ 'pointer-events-none': loading }"
                >
                    <svg
                        v-if="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.358"
                        height="17.377"
                        viewBox="0 0 17.358 17.377"
                    >
                        <g data-name="Group 5617">
                            <path
                                data-name="Path 4686"
                                d="m16.818 6.326-8.831 8.733a3.777 3.777 0 0 1-5.3 0 3.676 3.676 0 0 1 0-5.24l7.949-7.86a2.518 2.518 0 0 1 3.533 0 2.451 2.451 0 0 1 0 3.494L6.22 13.312a1.259 1.259 0 0 1-1.767 0 1.226 1.226 0 0 1 0-1.747l7.065-6.986-.883-.873-7.064 6.987a2.451 2.451 0 0 0 0 3.494 2.518 2.518 0 0 0 3.533 0l7.949-7.86a3.676 3.676 0 0 0 0-5.24 3.777 3.777 0 0 0-5.3 0l-8.39 8.3.03.03a4.9 4.9 0 0 0 .411 6.52 5.035 5.035 0 0 0 6.593.406l.03.03L17.7 7.2z"
                                transform="translate(-.344 -.001)"
                                style="fill: #717171"
                            />
                        </g>
                    </svg>
                    <div v-else class="chat-loader"></div>

                    <span v-show="attachments.length" class="notification">
                        {{ attachments.length }}
                    </span>
                </label>

                <input
                    id="attachments"
                    type="file"
                    multiple
                    class="hidden"
                    @change="onFileChange"
                    :disabled="loading"
                />
            </div>

            <button
                class="chat-btn chat-btn-main"
                :class="{ loading: sending || uploading }"
                :disabled="sending || uploading"
            >
                <div v-if="sending || uploading" class="progress">
                    <div>Loading…</div>
                </div>
                <span v-else>{{ $t("Send") }}</span>
            </button>
        </div>
    </form>
</template>

<script>
export default {
    computed: {
        loading() {
            return this.$store.state.chat.loading;
        },
        sending() {
            return this.$store.state.chat.sending;
        },
        uploading() {
            return this.$store.state.chat.uploading;
        },
        uploadingPercentage() {
            return this.$store.state.chat.uploading_percentage;
        },
        typing() {
            return this.$store.state.chat.typing;
        },
        contactData() {
            return this.$store.state.chat.contact_data;
        },
    },

    data() {
        return {
            attachments: [],
            messageContent: "",
        };
    },

    methods: {
        onFileChange(e) {
            this.attachments = [...e.target.files];
        },

        async send() {
            if (this.loading) {
                return;
            }

            const user = this.$store.state.auth.user_auth;
            const currentCountry = this.$store.state.geo.current_country;

            // send text message
            const content = this.messageContent;
            this.messageContent = "";
            if (content) {
                await this.$store.dispatch("chat/sendMessage", {
                    sender: {
                        id: `${user.type}_${user.id}`,
                        name: user.name,
                        image: user.avatar,
                        country: {
                            name: currentCountry.name,
                            code: currentCountry.code,
                        },
                    },
                    reciver: {
                        id: this.contactData.contact_id,
                        name: this.contactData.contact_name,
                        image: this.contactData.contact_image,
                        country: {
                            name: this.contactData.contact_country,
                        },
                    },
                    message: {
                        content,
                        type: "text",
                    },
                });
            }

            // send attachments
            if (this.attachments.length > 0) {
                this.attachments.forEach((attachment) => {
                    this.$store.dispatch("chat/uploadFiles", {
                        sender: {
                            id: `${user.type}_${user.id}`,
                            name: user.name,
                            image: user.avatar,
                            country: {
                                name: currentCountry.name,
                                code: currentCountry.code,
                            },
                        },
                        reciver: {
                            id: this.contactData.contact_id,
                            name: this.contactData.contact_name,
                            image: this.contactData.contact_image,
                            country: {
                                name: this.contactData.contact_country,
                            },
                        },
                        attachment,
                    });
                });

                this.attachments = [];
            }
        },
    },
};
</script>
