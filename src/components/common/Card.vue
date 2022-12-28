<template>
    <div
        class="search-card relative text-black rounded-xl border border-light-600 bg-white"
    >
        <span
            v-if="
                data.has_discount_clinic ||
                (data.provider && data.provider.provides_appointment)
            "
            class="badge-overlay badge-overlay__outside"
        >
            {{
                data.provider && data.provider.provides_appointment
                    ? $t("Free appointment")
                    : $t("Discount on examination")
            }}
        </span>

        <div class="search-card__wrapper grid grid-cols-1 items-start gap-6">
            <div>
                <div
                    class="header flex flex-col items-center gap-5 md:gap-0 md:flex-row md:items-start"
                >
                    <Link
                        rel="canonical"
                        :href="`/surgery/${data.type}/${specialitySlug}/${
                            provider.slug
                        }/${
                            $store.state.localization.current_locale === 'ar'
                                ? data.covered_surgery_slug_ar ||
                                  data.covered_surgery_slug_en
                                : data.covered_surgery_slug_en ||
                                  data.covered_surgery_slug_ar
                        }`"
                        class="avatar-wrapper bg-primary-100 !border-primary-300 rounded-xl overflow-hidden flex items-center justify-center"
                    >
                        <img
                            v-lazy="provider.image"
                            :alt="data.provider ? provider.name : ''"
                            :title="data.provider ? provider.name : ''"
                            class="avatar w-full h-full object-cover"
                            :class="{
                                placeholder: !data.provider.photo,
                            }"
                            height="200"
                            width="200"
                        />

                        <span
                            v-if="
                                data.providerRelatedHostpital !== null &&
                                data.type !== 'hospital'
                            "
                            class="logo"
                        >
                            <img
                                :src="
                                    data.providerRelatedHostpital['media']
                                        ? `${data.providerRelatedHostpital['media']}&h=90`
                                        : ''
                                "
                                :alt="data.providerRelatedHostpital['name']"
                                width="90"
                                height="90"
                            />
                        </span>
                    </Link>

                    <div>
                        <Link
                            rel="canonical"
                            :href="`/surgery/${data.type}/${specialitySlug}/${
                                provider.slug
                            }/${
                                $store.state.localization.current_locale ===
                                'ar'
                                    ? data.covered_surgery_slug_ar ||
                                      data.covered_surgery_slug_en
                                    : data.covered_surgery_slug_en ||
                                      data.covered_surgery_slug_ar
                            }`"
                            class="title fs-20 hover:text-primary font-normal"
                        >
                            {{
                                data.type === "doctor"
                                    ? `${$t("Dr.")} ${provider.name}`
                                    : provider.name
                            }}
                        </Link>

                        <div
                            v-if="data.provider && data.provider.description"
                            class="fs-13 description"
                            v-html="data.provider.description"
                        ></div>

                        <ul
                            class="list flex flex-col text-black items-start mx-8 xs:max-5 md:mx-auto"
                        >
                            <li
                                class="item flex items-center"
                                v-if="
                                    data.providerRelatedHostpital ||
                                    data.type === 'hospital'
                                "
                            >
                                <span class="item__icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="13.538"
                                        viewBox="0 0 16 13.538"
                                    >
                                        <path
                                            data-name="Path 3908"
                                            d="M18.385 11.154h-2.462V5.615A.615.615 0 0 0 15.308 5H6.692a.615.615 0 0 0-.615.615v5.538H3.615a.615.615 0 0 0-.615.616v6.154a.615.615 0 0 0 .615.615h6.154a.615.615 0 0 0 .615-.615v-2.461h1.231v2.462a.615.615 0 0 0 .615.615h6.154a.615.615 0 0 0 .616-.616v-6.154a.615.615 0 0 0-.615-.615zM4.231 12.385h1.846v4.923H4.231zm8 1.846H9.769a.615.615 0 0 0-.615.615v2.462H7.308V6.231h7.385v11.077h-1.847v-2.462a.615.615 0 0 0-.615-.615zm5.538 3.077h-1.846v-4.923h1.846zm-4.923-6.769h-1.231v1.231a.615.615 0 0 1-1.231 0v-1.232h-1.23a.615.615 0 0 1 0-1.231h1.231v-1.23a.615.615 0 0 1 1.231 0v1.231h1.231a.615.615 0 0 1 0 1.231z"
                                            style="fill: #24bce3"
                                            transform="translate(-3 -5)"
                                        />
                                    </svg>
                                </span>
                                <span class="text-sm">
                                    {{
                                        data.type === "hospital"
                                            ? $t("Hospital")
                                            : $t("Belongs to Hospital")
                                    }}
                                </span>
                            </li>
                            <!-- short_address -->
                            <li
                                v-if="
                                    data.provider_address_short_address_ar ||
                                    data.provider_address_short_address_en
                                "
                                class="item flex items-center"
                            >
                                <span class="item__icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="11.767"
                                        height=""
                                        viewBox="0 0 20 26.667"
                                    >
                                        <g id="Pin" transform="translate(-8)">
                                            <path
                                                id="Path_420"
                                                data-name="Path 420"
                                                d="M18,0A10.013,10.013,0,0,0,8,10c0,7.179,9.317,16.171,9.712,16.55a.413.413,0,0,0,.575,0C18.683,26.171,28,17.179,28,10A10.013,10.013,0,0,0,18,0Zm0,14.583A4.583,4.583,0,1,1,22.583,10,4.583,4.583,0,0,1,18,14.583Z"
                                                fill="#24bce3"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <span class="text-sm">
                                    {{
                                        $store.state.localization
                                            .current_locale === "ar"
                                            ? data.provider_address_short_address_ar
                                            : data.provider_address_short_address_en
                                    }}
                                </span>
                            </li>
                            <!-- phone -->
                            <li
                                v-if="$store.state.core.contact_us_number"
                                class="item flex items-center"
                            >
                                <span class="item__icon">
                                    <svg
                                        height="11.767"
                                        viewBox="0 0 11.767 11.767"
                                        width="11.767"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="m5.465 10.751-4.449-4.451a3.462 3.462 0 0 1 0-4.9l1.301-1.3a.345.345 0 0 1 .519.037l2.216 2.954a.345.345 0 0 1 -.032.451l-1.32 1.324a.394.394 0 0 0 0 .557l2.644 2.647a.394.394 0 0 0 .557 0l1.324-1.324a.345.345 0 0 1 .451-.032l2.953 2.216a.345.345 0 0 1 .037.519l-1.3 1.3a3.462 3.462 0 0 1 -4.9 0z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>
                                <a
                                    :href="`tel:${$store.state.core.contact_us_number}`"
                                    class="ltr text-sm"
                                    rel="noreferrer"
                                >
                                    {{ $store.state.core.contact_us_number }}
                                </a>
                            </li>
                        </ul>

                        <button
                            v-if="
                                $store.state.chat.chat_is_active &&
                                data.type === 'doctor' &&
                                $store.state.auth.user_auth
                            "
                            type="button"
                            class="custom-chat-btn !w-full mt-5"
                            :class="{ loading: loading }"
                            :disabled="loading || chatLoading"
                            @click.prevent="addToContacts"
                        >
                            <span class="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22.492"
                                    height="22.492"
                                    viewBox="0 0 22.492 22.492"
                                >
                                    <g data-name="Group 5685">
                                        <g data-name="chat (6)">
                                            <g data-name="Group 5605">
                                                <g data-name="Group 5604">
                                                    <path
                                                        data-name="Path 4683"
                                                        d="M9.269 155C4.182 155 0 158.5 0 162.8a7.262 7.262 0 0 0 1.889 4.819l-1.726 1.969a.659.659 0 0 0 .5 1.093h9.265c3.756 0 8.61-3.234 8.61-7.885 0-4.296-4.182-7.796-9.269-7.796zm-4 9.006a1.318 1.318 0 1 1 1.318-1.318A1.32 1.32 0 0 1 5.272 164zm4 0a1.318 1.318 0 1 1 1.318-1.318A1.32 1.32 0 0 1 9.269 164zm4 0a1.318 1.318 0 1 1 1.318-1.318 1.32 1.32 0 0 1-1.32 1.312z"
                                                        transform="translate(0 -148.189)"
                                                        style="
                                                            fill: currentColor;
                                                        "
                                                    />
                                                </g>
                                            </g>
                                            <g data-name="Group 5607">
                                                <g data-name="Group 5606">
                                                    <path
                                                        data-name="Path 4684"
                                                        d="m139.531 13.415-1.551-1.81a6.546 6.546 0 0 0 1.71-4.35c0-4-3.843-7.248-8.566-7.248-4.271 0-7.9 2.662-8.541 6.126a12.192 12.192 0 0 1 3.884-.635c5.77 0 10.511 4.03 10.581 9.006h1.983a.66.66 0 0 0 .5-1.089z"
                                                        transform="translate(-117.198 -.006)"
                                                        style="
                                                            fill: currentColor;
                                                        "
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </span>

                            <div
                                class="flex flex-wrap items-center justify-start text-start w-full"
                            >
                                <span class="sub">
                                    {{ $t("Chat Now With") }}
                                </span>
                                <span class="highlight">
                                    {{
                                        `${
                                            provider.type === "doctor"
                                                ? $t("Dr.")
                                                : ""
                                        } ${provider.name}`
                                    }}
                                </span>
                            </div>

                            <span class="arrow rtl--icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-chevron-left"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </span>
                        </button>

                        <table
                            class="custom-prop text-gray-430"
                            v-if="data.custom_props && data.custom_props.length"
                        >
                            <tbody>
                                <tr
                                    v-for="(item, i) in data.custom_props"
                                    :key="i"
                                >
                                    <td v-if="item.price !== '-1'">
                                        {{ item.name }}
                                    </td>
                                    <td v-if="item.price !== '-1'">
                                        {{
                                            item.price !== 0
                                                ? `${$store.state.payments.current_currency_symbol} ${item.price}`
                                                : $t("Free")
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="continue">
                <div class="item flex items-center mb-1">
                    <span class="item__icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.914"
                            height="15.691"
                            viewBox="0 0 16.914 15.691"
                        >
                            <path
                                data-name="Path 3907"
                                d="M15.979 3.233c-1.7-.614-3.691.062-5.521 1.854C8.627 3.295 6.64 2.619 4.936 3.233S2.115 5.668 2 8.035c.093 5.692 5.86 9.435 7.625 10.446a1.68 1.68 0 0 0 1.665 0C13.055 17.47 18.822 13.727 18.914 8c-.114-2.327-1.239-4.152-2.936-4.763zM5.346 4.37c1.7-.492 3.073.35 4.666 1.994a.608.608 0 0 0 .892 0c1.605-1.757 3.305-2.485 4.666-1.994 1.229.442 2.048 1.854 2.137 3.646a7.481 7.481 0 0 1-.4 2.238h-3.173a.6.6 0 0 0-.5.259l-.607.873-.955-2.5a.6.6 0 0 0-.56-.389.6.6 0 0 0-.562.382l-1.205 3.037L7.889 7.12a.6.6 0 0 0-1.131.011l-1.135 3.123H3.6a7.384 7.384 0 0 1-.39-2.2c.09-1.831.909-3.243 2.138-3.685zm5.343 13.063a.461.461 0 0 1-.463 0c-1.224-.7-4.538-2.824-6.135-5.971h1.955a.6.6 0 0 0 .568-.4l.729-2.006 1.831 4.734a.6.6 0 0 0 .561.386.6.6 0 0 0 .565-.376l1.2-3.029.808 2.119a.6.6 0 0 0 1.061.129l1.08-1.553h2.366a16.124 16.124 0 0 1-6.126 5.967z"
                                style="fill: #24bce3"
                                transform="translate(-2 -3.011)"
                            />
                        </svg>
                    </span>
                    <span class="text-sm">
                        {{
                            $store.state.localization.current_locale === "ar"
                                ? data.covered_surgery_name_ar ||
                                  data.covered_surgery_name
                                : data.covered_surgery_name_en ||
                                  data.covered_surgery_name
                        }}
                    </span>
                </div>

                <div class="continue__price flex flex-wrap md:block gap-1">
                    <span
                        class="continue__price-title text-gray-495"
                        :class="{ 'w-full': data.amount_discount }"
                    >
                        {{ $t("Starts from") }}
                    </span>
                    <strong class="continue__price-main text-primary">
                        {{
                            ` ${
                                $store.state.payments.current_currency_symbol
                            } ${
                                data.net_fees_surgery_amount ||
                                data.net_fees_surgery
                            }`
                        }}
                    </strong>
                    <del
                        v-if="data.amount_discount"
                        class="text-gray-450 fs-13"
                    >
                        {{
                            ` ${$store.state.payments.current_currency_symbol} ${data.covered_surgery_net_amount_from_ex_format}`
                        }}
                    </del>
                </div>

                <div
                    v-if="
                        data.installment_amount_surgery &&
                        data.installment_amount_surgery !== '0'
                    "
                    class="continue__installment text-gray-510 text-xs"
                >
                    {{
                        `${$t(
                            "Interest-free installments are available starting from"
                        )}  ${
                            " " +
                            (data.installment_amount_surgery !== null &&
                                data.installment_amount_surgery !== 0 &&
                                data.installment_amount_surgery !== "0")
                                ? Math.ceil(data.installment_amount_surgery)
                                : data.installment_amount_surgery
                        } ${$store.state.payments.current_currency_symbol} ${$t(
                            "Monthly"
                        )}`
                    }}
                </div>

                <!-- badges -->
                <div
                    v-show="data.provider_id_discount || data.end_date_discount"
                    class="badges flex justify-center md:justify-start flex-wrap"
                >
                    <span
                        v-if="
                            data.provider_id_discount && !data.end_date_discount
                        "
                        class="badge rounded-full bg-secondary-50 text-secondary-775"
                    >
                        {{ $t("Discount") }}
                    </span>
                    <span
                        v-if="data.provider_id_discount && !discountExpired"
                        class="badge rounded-full bg-cyan-250 text-cyan-650"
                    >
                        {{ $t("Temporary discount") }}
                    </span>
                </div>

                <div>
                    <comp-btn
                        v-if="data.provider && !data.provider.is_not_available"
                        variant="secondary"
                        className="!justify-between rounded"
                        as="Link"
                        rel="canonical"
                        :href="`/book/${specialitySlug}/${provider.slug}/${
                            $store.state.localization.current_locale === 'ar'
                                ? data.covered_surgery_slug_ar ||
                                  data.covered_surgery_slug_en
                                : data.covered_surgery_slug_en ||
                                  data.covered_surgery_slug_ar
                        }`"
                        @click="
                            setLocaleSession(
                                data.net_fees_surgery,
                                data.provider,
                                data
                            )
                        "
                    >
                        <span>{{ $t("Continue booking") }}</span>

                        <span class="rtl--icon">
                            <svg
                                class=""
                                width="5"
                                height="8"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.94.94L4 0 0 4l4 4 .94-.94L1.887 4 4.94.94z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                ></path>
                            </svg>
                        </span>
                    </comp-btn>

                    <div
                        v-else
                        class="rounded-xl self-start flex items-baseline gap-2 bg-secondary-210 border-0 p-3 pe-4"
                    >
                        <h3
                            class="!text-secondary-700 lh-md text-sm font-normal"
                        >
                            {{
                                $t(
                                    "Sorry, the doctor is not available We currently have"
                                )
                            }}
                        </h3>
                    </div>

                    <button
                        type="button"
                        class="booking-process text-xs flex items-center gap-2 text-gray-290 underline"
                        @click.stop="$vfm.show('process')"
                    >
                        <svg
                            class="info"
                            width="15"
                            height="15"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.99 7.495a7.495 7.495 0 1 0-14.99 0 7.495 7.495 0 0 0 14.99 0zm-7.495 7.494zm.999-7.494v3.997a1 1 0 0 1-1.999 0V7.495a1 1 0 1 1 1.999 0zm-1-4.687a1 1 0 1 1 0 1.999 1 1 0 0 1 0-1.999z"
                                fill="currentColor"
                                fill-rule="evenodd"
                            />
                        </svg>

                        <span class="me-1">
                            {{ $t("Booking steps details") }}
                        </span>

                        <svg
                            class="arrow dir-rotation"
                            width="5"
                            height="8"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.94.94L4 0 0 4l4 4 .94-.94L1.887 4 4.94.94z"
                                fill="currentColor"
                                fill-rule="evenodd"
                            />
                        </svg>
                    </button>

                    <OfferTimer
                        v-if="data.end_date_discount"
                        :id="data.covered_surgery_row_id"
                        :endDate="data.end_date_discount"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import OfferTimer from "@components/common/OfferTimer";
import Cookies from "js-cookie";

export default {
    components: {
        OfferTimer,
    },

    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        installmentSetting: {
            type: Object,
            default: () => ({}),
        },
        currentSpeciality: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        discountExpired() {
            if (!this.data.end_date_discount) {
                return true;
            } else {
                const countDownDate = new Date(this.data.end_date_discount).getTime();
                const now_data = new Date().getTime();
                const endTime = countDownDate - now_data;
                if (endTime <= 0) {
                    return true;
                }
            }

            return false;
        },

        specialitySlug() {
            if (this.currentSpeciality) {
                return this.currentSpeciality.slug;
            }

            return this.$store.state.localization.current_locale === "ar"
                ? this.data.covered_surgery_slug_ar
                : this.data.covered_surgery_slug_en;
        },

        provider() {
            const name = this.data.provider.name;
            const slug = this.data[`provider_slug_${this.$store.state.localization.current_locale}`] || this.data.provider_slug_en
            const type = this.data.type;
            const image =
                this.data.provider.photo ? `${this.data.provider.photo}&h=200` :
                this.$store.getters["core/avatarPlaceholder"]({
                    type: this.data.type,
                    gender: this.data.gender,
                });
            const id = this.data.provider_id;
            const country = this.$store.state.geo.supported_countries.find(i => i.id === this.data.country_id)

            return { id, name, type, slug, image, country };
        },

        chatLoading() {
            return this.$store.state.chat.loading;
        },
    },

    data() {
        return {
            loading: false,
        }
    },

    methods: {
        async addToContacts() {
            const user = this.$store.state.auth.user_auth;

            if (user) {
                try {
                    this.loading = true;

                    await this.$store.dispatch("chat/addContact", {
                        sender: {
                            id: `${user.type}_${user.id}`,
                            name: user.name,
                            image: user.avatar || this.$store.getters["core/avatarPlaceholder"]({
                                    type: 'user',
                                }),
                            country: {
                                name: this.$store.state.geo.current_country.name,
                                id: this.$store.state.geo.current_country.id,
                            },
                            deviceIds: user.deviceIds,
                        },
                        reciver: {
                            id: `${this.provider.type}_${this.provider.id}`,
                            name: this.provider.name,
                            image: this.data.provider.photo ? `${this.data.provider.photo}&h=39` :
                                this.$store.getters["core/avatarPlaceholder"]({
                                    type: this.data.type,
                                    gender: this.data.gender,
                                }),
                            country: {
                                name: this.provider.country.name,
                                id: this.provider.country.id,
                            },
                            surgery:
                                this.$store.state.localization
                                    .current_locale === "ar"
                                    ? this.data.covered_surgery_name_ar ||
                                      this.data.covered_surgery_name
                                    : this.data.covered_surgery_name,
                            deviceIds: this.data.device_token,
                        },
                    });

                    this.$emit(
                        "showChat",
                        `${this.provider.type}_${this.provider.id}`
                    );
                } catch (err) {
                    console.log(err)
                    this.$vfm.show("message", {
                        type: "error",
                    });
                } finally {
                    this.loading = false;

                }
            }
        },

        setLocaleSession(price, provider, data) {
            if (this.$store.state.localization.current_locale === "en") {
                Cookies.set(
                    "data",
                    JSON.stringify({
                        name: data.covered_surgery_name
                            ? data.covered_surgery_name
                            : "",
                        price: price,
                    })
                );
            } else if (this.$store.state.localization.current_locale === "ar") {
                Cookies.set(
                    "data",
                    JSON.stringify({
                        name: data.covered_surgery_name_ar
                            ? data.covered_surgery_name_ar
                            : "",
                        price: price,
                    })
                );
            }
            Cookies.set(
                "provider",
                JSON.stringify({
                    id: provider.id,
                    name: provider ? provider.name : "",
                    mobile_number:
                        provider && provider.mobile_number
                            ? provider.mobile_number
                            : "",
                })
            );
            Cookies.set("provider_avatar", this.provider.image);
            Cookies.set("provider_description", provider.description || "");
            Cookies.set("provider_ratingCount", provider.ratingCount || 0);
            Cookies.set("provider_endDate", data.end_date_discount || "");
            Cookies.set(
                "speciality_id",
                data.covered_surgery_speciality_id || ""
            );
            Cookies.set("surgery_id", data.covered_surgery_row_id);
        },
    },
};
</script>
