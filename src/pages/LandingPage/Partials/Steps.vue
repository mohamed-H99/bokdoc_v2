<template>
    <section id="landing-steps" class="bg-white c-section text-center">
        <div class="c-section__wrapper container">
            <div
                class="c-section__content text-black md:mx-auto md:text-center"
            >
                <h2 class="fs-34 font-bold c-sction__title">
                    {{ $t("Steps to book a surgery or procedure") }}
                </h2>
                <p class="text-lg">
                    {{
                        $t(
                            "Compare many doctors and hospitals, inquire about your surgery or any medical procedure, and choose the right doctor for you"
                        )
                    }}
                </p>
            </div>

            <swiper v-bind="settings">
                <swiper-slide
                    v-for="(item, index) in steps"
                    :key="item.id || index"
                >
                    <div
                        class="item relative flex flex-col gap-1 md:gap-4 items-center"
                    >
                        <div class="flex flex-col gap-6 items-center">
                            <div class="flex flex-col items-center">
                                <h3
                                    class="fs-20 font-bold relative z-10 flex flex-col-reverse items-center"
                                >
                                    <span class="">{{ $t(item.title) }}</span>
                                    <span
                                        class="step-number rounded-full mb-5 text-primary bg-primary-200"
                                        >{{ `0${index + 1}` }}</span
                                    >
                                </h3>
                                <p class="fs-16 mt-2">
                                    {{ $t(item.subtitle) }}
                                </p>

                                <div class="mt-10 md:px-4 lg:px-0">
                                    <picture>
                                        <!-- <source
                                            :srcset="`/images/${item.img}${
                                                $store.state.localization.current_locale_dir ===
                                                'rtl'
                                                    ? '_ar'
                                                    : ''
                                            }@2x.webp`"
                                            media="(min-width:56.25em)"
                                            type="image/webp"
                                        /> -->
                                        <!-- <source
                                            :srcset="`/images/${item.img}${
                                                $store.state.localization.current_locale_dir ===
                                                'rtl'
                                                    ? '_ar'
                                                    : ''
                                            }@2x.png`"
                                            media="(min-width:56.25em)"
                                        /> -->
                                        <!-- <source
                                            :srcset="`/images/${item.img}${
                                                $store.state.localization.current_locale_dir ===
                                                'rtl'
                                                    ? '_ar'
                                                    : ''
                                            }.webp`"
                                            type="image/webp"
                                        /> -->
                                        <img
                                            v-lazy="
                                                `/images/${item.img}${
                                                    $store.state.localization
                                                        .current_locale_dir ===
                                                    'rtl'
                                                        ? '_ar'
                                                        : ''
                                                }@2x.png`
                                            "
                                            :alt="`${item.title} ${item.subtitle}`"
                                            class=""
                                            height="399"
                                            width="360"
                                        />
                                    </picture>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>

            <comp-btn
                variant="secondary"
                as="button"
                size="xl"
                href="/specialities"
                className="mt-16 rounded-full fit-content mx-auto"
                style="--fs: 1rem"
                @click.prevent="$emit('scroll', '#landing-help')"
            >
                <strong>{{ $t("Submit your request now") }}</strong>
            </comp-btn>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default defineComponent({
    components: {
        Swiper,
        SwiperSlide,
    },

    emits: ["scroll"],

    data() {
        return {
            settings: {
                modules: [Pagination],
                navigation: false,
                pagination: { enable: true, clickable: true },
                slidesPerView: 1,
                allowTouchMove: true,
                spaceBetween: 0,
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                        pagination: { enable: true, clickable: true },
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 25,
                        pagination: false,
                    },
                },
            },
            steps: [
                {
                    img: "step1",
                    title: "Choose",
                    subtitle: "Surgery or Procedure",
                },
                {
                    img: "step2",
                    title: "Compare",
                    subtitle: "and book an examination",
                },
                {
                    img: "step3",
                    title: "Booking",
                    subtitle: "your surgery or procedure",
                },
            ],
        };
    },
});
</script>
