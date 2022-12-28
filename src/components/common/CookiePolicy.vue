<template>
    <div class="cookie-policy" :class="{ show }">
        <div class="cookie-policy__header">
            <button
                type="button"
                class="close transition-colors hover:bg-light-860"
                @click.prevent="close"
            >
                &times;
            </button>
        </div>

        <div class="cookie-policy__body">
            <strong class="title">
                {{ $t("Cookie Policy") }}
            </strong>
            <div class="description">
                {{
                    $t(
                        "We use first and third party cookies. You can choose your preferences below. Your consent can be revoked. Read our cookie policy"
                    )
                }}
            </div>

            <button
                class="submit transition-colors cursor-pointer font-bold w-full flex items-center justify-center p-5 rounded-xl"
                @click.prevent="accept"
                :disabled="loading"
            >
                <div v-show="loading" class="progress"><div>Loading…</div></div>
                <span>{{ loading ? $t("Saving") : $t("Accept") }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
    data() {
        return {
            show: false,
            loading: false,
        };
    },

    computed: {
        cookieKey() {
            return "cookies_status";
        },
        cookieStatus() {
            return ["accepted", "pending"];
        },
    },

    methods: {
        close() {
            this.show = false;
            this.loading = false;
            Cookies.set(this.cookieKey, this.cookieStatus[1], {
                expires: 1,
            });
        },

        accept() {
            this.loading = true;
            Cookies.set(this.cookieKey, this.cookieStatus[0]);

            setTimeout(() => {
                this.loading = false;

                this.close();
            }, 1000);
        },

        mountComp() {
            const status = Cookies.get(this.cookieKey);

            const res = this.cookieStatus.find((s) => s === status);

            if (!res) {
                setTimeout(() => {
                    this.show = true;
                }, 5000);
            }
        },
    },

    mounted() {
        this.mountComp();
    },
};
</script>
