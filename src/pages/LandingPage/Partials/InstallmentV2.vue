<template>
    <section id="landing-installment" class="section-v2 installment-v2">
        <div
            class="container grid justify-between items-center gap-8 grid-cols-1 md:grid-cols-2"
        >
            <div class="section__content">
                <h2 class="section__title font-bold flex flex-col gap-1">
                    {{ $t("Need installment for your surgery?") }}
                </h2>
                <p class="section__subtitle">
                    {{
                        $t(
                            "The first site & app to installment any surgery or procedure"
                        )
                    }}
                </p>

                <ul class="section__list">
                    <li v-for="(item, index) in items" :key="index">
                        <span class="icon">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="m0 0h24v24h-24z" fill="none" />
                                <path
                                    d="m9 16.17-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"
                                    fill="currentColor"
                                />
                            </svg>
                        </span>
                        <span>{{ $t(item) }}</span>
                    </li>
                </ul>
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

    computed: {
        items() {
            return [
                "Installment up to 60 months",
                "Compliant with the provisions of Islamic Sharia",
                "Without upfront",
            ]
        },
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
