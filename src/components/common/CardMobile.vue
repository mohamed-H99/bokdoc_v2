<template>
    <div
        class="search-card-2"
        :class="{ hospital: data.providerRelatedHostpital }"
    >
        <span
            v-if="
                data.has_discount_clinic ||
                (data.provider && data.provider.provides_appointment)
            "
            class="badge-overlay"
        >
            {{
                data.provider && data.provider.provides_appointment
                    ? $t("Free examination")
                    : $t("Discount on examination")
            }}
        </span>

        <!-- main content -->
        <div
            v-if="data.type !== 'hospital' && !data.providerRelatedHostpital"
            class="main"
        >
            <!-- info -->
            <div>
                <h4 class="main__title">
                    <Link
                        :href="`/surgery/${data.type}/${specialitySlug}/${
                            provider.slug
                        }/${
                            $store.state.localization.current_locale === 'ar'
                                ? data.covered_surgery_slug_ar ||
                                  data.covered_surgery_slug_en
                                : data.covered_surgery_slug_en ||
                                  data.covered_surgery_slug_ar
                        }`"
                        :aria-label="`${
                            data.type === 'doctor' ? $t('Dr.') : ''
                        } ${provider.name}`"
                    >
                        {{
                            `${data.type === "doctor" ? $t("Dr.") : ""} ${
                                provider.name
                            }`
                        }}
                    </Link>
                </h4>

                <div
                    class="main__sub"
                    v-html="
                        data.provider && data.provider.desc
                            ? data.provider.desc
                            : ''
                    "
                ></div>

                <div class="flex items-center gap-x-5 flex-wrap">
                    <div class="main__contact">
                        <span class="main__icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8.971"
                                height="8.971"
                                viewBox="0 0 8.971 8.971"
                            >
                                <path
                                    d="M4.167 8.2.774 4.8a2.64 2.64 0 0 1 0-3.735l.993-.988a.263.263 0 0 1 .4.028l1.685 2.252a.263.263 0 0 1-.024.344L2.818 3.71a.3.3 0 0 0 0 .424l2.019 2.019a.3.3 0 0 0 .424 0l1.01-1.009a.263.263 0 0 1 .344-.024l2.251 1.688a.263.263 0 0 1 .028.4L7.9 8.2a2.64 2.64 0 0 1-3.735 0z"
                                    style="fill: currentColor"
                                />
                            </svg>
                        </span>

                        <a
                            class="main__phone ltr"
                            :href="`tel:${$store.state.core.contact_us_number}`"
                            rel="noreferrer"
                        >
                            <span>{{ $t("Call us") }}: </span>
                            <span>{{
                                $store.state.core.contact_us_number
                            }}</span>
                        </a>
                    </div>
                </div>

                <div class="main__badges">
                    <span
                        v-if="
                            data.provider_id_discount && !data.end_date_discount
                        "
                        class="badge discount"
                    >
                        {{ $t("Discount") }}
                    </span>
                    <span
                        v-if="data.provider_id_discount && !discountExpired"
                        class="badge temp"
                    >
                        {{ $t("Temporary Discount") }}
                    </span>
                </div>
            </div>

            <!-- avatar -->
            <div v-if="data.type === 'doctor'" class="main__avatar">
                <img
                    v-lazy="
                        provider.image ||
                        $store.getters['core/avatarPlaceholder']({
                            gender: data.gender,
                            type: data.type,
                        })
                    "
                    :class="{
                        placeholder: !provider.image,
                    }"
                    :alt="provider.name"
                    :title="provider.name"
                    width="90"
                    height="90"
                />
            </div>
        </div>

        <!-- hospital -->
        <div v-else-if="data.providerRelatedHostpital" class="main">
            <!-- info -->
            <div class="">
                <h5 class="main__title-upper">
                    {{ data.providerRelatedHostpital.name }}
                </h5>

                <div class="inner">
                    <img
                        class="inner__avatar"
                        v-lazy="
                            provider.image ||
                            $store.getters['core/avatarPlaceholder']({
                                gender: data.gender,
                                type: data.type,
                            })
                        "
                        :class="{ placeholder: !provider.image }"
                        :alt="provider.name"
                        :title="provider.name"
                        width="40"
                        height="40"
                    />

                    <div>
                        <h4 class="main__title">
                            <Link
                                :href="`/surgery/${
                                    data.type
                                }/${specialitySlug}/${provider.slug}/${
                                    $store.state.localization.current_locale ===
                                    'ar'
                                        ? data.covered_surgery_slug_ar ||
                                          data.covered_surgery_slug_en
                                        : data.covered_surgery_slug_en ||
                                          data.covered_surgery_slug_ar
                                }`"
                                :aria-label="`${
                                    provider.type === 'doctor' ? $t('Dr.') : ''
                                } ${provider.name}`"
                            >
                                {{
                                    `${
                                        provider.type === "doctor"
                                            ? $t("Dr.")
                                            : ""
                                    } ${provider.name}`
                                }}
                            </Link>
                        </h4>

                        <div
                            v-if="data.provider.description"
                            class="main__sub"
                            v-html="data.provider.description"
                        ></div>
                    </div>
                </div>

                <!-- address -->
                <div class="main__contact">
                    <span class="main__icon">
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

                    <span class="main__phone">
                        {{
                            $store.state.localization.current_locale === "ar"
                                ? data.provider_address_short_address_ar
                                : data.provider_address_short_address_en
                        }}
                    </span>
                </div>

                <!-- phone -->
                <div class="main__contact">
                    <span class="main__icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8.971"
                            height="8.971"
                            viewBox="0 0 8.971 8.971"
                        >
                            <path
                                d="M4.167 8.2.774 4.8a2.64 2.64 0 0 1 0-3.735l.993-.988a.263.263 0 0 1 .4.028l1.685 2.252a.263.263 0 0 1-.024.344L2.818 3.71a.3.3 0 0 0 0 .424l2.019 2.019a.3.3 0 0 0 .424 0l1.01-1.009a.263.263 0 0 1 .344-.024l2.251 1.688a.263.263 0 0 1 .028.4L7.9 8.2a2.64 2.64 0 0 1-3.735 0z"
                                style="fill: currentColor"
                            />
                        </svg>
                    </span>

                    <a
                        class="main__phone ltr"
                        :href="`tel:${$store.state.core.contact_us_number}`"
                        rel="noreferrer"
                    >
                        {{ $store.state.core.contact_us_number }}
                    </a>
                </div>

                <div class="main__badges">
                    <span
                        v-if="
                            data.provider_id_discount && !data.end_date_discount
                        "
                        class="badge discount"
                    >
                        {{ $t("Discount") }}
                    </span>
                    <span
                        v-if="data.provider_id_discount && !discountExpired"
                        class="badge temp"
                    >
                        {{ $t("Temporary Discount") }}
                    </span>
                </div>
            </div>

            <!-- avatar -->
            <div v-if="data.providerRelatedHostpital" class="main__avatar">
                <img
                    v-lazy="
                        data.providerRelatedHostpital.media
                            ? `${data.providerRelatedHostpital.media}&h=90`
                            : $store.getters['core/avatarPlaceholder']({
                                  gender: '',
                                  type: 'hospital',
                              })
                    "
                    :class="{
                        placeholder: !data.providerRelatedHostpital.media,
                    }"
                    :alt="data.providerRelatedHostpital.name"
                    :title="data.providerRelatedHostpital.name"
                    width="90"
                    height="90"
                />
            </div>
        </div>

        <!--  -->
        <div class="middle">
            <h5 class="middle__title">
                {{
                    $store.state.localization.current_locale === "ar"
                        ? data.covered_surgery_name_ar ||
                          data.covered_surgery_name
                        : data.covered_surgery_name_en ||
                          data.covered_surgery_name
                }}
            </h5>
            <button
                v-if="data.custom_props && data.custom_props.length"
                type="button"
                class="middle__link"
                @click.prevent="
                    $vfm.show('card-data', { items: data.custom_props })
                "
            >
                {{ $t("What does the process include?") }}
            </button>
        </div>

        <!--  -->
        <div class="footer">
            <div class="footer__price">
                <span class="label">
                    {{ $t("Starts from") }}
                </span>

                <strong class="price">
                    {{
                        `${$store.state.payments.current_currency_symbol} ${
                            data.net_fees_surgery_amount ||
                            data.net_fees_surgery
                        }`
                    }}
                </strong>

                <!--  -->
                <del v-if="data.amount_discount" class="price-del">
                    {{
                        `${$store.state.payments.current_currency_symbol} ${data.covered_surgery_net_amount_from_ex_format}`
                    }}
                </del>
            </div>

            <!--  -->
            <div
                v-if="data.installment_amount_surgery"
                class="footer__text w-full"
            >
                {{ $t("Installments are available starting from") }}

                <span>
                    {{
                        `${
                            " " +
                            (data.installment_amount_surgery !== null &&
                                data.installment_amount_surgery !== 0)
                                ? Math.ceil(data.installment_amount_surgery)
                                : data.installment_amount_surgery
                        } ${$store.state.payments.current_currency_symbol} ${$t(
                            "Monthly"
                        )}`
                    }}
                </span>
            </div>
        </div>

        <div v-if="data.end_date_discount" class="chat-section p-4">
            <offer-timer
                v-if="data.end_date_discount"
                :id="data.ID"
                :endDate="data.end_date_discount"
                class="!w-full"
            />
        </div>

        <!-- chat only with doctors -->
        <div v-if="data.type === 'doctor'" class="chat-section p-4">
            <button
                v-if="
                    $store.state.chat.chat_is_active &&
                    data.type === 'doctor' &&
                    $store.state.auth.user_auth
                "
                type="button"
                class="custom-chat-btn !w-full"
                @click.prevent="addToContacts"
                :class="{ loading: loading }"
                :disabled="loading || chatLoading"
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
                                            style="fill: currentColor"
                                        />
                                    </g>
                                </g>
                                <g data-name="Group 5607">
                                    <g data-name="Group 5606">
                                        <path
                                            data-name="Path 4684"
                                            d="m139.531 13.415-1.551-1.81a6.546 6.546 0 0 0 1.71-4.35c0-4-3.843-7.248-8.566-7.248-4.271 0-7.9 2.662-8.541 6.126a12.192 12.192 0 0 1 3.884-.635c5.77 0 10.511 4.03 10.581 9.006h1.983a.66.66 0 0 0 .5-1.089z"
                                            transform="translate(-117.198 -.006)"
                                            style="fill: currentColor"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>

                <span class="sub">{{ $t("Chat Now With") }}</span>
                <span class="highlight">
                    {{
                        `${provider.type === "doctor" ? $t("Dr.") : ""} ${
                            provider.name
                        }`
                    }}
                </span>

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
        </div>
    </div>
</template>

<script lang="js">
import OfferTimer from "@components/common/OfferTimer";

export default {
    components: {
        OfferTimer,
    },

    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        currentSpeciality: {
            type: Object,
            default: () => ({}),
        },
    },

    emits: ["showChat"],

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
            return this.currentSpeciality
                ? this.currentSpeciality.slug
                : "more-special";
        },

        provider() {
            const name = this.data.provider.name;
            const slug = this.data[`provider_slug_${this.$store.state.localization.current_locale}`] || this.data.provider_slug_en
            const type = this.data.type;
            const image = this.data.provider.photo
                ? `${this.data.provider.photo}&h=90`
                : this.$store.getters["core/avatarPlaceholder"]({
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
        };
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
                                name: this.$store.state.geo.current_country
                                    .name,
                                id: this.$store.state.geo.current_country
                                    .id,
                            },
                            deviceIds: user.deviceIds,
                        },
                        reciver: {
                            id: `${this.provider.type}_${this.provider.id}`,
                            name: this.provider.name,
                            image: this.data.provider.photo
                                ? `${this.data.provider.photo}&h=39`
                                : this.$store.getters["core/avatarPlaceholder"](
                                      {
                                          type: this.data.type,
                                          gender: this.data.gender,
                                      }
                                  ),
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
                    this.$vfm.show("message", {
                        type: "error",
                    });
                } finally {
                    this.loading = false;
                }
            }
        },
    },
};
</script>
