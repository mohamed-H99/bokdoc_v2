<template>
    <section class="section-v2 news-letter-v2">
        <!--  -->
        <div class="main text-center">
            <div class="container">
                <h2 class="section__title">
                    {{ $t("Installments and Pay at your Convenience") }}
                </h2>
                <p class="section__subtitle">
                    {{ $t("Sign up and we'll send the best deals to you") }}
                </p>

                <form @submit.prevent="submit">
                    <div class="form-group">
                        <input
                            type="email"
                            class="form-control"
                            :placeholder="$t('Your Email')"
                            v-model.trim="email"
                            required
                        />

                        <comp-btn
                            variant="secondary"
                            size=""
                            class="rounded"
                            style=""
                            :loading="loading"
                        >
                            <span>{{ $t("Subscribe") }}</span>
                        </comp-btn>
                    </div>
                </form>
            </div>
        </div>
        <!--  -->
        <footer class="footer text-center">
            <div class="container">
                <div>
                    {{ $t("If you are a") }}
                    <span class="highlight text-primary">
                        {{ $t("Doctor") }}
                    </span>
                    {{
                        $t(
                            "and interested in serving as many patients as possible"
                        ) + ", "
                    }}
                    <button
                        type="button"
                        class="link"
                        @click.prevent="$vfm.show('join')"
                    >
                        {{ $t("join us") }}
                    </button>
                </div>
            </div>
        </footer>
    </section>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            loading: false,
            email: "",
        };
    },

    methods: {
        async submit() {
            try {
                this.loading = true;
                const res = await axios.post("/", { email });
                console.log(res);
                this.$vfm.show("message", {
                    message: {
                        title: this.$t("Thank you"),
                        description: this.$t("You have joined our newsletter"),
                    },
                    type: "success",
                    code: 200,
                });
            } catch (err) {
                //
                this.$vfm.show("message", {
                    type: "error",
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
