<template>
    <section id="landing-testimonials" class="testimonials c-section darker">
        <div class="c-section__wrapper container">
            <div>
                <h2 class="fs-40 font-bold md:text-center">
                    {{ $t("Know the opinions of patients from everywhere") }}
                </h2>
            </div>

            <div class="mt-10 md:mt-16">
                <swiper v-bind="settings">
                    <swiper-slide
                        v-for="(item, index) in items"
                        :key="item.id || index"
                    >
                        <TestimonialsCard :data="item" />
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import TestimonialsCard from "@pages/LandingPage/Partials/TestimonialsCard";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default defineComponent({
    components: {
        TestimonialsCard,
        Swiper,
        SwiperSlide,
    },

    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            settings: {
                modules: [Pagination],
                navigation: false,
                // pagination: { enable: true, clickable: true },
                pagination: false,
                slidesPerView: 1.25,
                allowTouchMove: true,
                spaceBetween: 20,
                breakpoints: {
                    640: {
                        slidesPerView: 2.125,
                        spaceBetween: 20,
                        // pagination: { enable: true, clickable: true },
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        pagination: false,
                    },
                },
            },
            items: [],
        };
    },
    methods: {
        reviews() {
            if (!this.data.length) return;
            this.data.forEach((item) => {
                const { id, user, review, created_at } = item;
                this.items.push({
                    id,
                    title:
                        user && user.length > 0 ? user.name : review.user_name,
                    description: review,
                    date: created_at,
                });
            });
        },
    },
    mounted() {
        this.reviews();
    },
});
</script>
