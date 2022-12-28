<template>
    <section id="landing-chat" class="c-section">
        <div class="container">
            <div class="row">
                <div class="row__content">
                    <h2 class="c-section__title fs-30 font-bold">
                        {{ title }}
                    </h2>

                    <p class="c-section__description text-xl font-normal">
                        {{ description }}
                    </p>

                    <comp-btn
                        variant="secondary"
                        as="Link"
                        rel="canonical"
                        :href="url"
                        size="xl"
                        className="rounded-full fit-content mt-6 md:ms-0"
                        style="--fs: 1rem"
                    >
                        <strong>{{ $t("Search for best doctor") }}</strong>
                    </comp-btn>
                </div>

                <div class="row__graphic">
                    <picture>
                        <source
                            srcset="/images/chat-graphic@2x.webp"
                            media="(min-width: 56.25em)"
                            type="image/webp"
                        />
                        <source
                            srcset="/images/chat-graphic@2x.png"
                            media="(min-width: 56.25em)"
                        />
                        <source
                            srcset="/images/chat-graphic.webp"
                            type="image/webp"
                        />
                        <img
                            src="/images/chat-graphic.png"
                            alt="floating chat graphic"
                            width="464"
                            height="363"
                        />
                    </picture>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
    },

    computed: {
        url() {
            return !!this.$store.state.auth.user_auth
                ? "/search"
                : "/doctor-to-compare";
        },
    },
};
</script>
