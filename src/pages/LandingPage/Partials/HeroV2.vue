<template>
    <section id="hero-v2" class="hero-v2 text-white">
        <!-- bg -->
        <picture>
            <source
                media="(min-width: 56.25em)"
                srcset="/images/hero-bg-2@2x.webp"
                type="image/webp"
            />
            <source
                media="(min-width: 56.25em)"
                srcset="/images/hero-bg-2@2x.jpg"
            />
            <source srcset="/images/hero-bg-2.webp" type="image/webp" />
            <img
                class="hero-bg"
                v-lazy="`/images/hero-bg-2.jpg`"
                :alt="$t('Top quality global surgeons at the best price')"
                width=""
                height=""
            />
        </picture>

        <!-- content -->
        <div class="hero-content container">
            <div class="hero-subtitle">
                {{ $t("Top quality global surgeons at the best price") }}
            </div>

            <h1 class="hero-title">
                <span class="text-secondary">
                    {{ $t("1st") }}
                </span>
                {{ $t("Surgical Marketplace") }}
            </h1>

            <comp-btn
                as="Link"
                rel="canonical"
                href="/specialities"
                variant="secondary"
                size="xl"
                className="rounded-sm shiny-btn hero-btn"
                style="--fs: 1rem"
            >
                <span>{{ $t("Find Doctor") }}</span>
            </comp-btn>
        </div>

        <!-- slider -->
        <div class="w-full overflow-hidden">
            <div class="container" v-show="specialties && specialties.length">
                <div class="relative show-all-slides">
                    <swiper v-bind="settings">
                        <swiper-slide
                            v-for="item in specialties"
                            :key="item.id"
                        >
                            <hero-card :data="item" />
                        </swiper-slide>
                    </swiper>

                    <button
                        class="swiper-button-next"
                        aria-label="next slide"
                    ></button>
                    <button
                        class="swiper-button-prev"
                        aria-label="prev slide"
                    ></button>
                </div>
            </div>
        </div>

        <!-- form -->
        <div class="container">
            <hero-form />
        </div>
    </section>
</template>

<script>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import HeroCard from "@pages/LandingPage/Partials/HeroCard.vue";
import HeroForm from "@pages/LandingPage/Partials/HeroForm.vue";

export default {
    components: {
        Swiper,
        SwiperSlide,
        HeroCard,
        HeroForm,
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
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                slidesPerView: 1,
                allowTouchMove: true,
                spaceBetween: 12,

                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    900: {
                        slidesPerView: 3,
                    },
                    1150: {
                        slidesPerView: 4,
                    },
                },
            },
        };
    },
};
</script>
