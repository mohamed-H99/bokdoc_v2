<template>
    <header id="header-v2" class="header-v2" :class="{ page }">
        <nav class="navbar">
            <div class="container navbar__container">
                <Link
                    href="/"
                    :aria-label="$store.state.core.site_name"
                    :title="$store.state.core.site_name"
                    class="navbar__logo"
                >
                    <img
                        :src="$store.state.core.logo || defaultLogo"
                        :onerror="`this.src='${defaultLogo}'`"
                        :alt="$store.state.core.site_name"
                        width=""
                        height="40"
                    />
                </Link>

                <div class="navbar__items">
                    <!-- currency -->
                    <dropdown-hover align="right" contentClasses="bg-white">
                        <template #trigger>
                            <button
                                class="uppercase navbar__item"
                                type="button"
                            >
                                {{
                                    $store.state.payments
                                        .current_currency_symbol
                                }}
                            </button>
                        </template>

                        <template #content>
                            <dropdown-link
                                v-for="item in $store.state.payments
                                    .supported_currencies"
                                :key="item.id"
                                @click="
                                    $store.commit('payments/setCurrency', item)
                                "
                                :href="
                                    $store.getters[
                                        'payments/switchCurrencyUrl'
                                    ](item.code)
                                "
                                rel="canonical"
                                :class="{
                                    active:
                                        $store.state.payments
                                            .current_currency === item.code,
                                }"
                            >
                                <img
                                    v-if="item.icon_uploaded"
                                    :src="item.icon_uploaded"
                                    :alt="item.name"
                                    width="26"
                                    height="26"
                                />
                                <span>{{ item.name }}</span>
                            </dropdown-link>
                        </template>
                    </dropdown-hover>
                    <!-- country -->
                    <dropdown-hover align="right" contentClasses="bg-white">
                        <template #trigger>
                            <button
                                class="uppercase navbar__item"
                                type="button"
                            >
                                <img
                                    :src="
                                        $store.state.geo.current_country
                                            .icon_uploaded ||
                                        '/images/egypt.svg'
                                    "
                                    :onerror="`this.src='/images/egypt.svg'`"
                                    :alt="$store.state.geo.current_country.name"
                                    class="block object-contain"
                                    width="28"
                                    height="28"
                                />
                            </button>
                        </template>

                        <template #content>
                            <dropdown-link
                                v-for="item in $store.state.geo
                                    .supported_countries"
                                :key="item.code"
                                :href="
                                    $store.getters['geo/switchCountryUrl'](
                                        item.code
                                    )
                                "
                                :class="{
                                    active:
                                        $store.state.geo.current_country
                                            .code === item.code,
                                }"
                            >
                                <img
                                    v-if="item.icon_uploaded"
                                    :src="item.icon_uploaded"
                                    :alt="item.name"
                                    width="26"
                                    height="26"
                                />
                                <span>{{ item.name }}</span>
                            </dropdown-link>
                        </template>
                    </dropdown-hover>
                    <!-- locale -->
                    <dropdown-hover align="right" contentClasses="bg-white">
                        <template #trigger>
                            <button
                                class="uppercase navbar__item"
                                type="button"
                            >
                                {{ $store.state.localization.current_locale }}
                            </button>
                        </template>

                        <template #content>
                            <dropdown-link
                                v-for="item in $store.state.localization
                                    .supported_locales"
                                :key="item.name"
                                :href="item.url"
                                :hreflang="item.code"
                                @click="
                                    $store.dispatch(
                                        'localization/appChangeLocale',
                                        item.code
                                    )
                                "
                                rel="canonical"
                                :class="{
                                    active:
                                        $store.state.localization
                                            .current_locale === item.code,
                                }"
                            >
                                <img
                                    v-if="item.icon_uploaded"
                                    :src="item.icon_uploaded"
                                    :alt="item.name"
                                    width="26"
                                    height="26"
                                />
                                <span>{{ item.native }}</span>
                            </dropdown-link>
                        </template>
                    </dropdown-hover>

                    <!-- help -->
                    <button
                        v-tippy="$t('Need help?')"
                        type="button"
                        class="btn-help ltr"
                        :aria-label="$t('Need help?')"
                        @click.prevent="help"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 27.68 27.68"
                        >
                            <g data-name="Group 3819">
                                <g
                                    data-name="Ellipse 1389"
                                    style="
                                        stroke: currentColor;
                                        stroke-width: 2px;
                                        fill: none;
                                    "
                                >
                                    <circle
                                        cx="13.84"
                                        cy="13.84"
                                        r="13.84"
                                        style="stroke: none"
                                    />
                                    <circle
                                        cx="13.84"
                                        cy="13.84"
                                        r="12.84"
                                        style="fill: none"
                                    />
                                </g>
                                <text
                                    data-name="?"
                                    transform="translate(10 20)"
                                    style="
                                        fill: currentColor;
                                        font-size: 16px;
                                        font-family: OpenSans-Semibold,
                                            Open Sans;
                                        font-weight: 600;
                                    "
                                >
                                    <tspan x="0" y="0">?</tspan>
                                </text>
                            </g>
                        </svg>
                    </button>

                    <div class="btns">
                        <!-- auth -->
                        <template v-if="$store.state.auth.check_auth">
                            <comp-btn
                                as="Link"
                                href="/patient/personal-info"
                                variant="white"
                                class="rounded-sm"
                            >
                                <span>{{ $t("Personal profile") }}</span>
                            </comp-btn>
                            <comp-btn
                                as="Link"
                                href="/user/logout"
                                variant="white-outline"
                                class="rounded-sm"
                            >
                                <span>{{ $t("Logout") }}</span>
                            </comp-btn>
                        </template>

                        <!-- guest -->
                        <template v-else>
                            <comp-btn
                                as="Link"
                                href="/register"
                                variant="white"
                                class="rounded-sm"
                            >
                                <span>{{ $t("Register") }}</span>
                            </comp-btn>
                            <comp-btn
                                as="Link"
                                href="/login"
                                variant="white-outline"
                                class="rounded-sm"
                            >
                                <span>{{ $t("Sign in") }}</span>
                            </comp-btn>
                        </template>
                    </div>
                </div>

                <!-- toggler -->
                <button
                    type="button"
                    class="sidemenu-toggler lg:!hidden !rounded-sm bg-transparent border-2 text-white border-white hover:bg-primary-200 transition-colors"
                    @click.stop="$emit('opensidemenu')"
                    aria-label="toggle sidemenu"
                >
                    <span></span>
                </button>
            </div>
        </nav>
    </header>
</template>

<script>
import DropdownHover from "@components/common/DropdownHover.vue";
import DropdownLink from "@jetstream/DropdownLink.vue";

export default {
    components: {
        DropdownHover,
        DropdownLink,
    },

    props: {
        page: String,
    },

    computed: {
        defaultLogo() {
            return "/images/default-logo.svg";
        },
    },

    mounted() {
        this.trackHeaderMovement();
    },

    methods: {
        trackHeaderMovement() {
            if (
                typeof window === "undefined" ||
                typeof document === "undefined"
            ) {
                return;
            }

            const header = document.querySelector("#header-v2");
            if (!header) {
                return;
            }

            if (this.page !== "home") {
                header.classList.add("invert");
                return;
            }

            if (window.scrollY >= header.clientHeight * 0.5) {
                header.classList.add("invert");
            } else {
                header.classList.remove("invert");
            }

            window.addEventListener(
                "scroll",
                () => {
                    if (window.scrollY >= header.clientHeight * 0.5) {
                        header.classList.add("invert");
                    } else {
                        header.classList.remove("invert");
                    }
                },
                { passive: true }
            );
        },

        help() {
            const helpSection = document.querySelector("#landing-help");

            if (helpSection) {
                helpSection.scrollIntoView({
                    behavior: "smooth",
                });
            }
        },
    },
};
</script>
