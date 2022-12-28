<template>
    <section
        id="landing-hero"
        class="c-section flex flex-col justify-center items-center text-white text-center relative hero"
        :style="{ '--image': `url('/images/bg-hero.webp')` }"
    >
        <div class="c-section__wrapper container">
            <div class="flex flex-col justify-center items-center">
                <h1 class="fs-50 font-bold title">
                    <span class="text-secondary">
                        {{ $t("1st") }}
                    </span>
                    {{ $t("Surgical Marketplace") }}
                </h1>
                <p class="fs-22 subtitle">
                    {{ $t("Top quality global surgeons at the best price") }}
                </p>
            </div>
            <comp-btn
                as="Link"
                rel="canonical"
                href="/specialities"
                variant="secondary"
                size="xl"
                className="rounded-full shiny-btn"
            >
                <span>{{ $t("Search for best doctor") }}</span>

                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                        />
                    </svg>
                </span>
            </comp-btn>
        </div>

        <div
            class="container mt-8 md:mt-0 md:absolute bottom-8 left-1/2 md:transform md:-translate-x-1/2"
        >
            <div
                class="flex flex-col md:flex-row justify-center items-center links show-all-slides"
                v-show="specialties && specialties.length"
            >
                <swiper v-bind="settings">
                    <swiper-slide v-for="item in specialties" :key="item.id">
                        <Link
                            :href="`/specialities/${item.slug}`"
                            :title="`${$t('Looking for a')} ${item.name}`"
                            class="fs-13 hover:underline inline-block max-w-full long--text"
                        >
                            {{ `${$t("Looking for a")} ${item.name}` }}
                        </Link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default defineComponent({
    components: {
        Swiper,
        SwiperSlide,
    },

    props: {
        specialties: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        url() {
            return this.$store.state.auth.user_auth !== null
                ? "/search"
                : "/doctor-to-compare";
        },
    },

    data() {
        return {
            settings: {
                modules: [Navigation],
                navigation: {
                    enable: true,
                },
                slidesPerView: 1,
                allowTouchMove: true,
                spaceBetween: 0,
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 25,
                    },
                },
            },
        };
    },
});
</script>
