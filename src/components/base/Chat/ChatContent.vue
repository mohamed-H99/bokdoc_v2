<template>
    <div class="chat-box-content">
        <!-- header -->
        <div class="chat-box__header">
            <div class="chat-box__user">
                <div class="flex items-center gap-0">
                    <button
                        type="button"
                        class="chat-box__back"
                        @click="$store.commit('chat/setContactDataView', false)"
                    >
                        <span class="icon ltr--icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#707070"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-chevron-left"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </span>
                    </button>
                    <span class="photo">
                        <img
                            v-lazy="contactData.contact_image"
                            :alt="contactData.contact_name"
                            :title="contactData.contact_name"
                            width="39"
                            height="39"
                        />
                    </span>
                </div>

                <div>
                    <span class="title">{{ contactData.contact_name }}</span>

                    <!-- <span v-if="typing" class="sub">
                        {{ $t("Typing") + "..." }}
                    </span> -->
                </div>
            </div>

            <button
                type="button"
                class="chat-box__close"
                @click="$store.commit('chat/setBoxView', false)"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#707070"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-x"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>

        <!-- items -->
        <div
            v-if="
                loading || (contactData.messages && contactData.messages.length)
            "
            id="messagesContainer"
            class="chat-content__items h-full"
            :class="{ show_auto_reply: showAutoMessage, loading }"
        >
            <!-- load more -->
            <button
                v-show="allMessagesCount > messageLimit || loading"
                type="button"
                class="load-more"
                @click.prevent="
                    $store.dispatch('chat/fetchMoreMessages', {
                        contact_id: contactData.contact_id,
                    })
                "
            >
                <div v-if="loading || uploading" class="progress">
                    <div>Loading…</div>
                </div>
                <span v-else>{{ $t("Load more") }}</span>
            </button>
            <chat-content-item
                v-for="item in contactData.messages"
                :key="item.id"
                :data="item"
            />

            <!-- auto_reply item -->
            <div v-if="showAutoMessage" class="chat-content-item auto_reply">
                <span class="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Group 5722"
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                    >
                        <circle
                            data-name="Ellipse 1388"
                            cx="14.5"
                            cy="14.5"
                            r="14.5"
                            style="fill: #24bce3"
                        />
                        <path
                            data-name="Path 4687"
                            d="M227.745 816.449a4.37 4.37 0 0 0-.729-.776 3.267 3.267 0 0 0 .406-.612 4.806 4.806 0 0 0 .524-2.214 4.348 4.348 0 0 0-1.745-3.639 7.632 7.632 0 0 0-4.652-1.2 8.537 8.537 0 0 0-2.17.226 3.587 3.587 0 0 0-1.529.786 2.821 2.821 0 0 0-.818 1.331 7.563 7.563 0 0 0-.234 1.305c-.029.287-.05.635-.065 1.032s-.024.819-.031 1.247l-.02 1.338a92.453 92.453 0 0 0 .021 3.748c.021.807.052 1.439.094 1.933v.014a7.762 7.762 0 0 0 .223 1.255 2.633 2.633 0 0 0 .8 1.3 3.539 3.539 0 0 0 1.468.734 8.227 8.227 0 0 0 2.076.215 10.486 10.486 0 0 0 3.3-.457 6.732 6.732 0 0 0 2.265-1.221 4.6 4.6 0 0 0 1.305-1.769 4.993 4.993 0 0 0 .375-1.856 4.785 4.785 0 0 0-.217-1.417 4.385 4.385 0 0 0-.647-1.303zm-3.8-3.46a.685.685 0 0 1-.125.474 1.349 1.349 0 0 1-.533.383 4.087 4.087 0 0 1-1.019.275 8.977 8.977 0 0 1-1.287.091h-.209v-1.871a1.234 1.234 0 0 1 .028-.274 1.125 1.125 0 0 1 .225-.081 3.324 3.324 0 0 1 .828-.078 2.851 2.851 0 0 1 1.733.369.829.829 0 0 1 .36.713zm-3.174 6.293c0-.192 0-.415.01-.663.006-.231.015-.483.027-.772h1.125a9.571 9.571 0 0 1 1.175.073 3.212 3.212 0 0 1 .9.237 1.152 1.152 0 0 1 .471.368 1.04 1.04 0 0 1 .138.584 1.1 1.1 0 0 1-.521 1.035 4.175 4.175 0 0 1-2.221.471 4.091 4.091 0 0 1-.852-.068.571.571 0 0 1-.155-.052.322.322 0 0 1-.036-.1 3.331 3.331 0 0 1-.057-.7z"
                            transform="translate(-208.138 -801.742)"
                            style="fill: #fff"
                        />
                    </svg>
                </span>

                <span class="text">
                    {{ autoMessage }}
                </span>
            </div>
        </div>

        <!-- empty -->
        <div v-else class="chat-content__empty h-full">
            <div class="tip">
                {{
                    $t(
                        "Talk to the doctor now and shorten your message to help you get a quick answer, and in the event of a delay in responding to you, you will receive an e-mail alert in order to contact the doctor"
                    )
                }}
            </div>

            <div class="content">
                <div class="graphic">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="85.999"
                        height="85.999"
                        viewBox="0 0 85.999 85.999"
                    >
                        <g data-name="edit (2)">
                            <path
                                data-name="Path 4742"
                                d="M0 71.549a40.405 40.405 0 0 0 11.3 27.986L.991 107.413a2.52 2.52 0 0 0 1.534 4.517h37.94l2.187-1.623-.168-77.752-2.019-1.389A40.4 40.4 0 0 0 0 71.549z"
                                transform="translate(0 -25.932)"
                                style="fill: #f0f8ff"
                            />
                            <path
                                data-name="Path 4743"
                                d="M240.116 30.917v80.764h.197a40.381 40.381 0 0 0-.2-80.762z"
                                transform="translate(-199.784 -25.724)"
                                style="fill: #dceeff"
                            />
                            <path
                                data-name="Path 4744"
                                d="m318.583 49.64-2.524 1.2-12.686 12.655a2.518 2.518 0 0 0-.69 1.286l-1.783 8.9a2.5 2.5 0 0 0 .671 2.253l2.521-.333 20.228-20.185z"
                                transform="translate(-250.317 -41.302)"
                                style="fill: #ffdd46"
                            />
                            <path
                                data-name="Path 4745"
                                d="M122.976 180.91a2.518 2.518 0 1 0 0 5.037h17.577l2.187-1.112v-2.855l-2.187-1.07z"
                                transform="translate(-100.221 -150.523)"
                                style="fill: #5dd6f5"
                            />
                            <path
                                data-name="Path 4746"
                                d="M245.244 183.428a2.521 2.521 0 0 0-2.523-2.518h-2.6v5.037h2.6a2.521 2.521 0 0 0 2.523-2.519z"
                                transform="translate(-199.787 -150.523)"
                                style="fill: #24bce3"
                            />
                            <path
                                data-name="Path 4747"
                                d="M122.976 240.881a2.518 2.518 0 1 0 0 5.037h17.577l2.187-.965v-3.023l-2.187-1.049h-17.577z"
                                transform="translate(-100.221 -200.421)"
                                style="fill: #5dd6f5"
                            />
                            <path
                                data-name="Path 4748"
                                d="M122.976 300.852a2.518 2.518 0 1 0 0 5.037h17.577l2.187-1.259v-2.665l-2.187-1.112h-17.577z"
                                transform="translate(-100.221 -250.319)"
                                style="fill: #5dd6f5"
                            />
                            <path
                                data-name="Path 4749"
                                d="M262.926 300.852h-22.807v5.037h22.807a2.518 2.518 0 1 0 0-5.037z"
                                transform="translate(-199.787 -250.319)"
                                style="fill: #24bce3"
                            />
                            <path
                                data-name="Path 4750"
                                d="M120.453 363.341a2.521 2.521 0 0 0 2.523 2.518h17.577l2.187-1.28v-2.749l-2.187-1.007h-17.577a2.521 2.521 0 0 0-2.523 2.518z"
                                transform="translate(-100.221 -300.217)"
                                style="fill: #5dd6f5"
                            />
                            <path
                                data-name="Path 4751"
                                d="M416.282.736a2.529 2.529 0 0 0-3.568 0l-5.245 5.236-1.044 2.365 5.737 5.776 7.584-7.532.085-2.3z"
                                transform="translate(-338.159)"
                                style="fill: #5dd6f5"
                            />
                            <path
                                data-name="Path 4752"
                                d="m446.447 29.051-3.589-3.582-8.757 8.74 4.648 4.68 2.453-1.04 5.245-5.236a2.516 2.516 0 0 0 0-3.562z"
                                transform="translate(-361.186 -21.191)"
                                style="fill: #24bce3"
                            />
                            <path
                                data-name="Path 4753"
                                d="M305.142 99.117a2.507 2.507 0 0 0 2.3.71l8.921-1.78a2.527 2.527 0 0 0 1.289-.688L330.336 84.7l1.115-2.521L326.8 77.5z"
                                transform="translate(-253.888 -64.483)"
                                style="fill: #ffb54c"
                            />
                            <path
                                data-name="Path 4754"
                                d="m394.966 35.56-3.566 3.561 5.332 5.321 2.026.161 1.856-1.852-.313-1.87z"
                                transform="translate(-325.656 -29.587)"
                                style="fill: #004381"
                            />
                            <path
                                data-name="Path 4755"
                                d="m423.14 70.8 5.374 5.363 3.568-3.561-5.374-5.363-1.469 1.461-.121.121z"
                                transform="translate(-352.067 -55.945)"
                                style="fill: #001c61"
                            />
                            <g data-name="Group 5720">
                                <path
                                    data-name="Path 4756"
                                    d="M242.721 365.86a2.518 2.518 0 1 0 0-5.037h-2.6v5.037z"
                                    transform="translate(-199.787 -300.217)"
                                    style="fill: #24bce3"
                                />
                                <path
                                    data-name="Path 4757"
                                    d="M265.449 243.4a2.521 2.521 0 0 0-2.523-2.518h-22.807v5.036h22.807a2.521 2.521 0 0 0 2.523-2.518z"
                                    transform="translate(-199.787 -200.421)"
                                    style="fill: #24bce3"
                                />
                            </g>
                        </g>
                    </svg>
                </div>

                <strong class="title">
                    {{ $t("Talk to the doctor now") }}
                </strong>
            </div>
        </div>

        <!-- form -->
        <chat-content-form />
    </div>
</template>

<script lang="js">
import ChatContentForm from "@components/base/Chat/ChatContentForm";
import ChatContentItem from "@components/base/Chat/ChatContentItem";
import { useStore } from "vuex";
import { onMounted, onUnmounted } from "vue";

export default {
    components: {
        ChatContentForm,
        ChatContentItem,
    },

    setup() {
        const store = useStore();

        onMounted(() => store.commit('chat/setMessageSeen', true));
        onUnmounted(() => store.commit('chat/setMessageSeen', false));
    },

    computed: {
        loading() {
            return this.$store.state.chat.loading;
        },
        uploading() {
            return this.$store.state.chat.uploading;
        },
        contactData() {
            return this.$store.state.chat.contact_data;
        },
        typing() {
            return this.$store.state.chat.typing;
        },
        showAutoMessage() {
            return this.$store.state.chat.show_auto_message;
        },
        autoMessage() {
            return this.$store.state.chat.auto_message;
        },
        holdScroll() {
            return this.$store.state.chat.hold_scroll;
        },
        allMessagesCount() {
            return this.$store.state.chat.all_messages_count;
        },
        messageLimit() {
            return this.$store.state.chat.message_limit;
        },
    },

    methods: {
        handleScroll() {
            if(this.holdScroll) {
                return;
            }

            if(typeof document !== 'undefined') {
                const el = document.querySelector('#messagesContainer');
                if(el) {
                    setTimeout(() => {
                        el.scrollTop  = el.scrollHeight;
                    }, 10);
                }
            }
        }
    },

    watch: {
        loading(newVal) {
            if(newVal === false) {
                this.handleScroll();
            }
        },
        typing(newVal) {
            if(newVal === false) {
                this.handleScroll();
            }
        },
    },
};
</script>
