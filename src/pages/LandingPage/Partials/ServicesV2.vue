<template>
    <section id="landing-services" class="section-v2 services-v2">
        <div class="container">
            <h2 class="section__title">
                {{ $t("Why they") }}

                <span class="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="78"
                        height="78"
                        viewBox="0 0 78 78"
                    >
                        <g
                            data-name="Group 5903"
                            transform="translate(-932 -870)"
                        >
                            <circle
                                data-name="Ellipse 1410"
                                cx="39"
                                cy="39"
                                r="39"
                                transform="translate(932 870)"
                                style="fill: #cdf0f9"
                            />
                            <path
                                data-name="Path 4898"
                                d="M0 123.242h1.954v1.958H0zm0 0"
                                transform="translate(941.693 787.807)"
                                style="fill: #24bce3"
                            />
                            <path
                                data-name="Path 4899"
                                d="M69.848 76.994a2.931 2.931 0 0 0-5.06.315L63.7 79.481a.976.976 0 0 1-1.615.2l-2.411-2.812a2.931 2.931 0 0 0-4.513.076l-.86 1.073a1 1 0 0 1-.777.366.97.97 0 0 1-.766-.391l-2.452-3.268a2.93 2.93 0 0 0-4.965.447l-2.224 4.447H32v1.954h12.326l2.764-5.527a.977.977 0 0 1 1.655-.149l2.455 3.268a2.911 2.911 0 0 0 2.3 1.172h.047a2.909 2.909 0 0 0 2.287-1.1l.86-1.073a.972.972 0 0 1 .746-.366.919.919 0 0 1 .758.341l2.402 2.812a2.925 2.925 0 0 0 2.223 1.024 3.036 3.036 0 0 0 .361-.022 2.924 2.924 0 0 0 2.263-1.6l1.087-2.172a.977.977 0 0 1 1.687-.1l2.33 3.495H82.8v-1.957H71.6zm0 0"
                                transform="translate(913.601 831.43)"
                                style="fill: #24bce3"
                            />
                            <path
                                data-name="Path 4900"
                                d="M464 123.242h1.954v1.958H464zm0 0"
                                transform="translate(534.352 787.807)"
                                style="fill: #24bce3"
                            />
                            <path
                                data-name="Path 4901"
                                d="M93.238 12.676a7.5 7.5 0 0 1 12.079-8.525l3.488 3.489 3.488-3.489a7.5 7.5 0 0 1 12.079 8.525l1.765.84A9.456 9.456 0 0 0 110.911 2.77l-2.106 2.106L106.7 2.77a9.456 9.456 0 0 0-15.227 10.746zm0 0"
                                transform="translate(862.194 895.999)"
                                style="fill: #24bce3"
                            />
                            <path
                                data-name="Path 4902"
                                d="m150.541 160.756-11-12.049-1.441 1.316 12.443 13.63 12.443-13.63-1.441-1.316zm0 0"
                                transform="translate(820.458 765.451)"
                                style="fill: #24bce3"
                            />
                        </g>
                    </svg>
                </span>

                {{ $t("BokDoc") }}
            </h2>

            <div class="items">
                <swiper v-bind="settings">
                    <swiper-slide v-for="item in services" :key="item.id">
                        <div
                            class="item"
                            @click.stop="
                                $vfm.show('services', {
                                    content: item.content,
                                })
                            "
                        >
                            <div class="item__image">
                                <img
                                    :src="item.icon"
                                    :alt="item.title"
                                    :width="item.w"
                                    :height="item.h"
                                />
                            </div>
                            <div class="item__content">
                                {{ item.title }}
                                <br />
                                {{ item.subtitle }}
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>

            <comp-btn
                as="Link"
                href="/specialities"
                variant="secondary"
                class="rounded mx-auto fit-content"
                size="xl"
                style="--fs: 1.125rem; --fw: 600"
            >
                {{ $t("Search for best doctor") }}
            </comp-btn>
        </div>
    </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    computed: {
        services() {
            return [
                {
                    id: 1,
                    icon: "/images/service-comparision-2.svg",
                    title: "Comparison",
                    subtitle: "Doctors and Hospitals",
                    w: 56,
                    h: 58,
                    content: {
                        title: "Compare the most famous doctors and hospitals",
                        text: "Through BokDoc, you can compare doctors and hospitals to perform your operation and find out the appropriate prices for the medical procedure you want",
                    },
                },
                {
                    id: 2,
                    icon: "/images/service-free-2.svg",
                    title: "Examinations",
                    subtitle: "Free examinations",
                    w: 56,
                    h: 56,
                    content: {
                        title: "Free examination for your medical procedure",
                        text: "Through BokDoc, most of medical procedures have a free examination in order to be reassured before you continue the process",
                    },
                },
                {
                    id: 3,
                    icon: "/images/service-assistant-2.svg",
                    title: "Personal assistant",
                    subtitle: "Step by step",
                    w: 46,
                    h: 66,
                    content: {
                        title: "You will have a personal assistant to guide you through the procedures",
                        text: "A dedicated patient care team helps you for free step by step until you finish your procedure",
                    },
                },
                {
                    id: 4,
                    icon: "/images/service-reviews-2.svg",
                    title: "Reviews",
                    subtitle: "Listen to others",
                    w: 64,
                    h: 64,
                    content: {
                        title: "Rest assured by reading other patients reviews",
                        text: "Through BokDoc you will see reviews of same patients cases",
                    },
                },
                {
                    id: 5,
                    icon: "/images/service-discount-2.svg",
                    title: "Offers",
                    subtitle: "Exclusive discounts",
                    w: 57,
                    h: 48,
                    content: {
                        title: "Exclusive discounts all the time",
                        text: "Through BokDoc you will have an exclusive discounts up to 50%",
                    },
                },
                {
                    id: 6,
                    icon: "/images/service-installment-2.svg",
                    title: "Installments",
                    subtitle: "Installment without interest",
                    w: 52,
                    h: 54,
                    content: {
                        title: "Installment service according to Islamic Sharia",
                        text: "BokDoc is the first to launch several different systems for the installment of medical procedures to facilitate the patients and doctors with all the facilities",
                    },
                },
            ];
        },
    },

    data() {
        return {
            settings: {
                slidesPerView: 1.25,
                allowTouchMove: true,
                spaceBetween: 20,

                breakpoints: {
                    640: {
                        slidesPerView: 2.125,
                    },
                    768: {
                        slidesPerView: 3.25,
                        spaceBetween: 30,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                        enable: false,
                        allowTouchMove: false,
                        allowSlidePrev: false,
                        allowSlideNext: false,
                    },
                },
            },
        };
    },
};
</script>
