<template>
    <div class="doctors-filter relative">
        <swiper v-bind="settings">
            <swiper-slide v-for="i in 7" :key="i">
                <Link
                    href="#"
                    class="item"
                    :aria-label="'computerized audiometry ' + i"
                    :title="'computerized audiometry ' + i"
                >
                    <span class="item__icon">
                        <img
                            src="/images/auditory@2x.png"
                            alt="computerized audiometry"
                            width=""
                            height=""
                        />
                    </span>
                    <span class="item__text long--text">
                        {{ "computerized audiometry " + i }}
                    </span>
                </Link>
            </swiper-slide>
        </swiper>

        <button class="swiper-button-next" aria-label="next slide"></button>
        <button class="swiper-button-prev" aria-label="prev slide"></button>
    </div>
</template>

<script>
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },

    props: {
        items: {
            type: Array,
            default: () => [],
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
                slidesPerView: 2,
                allowTouchMove: true,
                spaceBetween: 12,
                freeMode: true,

                breakpoints: {
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
