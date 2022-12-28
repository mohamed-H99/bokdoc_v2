<template>
    <footer class="footer-v2">
        <div class="container">
            <!--  -->
            <div class="columns">
                <!--  -->
                <div v-if="specialties.length" class="column split">
                    <h3 class="column__title">
                        {{ $t("Medical specialties") }}
                    </h3>

                    <ul class="column__list">
                        <li v-for="item in specialties" :key="item.id">
                            <Link :href="`/specialities/${item.slug}`">
                                {{ item.name }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!--  -->
                <div class="column">
                    <h3 class="column__title">
                        {{ $t("Countries") }}
                    </h3>

                    <ul class="column__list">
                        <li v-for="item in countries" :key="item.code">
                            <Link
                                :href="
                                    $store.getters['geo/switchCountryUrl'](
                                        item.code
                                    )
                                "
                            >
                                {{ item.name }}
                            </Link>
                        </li>
                    </ul>
                </div>

                <!--  -->
                <div class="column">
                    <h3 class="column__title">
                        {{ $store.state.core.site_name }}
                    </h3>

                    <ul class="column__list">
                        <li v-for="item in quickLinks" :key="item.id">
                            <Link :href="item.url" rel="canonical noreferrer">
                                {{ item.name }}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <!--  -->
            <div class="content">
                <!--  -->
                <div
                    class="flex flex-col md:flex-row items-center justify-between gap-3"
                >
                    <div class="mobile-app flex items-center gap-3 md:gap-5">
                        <span class="text text-sm">
                            {{ $t("Get BokDoc app") }}
                        </span>
                        <div class="apps">
                            <!-- app store -->
                            <a
                                :href="$store.state.core.ios_url"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="app store"
                            >
                                <img
                                    src="/images/footer-app-store.svg"
                                    alt="app store"
                                    width="127.1"
                                    height="36.5"
                                />
                            </a>
                            <!-- google play -->
                            <a
                                :href="$store.state.core.android_url"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="google play"
                            >
                                <img
                                    src="/images/footer-google-play.svg"
                                    alt="google play"
                                    width="127.1"
                                    height="36.5"
                                />
                            </a>
                        </div>
                    </div>

                    <div class="contact flex items-center">
                        <span class="text text-sm">
                            {{ $t("Customers  Service") }}
                        </span>
                        <a
                            :href="`tel:${$store.state.core.contact_us_number}`"
                            class="value font-bold text-primary fs-20"
                        >
                            {{ $store.state.core.contact_us_number }}
                        </a>
                    </div>
                </div>

                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-3 lg:gap-1 pt-4 md:pt-6 lg:pt-10"
                >
                    <!--  -->
                    <div
                        class="flex justify-center items-center gap-5 ms-0 justify-start fit-content xs:mx-auto md:ms-0 md:justify-start md:w-full"
                    >
                        <!--  -->
                        <div class="flex items-center gap-3 md:gap-4 w-full">
                            <span class="text">
                                {{ $t("Follow us") }}
                            </span>

                            <div class="icon-links">
                                <!-- facebook -->
                                <a
                                    v-if="$store.state.core.facebook_link"
                                    :href="
                                        $store.state.core.facebook_link || '#'
                                    "
                                    target="_blank"
                                    rel="noreferrer"
                                    class="facebook"
                                    title="facebook"
                                    aria-label="facebook"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="6.406"
                                        height="11.8"
                                        viewBox="0 0 6.406 11.8"
                                    >
                                        <g data-name="Shape Copy 4">
                                            <path
                                                data-name="Shape Copy 4"
                                                d="M6.164 0H4.628a2.692 2.692 0 0 0-2.842 2.9v1.343H.242A.241.241 0 0 0 0 4.484v1.94a.241.241 0 0 0 .242.241h1.544v4.9a.241.241 0 0 0 .242.241h2.015a.241.241 0 0 0 .242-.241v-4.9h1.806a.241.241 0 0 0 .242-.241v-1.94a.241.241 0 0 0-.242-.241H4.285V3.108c0-.546.131-.822.844-.822h1.035a.241.241 0 0 0 .241-.241V.243A.241.241 0 0 0 6.164 0z"
                                                style="fill: none"
                                            />
                                            <path
                                                data-name="Shape Copy 4"
                                                d="M6.164 0H4.628a2.692 2.692 0 0 0-2.842 2.9v1.343H.242A.241.241 0 0 0 0 4.484v1.94a.241.241 0 0 0 .242.241h1.544v4.9a.241.241 0 0 0 .242.241h2.015a.241.241 0 0 0 .242-.241v-4.9h1.806a.241.241 0 0 0 .242-.241v-1.94a.241.241 0 0 0-.242-.241H4.285V3.108c0-.546.131-.822.844-.822h1.035a.241.241 0 0 0 .241-.241V.243A.241.241 0 0 0 6.164 0z"
                                                style="fill: currentColor"
                                            />
                                        </g>
                                    </svg>
                                </a>
                                <!-- linked-in -->
                                <a
                                    v-if="$store.state.core.linked_in_link"
                                    :href="
                                        $store.state.core.linked_in_link || '#'
                                    "
                                    target="_blank"
                                    rel="noreferrer"
                                    class="linked-in"
                                    title="linked-in"
                                    aria-label="linked-in"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                    >
                                        <g data-name="ICON Copy 2">
                                            <path
                                                data-name="Shape"
                                                d="M7.851 14h-2.9V4.653h2.785v1.274h.041a3.064 3.064 0 0 1 2.746-1.509 3.064 3.064 0 0 1 2.84 1.282A5.879 5.879 0 0 1 14 8.865V14h-2.9V9.449c0-1.045 0-2.475-1.509-2.475-1.533 0-1.74 1.212-1.74 2.4V14zm-4.717 0H.231V4.653h2.9V14zM1.681 3.377a1.689 1.689 0 1 1 1.681-1.7 1.691 1.691 0 0 1-1.681 1.7z"
                                                style="fill: none"
                                            />
                                            <path
                                                data-name="Shape"
                                                d="M7.851 14h-2.9V4.653h2.785v1.274h.041a3.064 3.064 0 0 1 2.746-1.509 3.064 3.064 0 0 1 2.84 1.282A5.879 5.879 0 0 1 14 8.865V14h-2.9V9.449c0-1.045 0-2.475-1.509-2.475-1.533 0-1.74 1.212-1.74 2.4V14zm-4.717 0H.231V4.653h2.9V14zM1.681 3.377a1.689 1.689 0 1 1 1.681-1.7 1.691 1.691 0 0 1-1.681 1.7z"
                                                style="fill: currentColor"
                                            />
                                        </g>
                                    </svg>
                                </a>
                                <!-- instagram -->
                                <a
                                    v-if="$store.state.core.instagram_link"
                                    :href="
                                        $store.state.core.instagram_link || '#'
                                    "
                                    target="_blank"
                                    rel="noreferrer"
                                    class="instagram"
                                    title="instagram"
                                    aria-label="instagram"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                    >
                                        <g data-name="ICON Copy">
                                            <g
                                                data-name="Combined Shape Copy 2"
                                            >
                                                <path
                                                    data-name="Combined Shape Copy 2"
                                                    d="M3.311 12A3.315 3.315 0 0 1 0 8.689V3.311A3.315 3.315 0 0 1 3.311 0h5.378A3.315 3.315 0 0 1 12 3.311v5.378A3.315 3.315 0 0 1 8.689 12zM1.064 3.311v5.378a2.25 2.25 0 0 0 2.247 2.247h5.378a2.25 2.25 0 0 0 2.247-2.247V3.311a2.25 2.25 0 0 0-2.247-2.247H3.311a2.25 2.25 0 0 0-2.247 2.247zM3 6a3 3 0 1 1 3 3 3 3 0 0 1-3-3zm1.033 0A1.967 1.967 0 1 0 6 4.033 1.969 1.969 0 0 0 4.033 6zM8.72 3.28a.75.75 0 1 1 .53.22.755.755 0 0 1-.53-.22z"
                                                    style="fill: none"
                                                />
                                                <path
                                                    data-name="Combined Shape Copy 2"
                                                    d="M3.311 12A3.315 3.315 0 0 1 0 8.689V3.311A3.315 3.315 0 0 1 3.311 0h5.378A3.315 3.315 0 0 1 12 3.311v5.378A3.315 3.315 0 0 1 8.689 12zM1.064 3.311v5.378a2.25 2.25 0 0 0 2.247 2.247h5.378a2.25 2.25 0 0 0 2.247-2.247V3.311a2.25 2.25 0 0 0-2.247-2.247H3.311a2.25 2.25 0 0 0-2.247 2.247zM3 6a3 3 0 1 1 3 3 3 3 0 0 1-3-3zm1.033 0A1.967 1.967 0 1 0 6 4.033 1.969 1.969 0 0 0 4.033 6zM8.72 3.28a.75.75 0 1 1 .53.22.755.755 0 0 1-.53-.22z"
                                                    style="fill: currentColor"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                                <!-- twitter -->
                                <a
                                    v-if="$store.state.core.twitter_link"
                                    :href="
                                        $store.state.core.twitter_link || '#'
                                    "
                                    target="_blank"
                                    rel="noreferrer"
                                    class="twitter"
                                    title="twitter"
                                    aria-label="twitter"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.395"
                                        height="10.9"
                                        viewBox="0 0 13.395 10.9"
                                    >
                                        <path
                                            d="M23.295 18.789a5.633 5.633 0 0 1-1.574.435 2.679 2.679 0 0 0 1.205-1.524 5.783 5.783 0 0 1-1.741.67 2.748 2.748 0 0 0-4.755 1.875 2.511 2.511 0 0 0 .067.62A7.729 7.729 0 0 1 10.854 18a2.756 2.756 0 0 0 .837 3.667 2.636 2.636 0 0 1-1.239-.335 2.775 2.775 0 0 0 2.193 2.729 3.014 3.014 0 0 1-1.239.05 2.757 2.757 0 0 0 2.562 1.909A5.532 5.532 0 0 1 9.9 27.161 7.8 7.8 0 0 0 21.922 20.6a2.473 2.473 0 0 0-.017-.352 5.45 5.45 0 0 0 1.39-1.459z"
                                            transform="translate(-9.9 -17.5)"
                                            style="fill: currentColor"
                                        />
                                    </svg>
                                </a>
                                <!-- tiktok -->
                                <a
                                    v-if="$store.state.core.tiktok_link"
                                    :href="$store.state.core.tiktok_link || '#'"
                                    target="_blank"
                                    rel="noreferrer"
                                    class="tiktok"
                                    title="tiktok"
                                    aria-label="tiktok"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="11.333"
                                        height="12.899"
                                        viewBox="0 0 11.333 12.899"
                                    >
                                        <path
                                            data-name="Path 3907"
                                            d="M42.75 3.62a3.25 3.25 0 0 1-1.964-.656A3.251 3.251 0 0 1 39.488.39h-2.107v8.907a1.909 1.909 0 1 1-1.31-1.809V5.35a4.145 4.145 0 0 0-.607-.045 4.039 4.039 0 0 0-3.035 1.357 3.958 3.958 0 0 0 .179 5.458 4.109 4.109 0 0 0 .381.332 4.039 4.039 0 0 0 2.476.837 4.145 4.145 0 0 0 .607-.045 4.025 4.025 0 0 0 2.249-1.125A3.943 3.943 0 0 0 39.5 9.314l-.01-4.708a5.337 5.337 0 0 0 3.266 1.11v-2.1h-.006z"
                                            transform="translate(-31.423 -.39)"
                                            style="fill: currentColor"
                                        />
                                    </svg>
                                </a>
                                <!-- youtube -->
                                <a
                                    v-if="$store.state.core.youtube_link"
                                    :href="
                                        $store.state.core.youtube_link || '#'
                                    "
                                    target="_blank"
                                    rel="noreferrer"
                                    class="youtube"
                                    title="youtube"
                                    aria-label="youtube"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14.534"
                                        height="10.176"
                                        viewBox="0 0 14.534 10.176"
                                    >
                                        <path
                                            data-name="youtube (1)"
                                            d="M14.235-4.49a1.821 1.821 0 0 0-1.281-1.281 42.542 42.542 0 0 0-5.687-.311 44.2 44.2 0 0 0-5.687.3A1.858 1.858 0 0 0 .3-4.49 19.186 19.186 0 0 0 0-.994 19.115 19.115 0 0 0 .3 2.5a1.821 1.821 0 0 0 1.281 1.283 42.619 42.619 0 0 0 5.687.311 44.2 44.2 0 0 0 5.687-.3 1.821 1.821 0 0 0 1.281-1.281 19.192 19.192 0 0 0 .3-3.5 18.212 18.212 0 0 0-.3-3.508zM5.819 1.185v-4.358L9.6-.994zm0 0"
                                            transform="translate(-.001 6.082)"
                                            style="fill: currentColor"
                                        />
                                    </svg>
                                </a>
                                <!-- snapchat -->
                                <a
                                    v-if="$store.state.core.snapchat_link"
                                    :href="
                                        $store.state.core.snapchat_link || '#'
                                    "
                                    target="_blank"
                                    rel="noreferrer"
                                    class="snapchat"
                                    title="snapchat"
                                    aria-label="snapchat"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13.523"
                                        height="12.679"
                                        viewBox="0 0 13.523 12.679"
                                    >
                                        <g data-name="Group 4461">
                                            <path
                                                data-name="Path 3906"
                                                d="M13.258 25.455a3.906 3.906 0 0 1-2.658-2.228.128.128 0 0 0-.008-.015.559.559 0 0 1-.063-.46c.1-.232.478-.352.728-.431a4.23 4.23 0 0 0 .2-.067 1.531 1.531 0 0 0 .543-.321.512.512 0 0 0 .164-.369.58.58 0 0 0-.434-.5.785.785 0 0 0-.294-.056.655.655 0 0 0-.274.056 1.537 1.537 0 0 1-.564.161.518.518 0 0 1-.187-.041l.016-.261v-.039a6.694 6.694 0 0 0-.172-2.73 3.672 3.672 0 0 0-.827-1.184 3.46 3.46 0 0 0-.99-.653 3.911 3.911 0 0 0-1.544-.326h-.268a3.926 3.926 0 0 0-1.546.326 3.441 3.441 0 0 0-.986.652 3.684 3.684 0 0 0-.824 1.182 6.7 6.7 0 0 0-.17 2.728l.019.3a.542.542 0 0 1-.221.041 1.466 1.466 0 0 1-.6-.161.541.541 0 0 0-.229-.047.81.81 0 0 0-.4.113.56.56 0 0 0-.287.366.5.5 0 0 0 .193.474 1.662 1.662 0 0 0 .5.288c.057.023.126.044.2.067.25.079.63.2.729.431a.563.563 0 0 1-.064.46.12.12 0 0 0-.007.015 4.476 4.476 0 0 1-.681 1.053 3.823 3.823 0 0 1-.822.725 3.023 3.023 0 0 1-1.154.449.316.316 0 0 0-.265.33.4.4 0 0 0 .033.138.845.845 0 0 0 .458.391 5.232 5.232 0 0 0 1.323.344 1.6 1.6 0 0 1 .081.291c.022.1.045.206.078.317a.347.347 0 0 0 .363.264 1.766 1.766 0 0 0 .311-.043 3.537 3.537 0 0 1 .709-.08 3.082 3.082 0 0 1 .507.043 2.409 2.409 0 0 1 .948.489 3.068 3.068 0 0 0 1.868.728h.168a3.072 3.072 0 0 0 1.868-.727 2.417 2.417 0 0 1 .948-.489 3.082 3.082 0 0 1 .507-.043 3.554 3.554 0 0 1 .709.075 1.714 1.714 0 0 0 .311.038H11.2a.342.342 0 0 0 .347-.259c.032-.109.055-.21.078-.314a1.66 1.66 0 0 1 .08-.289 5.268 5.268 0 0 0 1.323-.344.848.848 0 0 0 .457-.39.4.4 0 0 0 .034-.139.315.315 0 0 0-.261-.329z"
                                                transform="translate(0 -15.988)"
                                                style="fill: currentColor"
                                            />
                                        </g>
                                    </svg>
                                </a>
                                <!-- linktree -->
                                <a
                                    v-if="$store.state.core.linktree_link"
                                    :href="
                                        $store.state.core.linktree_link || '#'
                                    "
                                    target="_blank"
                                    rel="noreferrer"
                                    class="linktree"
                                    title="linktree"
                                    aria-label="linktree"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14.861"
                                        height="18.153"
                                        viewBox="0 0 14.861 18.153"
                                        style="fill: currentColor"
                                    >
                                        <g
                                            id="layer1"
                                            transform="translate(0 0)"
                                        >
                                            <g
                                                id="g46"
                                                transform="translate(0 0)"
                                            >
                                                <g
                                                    id="g18"
                                                    transform="translate(0 0)"
                                                >
                                                    <path
                                                        id="path993"
                                                        d="M377.91,236.6h2.642v5.938H377.91V236.6"
                                                        transform="translate(-371.773 -224.387)"
                                                        fill-rule="evenodd"
                                                    />
                                                    <path
                                                        id="path991"
                                                        d="M253.412-5.113h4.49l-3.2-3.025,1.761-1.795,3.041,3.11v-4.426h2.642v4.425l3.04-3.11,1.761,1.795-3.2,3.025h4.491v2.5h-4.519L266.937.5l-1.761,1.754-4.362-4.369-4.362,4.369L254.69.5l3.211-3.11h-4.518v-2.5h.028"
                                                        transform="translate(-253.384 11.248)"
                                                        fill-rule="evenodd"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div
                        class="flex items-center justify-center fit-content mx-auto md:me-0 lg:me-auto"
                    >
                        <div class="text text-center copyright">
                            {{
                                `© ${$store.state.core.year} ${
                                    $store.state.core.site_name || ""
                                }`
                            }}
                        </div>
                    </div>

                    <!--  -->
                    <div
                        class="my-4 md:my-0 flex items-center justify-center md:justify-end"
                    >
                        <img
                            height="36.7"
                            width="391.4"
                            class="m-0 logos object-contain max-w-full"
                            v-lazy="$store.state.core.payments_logo"
                            alt="payments logo"
                        />
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    props: {
        specialties: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        countries() {
            return this.$store.state.geo.supported_countries;
        },
        quickLinks() {
            return [
                {
                    id: 1,
                    name: this.$t("Who we are"),
                    url: "/about",
                },
                {
                    id: 1,
                    name: this.$t("Terms of Use and Privacy"),
                    url: "/terms",
                },
                {
                    id: 1,
                    name: this.$t("Blog"),
                    url: "/blog",
                },
                {
                    id: 1,
                    name: this.$t("FAQ"),
                    url: "/faq",
                },
                {
                    id: 1,
                    name: this.$t("Contact us"),
                    url: "/contact-us",
                },
            ];
        },
    },
};
</script>
