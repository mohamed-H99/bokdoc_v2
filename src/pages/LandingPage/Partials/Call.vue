<template>
    <section id="landing-call" class="c-section bg-light-50">
        <div
            class="c-section__wrapper split container grid grid-cols-1 md:grid-cols-2 items-center"
        >
            <div class="hidden md:flex justify-end items-center">
                <div class="relative image-wrapper w-full">
                    <picture>
                        <source
                            srcset="/images/call@2x.webp"
                            type="image/webp"
                            media="(min-width: 48em)"
                        />
                        <source
                            srcset="/images/call@2x.png"
                            media="(min-width: 48em)"
                        />
                        <source srcset="/images/call.webp" type="image/webp" />
                        <img
                            height="402"
                            width="594"
                            class=""
                            v-lazy="`/images/call@2x.png`"
                            :alt="$t('Doctor statistics')"
                        />
                    </picture>
                </div>
            </div>
            <div class="c-section__content">
                <h2 class="c-section__heading font-bold fs-30">
                    {{
                        $t(
                            "Are you a surgeon interested in accessing new patients?"
                        )
                    }}
                </h2>

                <ul class="list flex flex-col">
                    <li
                        v-for="(item, index) in items"
                        :key="index"
                        class="flex text-md md:text-lg gap-4"
                    >
                        <span class="list-icon rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                            >
                                <g
                                    data-name="Group 4323"
                                    transform="translate(-942 -968)"
                                >
                                    <circle
                                        data-name="Ellipse 1263"
                                        cx="13"
                                        cy="13"
                                        r="13"
                                        transform="translate(942 968)"
                                        style="fill: #b9e7f3"
                                    />
                                    <path
                                        data-name="Path 3228"
                                        d="m-18425 1773.312 2.783 2.4 5.445-5.985"
                                        transform="translate(19376.082 -791.482)"
                                        style="
                                            fill: none;
                                            stroke: #23bde3;
                                            stroke-width: 2px;
                                        "
                                    />
                                </g>
                            </svg>
                        </span>
                        <span>{{ $t(item) }}</span>
                    </li>
                </ul>

                <comp-btn
                    variant="secondary"
                    as="button"
                    size="xl"
                    rel="canonical"
                    className=" rounded-full fit-content mt-6 md:ms-0"
                    style="--fs: 1rem"
                    @click.prevent="$vfm.show('join')"
                >
                    <strong>{{ $t("Doctor/hospital? join us") }}</strong>
                </comp-btn>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            items: [
                "1ST Surgery & Procedures App",
                "1ST Medical Tourism Application",
                "Surgeries installments",
                "Multiple Payment Methods",
            ],
        };
    },
};
</script>
