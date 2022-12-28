<template>
    <div
        class="help-box sm:rounded-xl bg-secondary-100 p-6 sm:p-8 flex flex-col md:flex-row gap-5 items-center justify-between"
    >
        <h3 class="help-box__text fs-20 font-bold">
            {{
                text
                    ? text.title
                    : $t("Can not find what you are looking for ?")
            }}
            <span class="text-primary block md:inline">
                {{
                    text
                        ? text.highlight
                        : $t("We can help you send a request to us")
                }}
            </span>
        </h3>

        <comp-btn
            variant="primary"
            as="button"
            size="lg"
            className="rounded-full help-box__btn font-normal"
            @click.prevent="handleClick"
            :loading="loading"
        >
            <span>{{ $t("Send to us now") }}</span>
        </comp-btn>
    </div>

    <request-help-modal v-if="!$store.state.auth.user_auth" :noTitle="true" />
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
    components: {
        RequestHelpModal: defineAsyncComponent(() =>
            import("@components/modal/RequestHelpModal")
        ),
    },

    props: {
        text: {
            type: Object,
            default: () => null,
        },
    },

    data() {
        return {
            loading: false,
        };
    },

    methods: {
        async handleClick() {
            if (!!this.$store.state.auth.user_auth) {
                try {
                    this.loading = true;

                    const data = {
                        speciality:
                            this.$route.params.specialty ||
                            this.$route.params.speciality ||
                            "",
                        surgery: this.$route.params.surgery || "",
                        description: this.$t(
                            "I can't find what I'm looking for"
                        ),
                    };

                    await this.$store.dispatch("core/sendHelpRequest", data);
                    this.$vfm.show("message", {
                        type: "success",
                    });
                } catch (err) {
                    this.$vfm.show("message", {
                        type: "error",
                    });
                } finally {
                    this.loading = false;
                }
            } else {
                this.$vfm.show("request-help", {
                    skipStep: true,
                });
            }
        },
    },
};
</script>
