<template>
    <section class="section-v2 surgeries-v2">
        <div class="container">
            <div class="section__header">
                <div>
                    <h2 class="section__heading">{{ title }}</h2>
                    <p class="section__subheading">{{ subtitle }}</p>
                </div>

                <Link href="/" class="section__link">
                    {{ $t("View all surgeries of this specialty") }}
                </Link>
            </div>

            <div class="items relative">
                <swiper v-bind="settings">
                    <swiper-slide v-for="i in 5" :key="i">
                        <surgery-card :version="cardVersion" :data="{}" />
                    </swiper-slide>
                </swiper>

                <button
                    :class="`swiper-button-next ${id}_swiper-button-next`"
                    aria-label="next slide"
                ></button>
                <button
                    :class="`swiper-button-prev ${id}_swiper-button-prev`"
                    aria-label="prev slide"
                ></button>
            </div>
        </div>
    </section>
</template>

<script>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import SurgeryCard from "@pages/LandingPage/Partials/SurgeryCard.vue";

export default {
    components: {
        Swiper,
        SwiperSlide,
        SurgeryCard,
    },

    props: {
        title: String,
        subtitle: String,
        cardVersion: Number,
        items: {
            type: Array,
            default: () => [],
        },
        id: { type: String, default: () => Math.ceil(Math.random() * 100) },
    },

    data() {
        return {
            settings: {
                modules: [Navigation],
                navigation: {
                    enable: true,
                    nextEl: `.${this.id}_swiper-button-next`,
                    prevEl: `.${this.id}_swiper-button-prev`,
                },
                slidesPerView: 1.25,
                allowTouchMove: true,
                spaceBetween: 12,

                breakpoints: {
                    640: {
                        slidesPerView: 2.25,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    900: {
                        slidesPerView: 4,
                    },
                },
            },
        };
    },
};
</script>
