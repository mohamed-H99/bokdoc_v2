<template>
    <section
        id="landing-help"
        class="c-section bg-gradient-to-b from-primary-150 to-transparent"
    >
        <div
            class="c-section__wrapper container grid justify-between items-center gap-8 grid-cols-1 md:grid-cols-2"
        >
            <div class="c-section__content">
                <h2 class="fs-34 font-bold flex flex-col gap-1">
                    <span>{{ $t("Need help?") }}</span>
                    <span class="text-primary">
                        {{ $t("Submit your request now") }}
                    </span>
                </h2>
                <p class="mt-4 md:mt-10 fs-21">
                    {{
                        $t(
                            "We will help you with all the steps from the first comparison, selection and reservation of examination until you finish your medical procedure in a thousand safety"
                        )
                    }}
                </p>
            </div>

            <request-form
                :formId="`form-homepage-need-help`"
                :loading="loading"
                :loaded="loaded"
                @submit="(formData) => sendHelpRequest(formData)"
            />
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import RequestForm from "@pages/LandingPage/Partials/RequestForm.vue";

export default defineComponent({
    components: {
        RequestForm,
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
    },
});
</script>
