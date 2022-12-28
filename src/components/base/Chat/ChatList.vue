<template>
    <div class="chat-box-list">
        <div class="chat-box__header">
            <div v-if="!!auth" class="chat-box__user">
                <span class="photo">
                    <img
                        v-lazy="auth.avatar || '/images/avatar-placeholder.svg'"
                        :alt="auth.name"
                        :title="auth.name"
                        width="39"
                        height="39"
                    />
                </span>

                <div>
                    <span class="sub">{{ $t("Welcome") }}</span>
                    <span class="title">{{ auth.name }}</span>
                </div>
            </div>

            <button
                type="button"
                class="chat-box__close"
                aria-label="close chat"
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

        <div class="chat-list__header">
            <strong class="chat-list__header-title">{{ $t("Chats") }}</strong>

            <div class="form-group">
                <input
                    id=""
                    type="text"
                    class="form-control"
                    :placeholder="$t('Search for doctor') + '...'"
                    :value="$store.state.chat.search_value"
                    @input="
                        (e) =>
                            $store.commit('chat/setSearchValue', e.target.value)
                    "
                />

                <span class="form-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Group 5641"
                        width="15.051"
                        height="15.195"
                        viewBox="0 0 15.051 15.195"
                    >
                        <g
                            data-name="Ellipse 1390"
                            style="
                                stroke: #707070;
                                stroke-width: 2px;
                                fill: #fff;
                            "
                        >
                            <circle
                                cx="6.5"
                                cy="6.5"
                                r="6.5"
                                style="stroke: none"
                            />
                            <circle
                                cx="6.5"
                                cy="6.5"
                                r="5.5"
                                style="fill: none"
                            />
                        </g>
                        <path
                            data-name="Path 4689"
                            d="m17074.506 4448.649 3.838 3.838"
                            transform="translate(-17064 -4438)"
                            style="
                                fill: none;
                                stroke: #707070;
                                stroke-width: 2px;
                            "
                        />
                    </svg>
                </span>
            </div>
        </div>

        <div v-if="items.length" class="chat-list__items">
            <Chat-list-item v-for="item in items" :key="item.id" :data="item" />
        </div>
    </div>
</template>

<script>
import ChatListItem from "@components/base/Chat/ChatListItem";

export default {
    components: {
        ChatListItem,
    },

    computed: {
        loading() {
            return this.$store.state.chat.loading;
        },
        auth() {
            return this.$store.state.auth.user_auth;
        },
        items() {
            return this.$store.getters["chat/filteredContacts"];
        },
    },
};
</script>
