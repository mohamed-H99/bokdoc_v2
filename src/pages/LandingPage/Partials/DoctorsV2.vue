<template>
    <section class="section-v2 doctors-v2">
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

            <doctors-filter :items="[]" />

            <swiper v-bind="settings" class="has-pagination">
                <swiper-slide v-for="i in 5" :key="i">
                    <doctor-card :data="{}" />
                </swiper-slide>
            </swiper>

            <div>
                <comp-btn
                    variant="light"
                    size="xl"
                    class="mx-auto rounded"
                    style="--fs: 1rem"
                >
                    <span>{{ $t("Other Doctors") }}</span>
                </comp-btn>
            </div>
        </div>
    </section>
</template>

<script>
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import DoctorsFilter from "@pages/LandingPage/Partials/DoctorsFilter.vue";
import DoctorCard from "@pages/LandingPage/Partials/DoctorCard.vue";

export default {
    components: {
        Swiper,
        SwiperSlide,
        DoctorsFilter,
        DoctorCard,
    },

    props: {
        title: String,
        subtitle: String,
        cardVersion: Number,
        items: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            settings: {
                modules: [Pagination],
                navigation: false,
                pagination: true,
                slidesPerView: 1.25,
                allowTouchMove: true,
                spaceBetween: 12,

                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    900: {
                        navigation: false,
                        slidesPerView: 4,
                    },
                },
            },
        };
    },
};
</script>
