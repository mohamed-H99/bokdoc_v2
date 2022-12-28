<template>
    <div
        ref="helpFooter"
        class="help-footer transition-opacity duration-500 bg-white"
    >
        <div class="container flex flex-row justify-center items-center gap-4">
            <div class="help-footer__content">
                <div class="help-footer__avatar rounded-full overflow-hidden">
                    <img
                        :src="
                            data.image ||
                            $store.getters['core/avatarPlaceholder']({
                                gender: '',
                                type: 'support',
                            })
                        "
                        :class="{ 'placeholder sm': !data.image }"
                        :alt="data.name"
                        width="60"
                        height="60"
                    />
                </div>

                <div>
                    <h3 class="help-footer__title long--text">
                        {{ data.name }}
                    </h3>
                    <p class="help-footer__subtitle long--text">
                        {{ $t("Personal Medical Assistant") }}
                    </p>
                </div>
            </div>

            <comp-btn
                :as="$store.state.auth.user_auth ? 'button' : 'Link'"
                href="/contact-us"
                variant="secondary"
                rel="canonical"
                size=""
                className="rounded text-sm font-normal"
                :loading="$store.state.search.subLoading"
                @click.prevent="$emit('sendHelp')"
            >
                <span>{{ $t("Contact us") }}</span>
            </comp-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, default: () => ({}), required: true },
        targetSelector: { type: String, required: false },
    },

    mounted() {
        if (!window) return;
        window.addEventListener("scroll", this.handleHelpFooterVisibility, {
            passive: true,
        });
    },

    beforeDestroy() {
        if (!window) return;
        window.removeEventListener("scroll", this.handleHelpFooterVisibility);
    },

    methods: {
        handleHelpFooterVisibility() {
            if (!this.$store.getters["core/isBrowser"]) {
                return;
            }
            let target = document.querySelector(this.targetSelector);
            const el = this.$refs.helpFooter;
            if (!el) {
                return;
            }

            // console.log(`scrollY:${window.scrollY}`);
            // console.log(`t: ${target.offsetTop}, h: ${target.offsetHeight}`);

            if (target) {
                if (window.scrollY >= target.offsetTop)
                    el.classList.add("show");
            } else {
                if (window.scrollY >= window.outerHeight)
                    el.classList.add("show");
            }
        },
    },
};
</script>
