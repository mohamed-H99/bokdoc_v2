<template>
    <default-modal
        :name="modalName"
        @params="getParams"
        @beforeClose="beforeClose"
    >
        <template #body>
            <div class="c-modal__body flex flex-col items-center gap-8 p-8">
                <div
                    class="flex flex-col items-center text-center gap-4 w-11/12 md:w-3/4"
                >
                    <div class="mb-6">
                        <img
                            :src="
                                $store.state.core.logo ||
                                '/images/default-logo.svg'
                            "
                            onerror="this.src='/images/default-logo.svg'"
                            :alt="$store.state.core.site_name"
                            :title="$store.state.core.site_name"
                            class="block mx-auto"
                            width="160"
                            height=""
                        />
                    </div>

                    <div class="country-modal__heading">
                        {{
                            $t(
                                "We welcome you to the BokDoc platform for medical operations and procedures"
                            )
                        }}
                    </div>
                </div>

                <form :id="formId" class="w-full country-form" @submit.prevent>
                    <!-- title/label -->
                    <div class="country-form__label">
                        {{
                            $t(
                                "In which country are you currently looking for a surgeon?"
                            )
                        }}
                    </div>

                    <!-- items -->
                    <div
                        v-if="
                            $store.state.geo.supported_countries &&
                            $store.state.geo.supported_countries.length
                        "
                        class="items grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                    >
                        <div
                            class="w-full"
                            v-for="item in $store.state.geo.supported_countries"
                            :key="item.id"
                        >
                            <input
                                type="radio"
                                :id="`${item.name}_${item.id}`"
                                name="select_country"
                                class="form-control !hidden"
                                @select="() => select(item)"
                            />
                            <label
                                :for="`${item.name}_${item.id}`"
                                class="item transition-colors bg-light-200 hover:bg-light-860 flex flex-col items-center overflow-hidden p-5 pb-4 rounded-xl cursor-pointer"
                            >
                                <span v-show="item.icon" class="flag">
                                    <img
                                        :src="item.icon"
                                        :alt="item.name"
                                        width="43"
                                        height="43"
                                    />
                                </span>
                                <strong class="text-sm font-bold">
                                    {{ item.name }}
                                </strong>
                            </label>
                        </div>
                    </div>

                    <!-- logos -->
                    <div class="country-form__footer">
                        <img
                            height="26.5"
                            width=""
                            class="m-0 object-contain max-w-full block mx-auto logos"
                            :src="$store.state.core.payments_logo"
                            alt="payments logo"
                        />
                    </div>
                </form>
            </div>
        </template>
    </default-modal>
</template>

<script>
import DefaultModal from "@components/modal/DefaultModal.vue";
import Cookies from "js-cookie";

export default {
    components: { DefaultModal },

    computed: {
        modalName() {
            return "country";
        },

        formId() {
            return `select-country-form`;
        },

        cookieKey() {
            return "client_country";
        },
    },

    data() {
        return {
            loading: false,
            formData: {
                counrtry: null,
            },
        };
    },

    methods: {
        getParams(params) {
            //
        },

        beforeClose() {
            if (!this.country) {
                Cookies.set(this.cookieKey, "pending", {
                    expires: 7,
                });
            }
        },

        select(data) {
            this.loading = true;
            Cookies.set(this.cookieKey, JSON.stringify(data));
            setTimeout(() => {
                this.loading = false;
            }, 1000);

            this.$vfm.hide(this.modalName);
        },

        mountComp() {
            const cookieExist = Cookies.get(this.cookieKey);

            if (!cookieExist) {
                setTimeout(() => {
                    this.$vfm.show(this.modalName);
                }, 5000);
            }
        },
    },
};
</script>
