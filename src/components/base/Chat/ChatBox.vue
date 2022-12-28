<template>
    <div class="chat-box" :class="{ '!h-auto': !auth, show: showBox }">
        <!-- <chat-auth v-if="!auth" /> -->

        <chat-content v-if="showContactData" />

        <chat-list v-else />
    </div>
</template>

<script lang="js">
import ChatAuth from "@components/base/Chat/ChatAuth.vue";
import ChatList from "@components/base/Chat/ChatList.vue";
import ChatContent from "@components/base/Chat/ChatContent.vue";

export default {
    components: {
        ChatAuth,
        ChatList,
        ChatContent,
    },

    computed: {
        loading() {
            return this.$store.state.chat.loading
        },
        auth() {
            return this.$store.state.auth.user_auth
        },
        showBox() {
            return this.$store.state.chat.show_box
        },
        showContactData() {
            return this.$store.state.chat.show_contact_data
        },
    },
};
</script>
