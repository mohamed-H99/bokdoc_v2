<script lang="js">
export default {
    props: {
        show: Boolean,
        page: String,
    },

    emits: ["close", "scroll"],

    computed: {
        auth() {
            return this.$store.state.auth.user_auth;
        }
    },

    methods: {
        activateDropdowns() {
            if (!this.$store.getters['core/isBrowser']) return;
            const dropdownsToggle =
                document.querySelectorAll(".dropdown-toggle");
            if (!dropdownsToggle) return;
            dropdownsToggle.forEach((toggle) => {
                toggle.addEventListener("click", (e) => {
                    const menu =
                        e.target.parentElement.querySelector(".dropdown-menu");
                    if (!menu) return;
                    menu.classList.toggle("show");
                });
            });
        },
    },

    mounted() {
        this.activateDropdowns();
    },

    watch: {
        show: {
            handler: (show) => {
                if (typeof document !== "undefined") {
                    document.body.style.overflow = show ? "hidden" : "unset";
                }
            },
            immediate: true,
        },
    },
};
</script>

<template>
    <aside
        id="side-menu"
        class="side-menu transition-all duration-500 fixed top-0 bg-white w-96 h-screen overflow-y-auto p-4 fs-17"
        :class="{ show }"
    >
        <div class="relative">
            <div class="flex justify-between items-start">
                <Link href="/" rel="canonical">
                    <img
                        :src="
                            $store.state.core.logo || '/images/default-logo.svg'
                        "
                        onerror="this.src='/images/default-logo.svg'"
                        :alt="$store.state.core.site_name"
                        width="160"
                        height="45"
                    />
                </Link>

                <button
                    type="button"
                    class="c-btn--icon"
                    @click="$emit('close')"
                    aria-label="close side menu"
                >
                    <svg
                        style="width: auto; height: 16px; max-width: 100%"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                    >
                        <path
                            fill="currentColor"
                            d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"
                        ></path>
                    </svg>
                </button>
            </div>

            <div class="flex flex-col gap-8 items-start">
                <div class="w-full mt-12">
                    <!-- patient/personal-info -->
                    <Link
                        :href="auth ? '/patient/personal-info' : '/login'"
                        class="w-full flex flex-col justify-center items-center gap-3"
                        :title="
                            auth ? $t('Personal profile') : $t('Tap to login')
                        "
                        :aria-label="
                            auth ? $t('Personal profile') : $t('Tap to login')
                        "
                    >
                        <img
                            height="110"
                            width="110"
                            class="avatar object-contain rounded-full"
                            :src="
                                (auth && auth.photo) ||
                                $store.getters['core/avatarPlaceholder']({
                                    gender: '',
                                    type: 'user',
                                })
                            "
                            :alt="(auth && auth.name) || $t('Guest user')"
                        />
                        <span class="text-primary font-bold fs-19">
                            {{ auth ? auth.name : $t("Guest user") }}
                        </span>
                    </Link>
                </div>

                <div
                    v-if="true"
                    class="dropdowns w-full flex flex-col items-start"
                >
                    <!-- locale -->
                    <div class="dropdown w-full border-b">
                        <button
                            type="button"
                            class="dropdown-toggle hover:bg-light-860 w-full flex justify-between items-center gap-4"
                        >
                            <span class="flex items-center gap-2">
                                <svg
                                    height="16"
                                    width="16"
                                    fill="#5d5d5d"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m4.545 6.714-.435 1.286h-1.11l1.862-5h1.284l1.854 5h-1.167l-.435-1.286zm1.634-.736-.679-2.022h-.049l-.679 2.022h1.408z"
                                    />
                                    <path
                                        d="m0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2-2v-3h-3a2 2 0 0 1 -2-2zm2-1a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0 -1-1zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757h1.199v-1.047h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1 -.415-.492 1.988 1.988 0 0 1 -.94.31z"
                                    />
                                </svg>
                                {{
                                    $store.state.localization
                                        .current_locale_native
                                }}
                            </span>
                            <!--  -->
                            <svg
                                height="6"
                                viewBox="0 0 10 6"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m7.9425 0-3.4425 3.44150876-3.4425-3.44150876-1.0575 1.05950379 4.5 4.50852676 4.5-4.50852676z"
                                    fill="#707070"
                                    fill-opacity="1"
                                    transform="translate(.5 .454708)"
                                />
                            </svg>
                        </button>

                        <div
                            class="dropdown-menu border-light px-2 mb-4 hidden flex-col"
                        >
                            <Link
                                v-for="item in $store.state.localization
                                    .supported_locales"
                                :key="item.regional"
                                @click.prevent="
                                    $store.dispatch(
                                        'localization/appChangeLocale',
                                        item.code
                                    )
                                "
                                :href="item.url"
                                :hreflang="item.code"
                                :class="{
                                    active:
                                        $store.state.localization
                                            .current_locale === item.code,
                                }"
                                class="fs-15 py-1 dropdown-item opacity-70 hover:opacity-100 flex items-center"
                            >
                                <img
                                    v-if="item.icon_uploaded"
                                    :src="item.icon_uploaded"
                                    :alt="item.name"
                                    width="25"
                                    height="25"
                                    class="me-2"
                                />
                                {{ item.native }}
                            </Link>
                        </div>
                    </div>

                    <!-- currency -->
                    <div class="dropdown w-full border-b">
                        <button
                            type="button"
                            class="dropdown-toggle hover:bg-light-860 w-full flex justify-between items-center gap-4"
                        >
                            <span class="flex items-center gap-2">
                                <svg
                                    height="16"
                                    width="16"
                                    fill="#5d5d5d"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073c-.876-.296-1.439-.968-1.571-1.922h-.5v-.426h.466v-.434c0-.046 0-.093.004-.135h-.47v-.427h.511c.225-1.248 1.202-1.988 2.67-1.988.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0 -.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427h-1.938c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113 5.002 5.002 0 0 0 -9.905.973zm16 5.5a5.5 5.5 0 1 1 -11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562v.616h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1v-1.676c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502v-.617h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674z"
                                    />
                                </svg>
                                {{
                                    $store.state.payments.current_currency_name
                                }}
                            </span>
                            <!--  -->
                            <svg
                                height="6"
                                viewBox="0 0 10 6"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m7.9425 0-3.4425 3.44150876-3.4425-3.44150876-1.0575 1.05950379 4.5 4.50852676 4.5-4.50852676z"
                                    fill="#707070"
                                    fill-opacity="1"
                                    transform="translate(.5 .454708)"
                                />
                            </svg>
                        </button>

                        <div
                            class="dropdown-menu border-light px-2 mb-4 hidden flex-col"
                        >
                            <Link
                                v-for="item in $store.state.payments
                                    .supported_currencies"
                                :key="item.id"
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
                                class="fs-15 py-1 dropdown-item opacity-70 hover:opacity-100 flex items-center"
                            >
                                <img
                                    v-if="item.icon_uploaded"
                                    :src="item.icon_uploaded"
                                    :alt="item.name"
                                    width="25"
                                    height="25"
                                    class="me-2"
                                />
                                {{ item.name }}
                            </Link>
                        </div>
                    </div>

                    <!-- country -->
                    <div class="dropdown w-full border-b">
                        <button
                            type="button"
                            class="dropdown-toggle hover:bg-light-860 w-full flex justify-between items-center gap-4"
                        >
                            <span class="flex items-center gap-2">
                                <svg
                                    height="16"
                                    width="16"
                                    fill="#5d5d5d"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m0 8a8 8 0 1 1 16 0 8 8 0 0 1 -16 0zm7.5-6.923c-.67.204-1.335.82-1.887 1.855a7.97 7.97 0 0 0 -.468 1.068h2.355zm-3.41 2.923a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933 7.025 7.025 0 0 0 -3.072 2.472zm-.582 3.5c.03-.877.138-1.718.312-2.5h-2.146a6.958 6.958 0 0 0 -.656 2.5zm1.339-2.5a12.5 12.5 0 0 0 -.338 2.5h2.991v-2.5zm3.653 0v2.5h2.99a12.495 12.495 0 0 0 -.337-2.5zm-3.99 3.5a12.5 12.5 0 0 0 .337 2.5h2.653v-2.5zm3.99 0v2.5h2.653c.187-.765.306-1.608.338-2.5zm-3.355 3.5c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855v-2.923zm.182 2.472a6.696 6.696 0 0 1 -.597-.933 9.268 9.268 0 0 1 -.64-1.539h-1.835a7.024 7.024 0 0 0 3.072 2.472zm-1.507-3.472a13.652 13.652 0 0 1 -.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472a7.024 7.024 0 0 0 3.072-2.472h-1.835a9.27 9.27 0 0 1 -.64 1.539 6.688 6.688 0 0 1 -.597.933zm-2.173-2.472v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1 -.312 2.5zm2.802-3.5a6.959 6.959 0 0 0 -.656-2.5h-2.146c.174.782.282 1.623.312 2.5zm-3.712-5.039c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0 -3.072-2.472c.218.284.418.598.597.933zm-.415 1.539a7.966 7.966 0 0 0 -.468-1.068c-.552-1.035-1.217-1.65-1.887-1.855v2.923z"
                                    />
                                </svg>
                                {{ $store.state.geo.current_country.name }}
                            </span>
                            <!--  -->
                            <svg
                                height="6"
                                viewBox="0 0 10 6"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m7.9425 0-3.4425 3.44150876-3.4425-3.44150876-1.0575 1.05950379 4.5 4.50852676 4.5-4.50852676z"
                                    fill="#707070"
                                    fill-opacity="1"
                                    transform="translate(.5 .454708)"
                                />
                            </svg>
                        </button>

                        <div
                            class="dropdown-menu border-light px-2 mb-4 hidden flex-col"
                        >
                            <Link
                                v-for="item in $store.state.geo
                                    .supported_countries"
                                :key="item.id"
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
                                class="fs-15 py-1 dropdown-item opacity-70 hover:opacity-100 flex items-center"
                            >
                                <img
                                    v-if="item.icon_uploaded"
                                    :src="item.icon_uploaded"
                                    :alt="item.name"
                                    width="25"
                                    height="25"
                                    class="me-2"
                                />
                                {{ item.name }}
                            </Link>
                        </div>
                    </div>

                    <Link
                        v-if="!!auth"
                        href="/user/logout"
                        class="action-btn !text-black flex items-center gap-2 fs-17 hover:bg-light-860 w-full"
                    >
                        <svg
                            width="16"
                            height="16"
                            fill="#5d5d5d"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g fill-rule="evenodd">
                                <path
                                    d="m6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0 -.5-.5h-8a.5.5 0 0 0 -.5.5v2a.5.5 0 0 1 -1 0v-2a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1 -1.5 1.5h-8a1.5 1.5 0 0 1 -1.5-1.5v-2a.5.5 0 0 1 1 0z"
                                />
                                <path
                                    d="m.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708l-2.147 2.146h8.793a.5.5 0 0 1 0 1h-8.793l2.147 2.146a.5.5 0 0 1 -.708.708z"
                                />
                            </g>
                        </svg>
                        <span class="">{{ $t("Logout") }}</span>
                    </Link>
                </div>

                <!-- <ul class="links flex flex-col gap-1 items-start w-full">
                    <li class="link w-full">
                        <a href="#" class="flex gap-3 items-center">
                            <svg
                                height="20"
                                viewBox="0 0 12 12"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m324.500989 172.488016c-.003015.515552-.343702.600874-.542687.605698 0 0-8.128235.001507-8.480981.001809-.159791 0-.286417-.044621-.376865-.132958-.129642-.129341-.19597-.370836-.19597-.695845 0-.295462 0-3.338123 0-5.46666h9.599517c0 2.044722.003015 4.964977-.003014 5.687956zm-9.596503-7.761017c0-.473042.180895-.675645.606-.678057h.868298v.664489c0 .249636.202.452239.452238.452239.247224 0 .452239-.202603.452239-.452239v-.66479h.612029 4.160595v.66479c0 .249636.202.452239.452239.452239s.452238-.202603.452238-.452239v-.66479c.545702 0 .895433.000301.907493.000301.220089.007236.376865.063314.476358.172454.141701.151952.162805.398573.15979.476056v.030451 1.16768h-9.599517c0-.700668 0-1.168283 0-1.168283zm10.503995.011456c.003015-.124817.003015-.686498-.388926-1.120345-.186925-.205317-.530626-.453746-1.136626-.473645-.063313 0-.410029 0-.922567 0v-.692226c0-.249938-.201999-.452239-.452238-.452239s-.452239.202301-.452239.452239v.692226c-1.420029 0-3.36767 0-4.772624 0v-.692226c0-.249938-.205015-.452239-.452239-.452239-.250238 0-.452238.202301-.452238.452239v.692226c-.506508 0-.835134 0-.871313 0-.729612.004221-1.510477.422391-1.507471 1.583438 0 .07477.003024 7.079041 0 7.536707 0 .580674.15377 1.030802.461292 1.337722.262298.260187.61203.397668 1.013014.397668h.003015c.355761-.000301 8.480981-.001809 8.477966-.001809h.003015c.578866 0 1.441134-.400382 1.447164-1.504447.009044-1.115823.003015-7.443847.003015-7.755289z"
                                    fill="#202a4d"
                                    fill-opacity=".4"
                                    fill-rule="evenodd"
                                    transform="translate(-314 -162)"
                                />
                            </svg>
                            <span class="">
                                {{
                                    $t(
                                        "Installment of operations / medical procedures"
                                    )
                                }}
                            </span>
                        </a>
                    </li> -->
                <!-- <li v-if="page === 'home'" class="link w-full">
                        <button
                            class="flex gap-3 items-center hover:text-primary transition-colors w-full"
                            @click.prevent="handleHelp"
                        >
                            <svg
                                height="20"
                                viewBox="0 0 12 12"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m324.500989 172.488016c-.003015.515552-.343702.600874-.542687.605698 0 0-8.128235.001507-8.480981.001809-.159791 0-.286417-.044621-.376865-.132958-.129642-.129341-.19597-.370836-.19597-.695845 0-.295462 0-3.338123 0-5.46666h9.599517c0 2.044722.003015 4.964977-.003014 5.687956zm-9.596503-7.761017c0-.473042.180895-.675645.606-.678057h.868298v.664489c0 .249636.202.452239.452238.452239.247224 0 .452239-.202603.452239-.452239v-.66479h.612029 4.160595v.66479c0 .249636.202.452239.452239.452239s.452238-.202603.452238-.452239v-.66479c.545702 0 .895433.000301.907493.000301.220089.007236.376865.063314.476358.172454.141701.151952.162805.398573.15979.476056v.030451 1.16768h-9.599517c0-.700668 0-1.168283 0-1.168283zm10.503995.011456c.003015-.124817.003015-.686498-.388926-1.120345-.186925-.205317-.530626-.453746-1.136626-.473645-.063313 0-.410029 0-.922567 0v-.692226c0-.249938-.201999-.452239-.452238-.452239s-.452239.202301-.452239.452239v.692226c-1.420029 0-3.36767 0-4.772624 0v-.692226c0-.249938-.205015-.452239-.452239-.452239-.250238 0-.452238.202301-.452238.452239v.692226c-.506508 0-.835134 0-.871313 0-.729612.004221-1.510477.422391-1.507471 1.583438 0 .07477.003024 7.079041 0 7.536707 0 .580674.15377 1.030802.461292 1.337722.262298.260187.61203.397668 1.013014.397668h.003015c.355761-.000301 8.480981-.001809 8.477966-.001809h.003015c.578866 0 1.441134-.400382 1.447164-1.504447.009044-1.115823.003015-7.443847.003015-7.755289z"
                                    fill="currentColor"
                                    fill-opacity="1"
                                    fill-rule="evenodd"
                                    transform="translate(-314 -162)"
                                />
                            </svg>
                            <span class="">{{ $t("Need help?") }}</span>
                        </button>
                    </li>
                    <li v-else class="link w-full">
                        <a
                            class="flex gap-3 items-center hover:text-primary transition-colors w-full"
                            href="/#landing-help"
                        >
                            <svg
                                height="20"
                                viewBox="0 0 12 12"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="m324.500989 172.488016c-.003015.515552-.343702.600874-.542687.605698 0 0-8.128235.001507-8.480981.001809-.159791 0-.286417-.044621-.376865-.132958-.129642-.129341-.19597-.370836-.19597-.695845 0-.295462 0-3.338123 0-5.46666h9.599517c0 2.044722.003015 4.964977-.003014 5.687956zm-9.596503-7.761017c0-.473042.180895-.675645.606-.678057h.868298v.664489c0 .249636.202.452239.452238.452239.247224 0 .452239-.202603.452239-.452239v-.66479h.612029 4.160595v.66479c0 .249636.202.452239.452239.452239s.452238-.202603.452238-.452239v-.66479c.545702 0 .895433.000301.907493.000301.220089.007236.376865.063314.476358.172454.141701.151952.162805.398573.15979.476056v.030451 1.16768h-9.599517c0-.700668 0-1.168283 0-1.168283zm10.503995.011456c.003015-.124817.003015-.686498-.388926-1.120345-.186925-.205317-.530626-.453746-1.136626-.473645-.063313 0-.410029 0-.922567 0v-.692226c0-.249938-.201999-.452239-.452238-.452239s-.452239.202301-.452239.452239v.692226c-1.420029 0-3.36767 0-4.772624 0v-.692226c0-.249938-.205015-.452239-.452239-.452239-.250238 0-.452238.202301-.452238.452239v.692226c-.506508 0-.835134 0-.871313 0-.729612.004221-1.510477.422391-1.507471 1.583438 0 .07477.003024 7.079041 0 7.536707 0 .580674.15377 1.030802.461292 1.337722.262298.260187.61203.397668 1.013014.397668h.003015c.355761-.000301 8.480981-.001809 8.477966-.001809h.003015c.578866 0 1.441134-.400382 1.447164-1.504447.009044-1.115823.003015-7.443847.003015-7.755289z"
                                    fill="currentColor"
                                    fill-opacity="1"
                                    fill-rule="evenodd"
                                    transform="translate(-314 -162)"
                                />
                            </svg>
                            <span>{{ $t("Need help?") }}</span>
                        </a>
                    </li>
                </ul>
                
                <hr> -->

                <div class="w-full">
                    <comp-btn
                        as="button"
                        variant="primary"
                        size="lg"
                        className="w-full rounded-full"
                        @click="$vfm.show('join')"
                    >
                        <span>{{ $t("Doctor/hospital? join us") }}</span>
                    </comp-btn>
                </div>

                <hr />

                <div
                    class="w-full bg-light rounded-xl flex flex-col justify-center items-center px-4 py-5"
                >
                    <strong class="mb-4 opacity-70">
                        {{ $t("Download app") }}
                    </strong>
                    <div class="flex gap-3 flex-wrap">
                        <a
                            :href="$store.state.core.ios_url_patient || '#'"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Download app on app store"
                        >
                            <img
                                src="/images/app-store.svg"
                                alt="app store"
                                width="118"
                                height="40"
                            />
                        </a>
                        <a
                            :href="$store.state.core.android_url_patient || '#'"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Download app on google play"
                        >
                            <img
                                src="/images/google-play.svg"
                                alt="google play"
                                width="118"
                                height="40"
                            />
                        </a>
                    </div>
                </div>

                <hr />

                <ul class="links flex flex-col w-full pb-8">
                    <li class="link">
                        <Link href="/about" rel="canonical" class="block">
                            {{ $t("Who we are") }}
                        </Link>
                    </li>
                    <li class="link">
                        <Link href="/terms" rel="canonical" class="block">
                            {{ $t("Terms of Use and Privacy") }}
                        </Link>
                    </li>
                    <li class="link">
                        <!--
                            target="_blank"
                         -->
                        <a href="/blog" class="block" rel="noreferrer">
                            {{ $t("Blog") }}
                        </a>
                    </li>
                    <li class="link">
                        <Link href="/faq" rel="canonical" class="block">
                            {{ $t("FAQ") }}
                        </Link>
                    </li>
                    <li class="link">
                        <Link href="/contact-us" rel="canonical" class="block">
                            {{ $t("Contact us") }}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </aside>

    <!-- overlay -->
    <div class="c-overlay" :class="{ show }" @click.stop="$emit('close')"></div>
</template>
