<template>
    <section id="landing-chat" class="section-v2 chat-v2">
        <div class="container">
            <div class="row">
                <div class="row__content">
                    <h2 class="section__title">
                        {{ $t("Now talk to doctors in all specialties") }}
                    </h2>

                    <p class="section__description">
                        {{
                            $t(
                                "You can talk with all doctors in all medical specialties before you get a medical procedure, and you will receive a quick answer from the doctor. This helps you to speed up and complete your medical procedure"
                            )
                        }}
                    </p>

                    <comp-btn
                        variant="secondary"
                        as="Link"
                        rel="canonical"
                        :href="url"
                        size="xl"
                        className="rounded fit-content mt-6 md:ms-0"
                        style="--fs: 1rem"
                    >
                        <strong>{{ $t("Continue Booking") }}</strong>
                    </comp-btn>
                </div>

                <div class="row__graphic">
                    <img
                        src="/images/section-chat-graphic.svg"
                        alt="chat graphic"
                        width="523.626"
                        height="410"
                    />
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
