<template>
    <vue-final-modal
        :name="name"
        :content-class="`${name}-modal ${full ? 'full' : ''}`"
        :esc-to-close="true"
        zIndex="99999"
        v-model="show"
        @before-open="beforeOpen"
        @opend="opened"
        @before-close="beforeClose"
        @closed="closed"
    >
        <!-- header -->
        <header
            v-show="showHeader"
            class="c-modal__header flex justify-between flex-row-reverse gap-3 items-start bg-white relative"
        >
            <button
                class="c-modal__close c-btn--icon"
                @click.stop="$vfm.hide(name)"
            >
                <svg
                    style="width: auto; height: 16px; max-width: 100%"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                >
                    <path
                        fill="currentColor"
                        d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"
                    ></path>
                </svg>
            </button>

            <div v-if="showLogo" class="p-2">
                <img
                    height="26"
                    width="100"
                    class="inline-block"
                    :src="$store.state.core.logo || '/images/logo.svg'"
                    :onerror="`this.src='${'/images/logo.svg'}'`"
                    :alt="$store.state.core.site_name"
                />
            </div>
        </header>

        <!-- body -->
        <div class="c-modal__body">
            <slot name="body"></slot>
        </div>
    </vue-final-modal>
</template>

<script>
import VueFinalModal from "vue-final-modal";

export default {
    components: { VueFinalModal },

    emits: [
        "params",
        "status",
        "beforeOpen",
        "opened",
        "beforeClose",
        "closed",
    ],

    props: {
        name: {
            type: String,
            default: () => "",
            required: true,
        },
        showHeader: {
            type: Boolean,
            default: () => true,
        },
        showLogo: {
            type: Boolean,
            default: () => false,
        },
        full: {
            type: Boolean,
        },
    },

    data() {
        return {
            show: false,
        };
    },

    methods: {
        beforeOpen(event) {
            this.$emit("beforeOpen", event);
            this.$emit("params", event.ref.params.value);
            this.$emit("status", "beforeOpen");
        },
        opened(event) {
            this.$emit("opened", event);
            this.$emit("status", "opened");
        },
        beforeClose(event) {
            this.$emit("beforeClose", event);
            this.$emit("status", "beforeClose");
        },
        closed(event) {
            this.$emit("closed", event);
            this.$emit("status", "closed");
        },
    },
};
</script>
