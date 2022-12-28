<template>
    <section id="landing-help" class="section-v2 help-v2">
        <div
            class="container grid justify-between items-center gap-8 grid-cols-1 md:grid-cols-2"
        >
            <div class="section__content">
                <h2 class="section__title font-bold flex flex-col gap-1">
                    <span>{{ $t("Need help?") }}</span>
                    <span>
                        {{ $t("Submit your request now") }}
                    </span>
                </h2>
                <p class="section__subtitle">
                    {{
                        $t(
                            "We will help you with all the steps from the first comparison, selection and reservation of examination until you finish your medical procedure in a thousand safety"
                        )
                    }}
                </p>
            </div>

            <request-form-v2
                :formId="`form-homepage-need-help`"
                :loading="loading"
                :loaded="loaded"
                @submit="(formData) => sendHelpRequest(formData)"
            />
        </div>
    </section>
</template>

<script lang="js">
import RequestFormV2 from "@pages/LandingPage/Partials/RequestFormV2.vue";


export default {
    components: {
        RequestFormV2
    },

    data() {
        return {
            loading: false,
            loaded: false,
        };
    },

    methods: {
        sendHelpRequest({ name, age, gender, phone, description, utm }) {
            const data = {
                name,
                phone: phone.parsedPhone,
                age,
                gender,
                description,
                type: "contact form",
                utm,
            };

            this.$inertia.post("/store/contact", data, {
                preserveScroll: true,
                onStart: () => {
                    this.loading = true;
                    this.loaded = false;
                },
                onSuccess: () => {
                    this.$store.dispatch('core/gtagEvent', {
                        event: "gtm.formSubmit",
                    });

                    this.$vfm.show("message", {
                        type: "success",
                    });
                },
                onError: (err) => {
                    console.log({ err });
                },
                onFinish: () => {
                    this.loading = false;
                    this.loaded = true;
                },
            });
        },
    }
};
</script>
