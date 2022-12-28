<template>
    <section
        id="landing-services"
        class="services bg-primary-100 c-section text-center"
    >
        <div class="c-section__wrapper container">
            <div>
                <h2
                    class="fs-34 centered flex justify-center items-center gap-3 font-bold"
                >
                    <span>{{ $t("Why they") }}</span>
                    <span>
                        <img
                            height="43.37"
                            width="46.04"
                            src="/images/heart.svg"
                            alt="heart"
                        />
                    </span>
                    <span>{{ $t("BokDoc") + $t("?") }}</span>
                </h2>
            </div>

            <Carousel
                v-if="$store.getters['core/isBrowser']"
                :settings="settings"
                :breakpoints="breakpoints"
                :dir="$store.state.localization.current_locale_dir"
            >
                <Slide v-for="item in services" :key="item.id">
                    <div
                        class="my-slide group item cursor-pointer"
                        @click.stop="
                            $vfm.show('services', {
                                content: item.content,
                            })
                        "
                    >
                        <div
                            class="img-wrapper group-hover:bg-primary group-hover:bg-opacity-80 group-hover:shadow-primary transition-all duration-500 rounded-full bg-white flex justify-center items-center overflow-hidden !border-primary"
                        >
                            <img
                                height="62"
                                width="62"
                                class="bg-transparent"
                                :src="`/images/${item.icon}`"
                                :alt="$t(item.title)"
                            />
                        </div>
                        <div class="flex flex-col gap-1 sm:gap-4 items-center">
                            <h3
                                class="fs-19 font-bold font-bold group-hover:text-primary"
                            >
                                {{ $t(item.title) }}
                            </h3>
                            <p class="fs-17 opacity-70">
                                {{ $t(item.subtitle) }}
                            </p>
                        </div>
                    </div>
                </Slide>

                <template #addons>
                    <Pagination />
                </template>
            </Carousel>

            <comp-btn
                variant="secondary"
                as="Link"
                size="xl"
                href="/specialities"
                rel="canonical"
                className="mt-16 rounded-full fit-content mx-auto"
                style="--fs: 1rem"
            >
                <strong>{{ $t("Search for best doctor") }}</strong>

                <span class="rtl--icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="width: auto; height: 14px"
                        fill="currentColor"
                        viewBox="0 0 16 11"
                    >
                        <path
                            d="m5.5 17 1.10785714-1.1078571-3.59857143-3.6064286h12.70499999v-1.5714286h-12.70499999l3.60642858-3.60642856-1.11571429-1.10785714-5.5 5.5z"
                            transform="translate(0 -6)"
                        />
                    </svg>
                </span>
            </comp-btn>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default defineComponent({
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },

    data() {
        return {
            settings: {
                itemsToShow: 1,
                snapAlign: "start",
                wrapAround: true,
                autoplay: 2000,
                mouseDrag: true,
                mobileFirst: true,
            },
            breakpoints: {
                640: {
                    itemsToShow: 2,
                    autoplay: 2000,
                    snapAlign: "start",
                },
                768: {
                    itemsToShow: 3,
                    snapAlign: "end",
                    autoplay: 0,
                    mouseDrag: false,
                    touchDrag: false,
                },
            },
            services: [
                {
                    id: 1,
                    icon: "service-1.svg",
                    title: "Comparison",
                    subtitle: "Doctors and Hospitals",
                    content: {
                        title: "Compare the most famous doctors and hospitals",
                        text: "Through BokDoc, you can compare doctors and hospitals to perform your operation and find out the appropriate prices for the medical procedure you want",
                    },
                },
                {
                    id: 2,
                    icon: "service-2.svg",
                    title: "Examinations",
                    subtitle: "Free examinations",
                    content: {
                        title: "Free examination for your medical procedure",
                        text: "Through BokDoc, most of medical procedures have a free examination in order to be reassured before you continue the process",
                    },
                },
                {
                    id: 3,
                    icon: "service-3.svg",
                    title: "Personal assistant",
                    subtitle: "Step by step",
                    content: {
                        title: "You will have a personal assistant to guide you through the procedures",
                        text: "A dedicated patient care team helps you for free step by step until you finish your procedure",
                    },
                },
                {
                    id: 4,
                    icon: "service-4.svg",
                    title: "Reviews",
                    subtitle: "Listen to others",
                    content: {
                        title: "Rest assured by reading other patients reviews",
                        text: "Through BokDoc you will see reviews of same patients cases",
                    },
                },
                {
                    id: 5,
                    icon: "service-5.svg",
                    title: "Offers",
                    subtitle: "Exclusive discounts",
                    content: {
                        title: "Exclusive discounts all the time",
                        text: "Through BokDoc you will have an exclusive discounts up to 50%",
                    },
                },
                {
                    id: 6,
                    icon: "service-6.svg",
                    title: "Installments",
                    subtitle: "Installment without interest",
                    content: {
                        title: "Installment service according to Islamic Sharia",
                        text: "BokDoc is the first to launch several different systems for the installment of medical procedures to facilitate the patients and doctors with all the facilities",
                    },
                },
            ],
        };
    },
});
</script>
