<template>
    <section id="landing-partners" class="c-section">
        <div
            class="container grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-8"
        >
            <div class="c-section__content">
                <h3 class="text-primary fs-21 font-bold">
                    {{ $t("The leading solution for health systems") }}
                </h3>
                <h2 class="fs-28 font-bold mt-6">
                    {{
                        $t(
                            "We are proud of the confidence of the largest hospitals and doctors in Bok Doc to provide solutions that help patients"
                        )
                    }}
                </h2>
            </div>

            <div
                class="list px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-y-0 object-contain"
            >
                <picture v-for="(img, index) in images" :key="img">
                    <source
                        :srcset="`/images/${img.src}.webp`"
                        type="image/webp"
                    />
                    <img
                        height="162"
                        width="174"
                        class="img transition-all ease-in-out block mx-auto"
                        v-lazy="`/images/${img.src}.png`"
                        :alt="`${img.alt} ${index + 1}`"
                    />
                </picture>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            images: [
                {
                    src: "logo-1",
                    alt: "partner",
                },
                {
                    src: "logo-2",
                    alt: "partner",
                },
                {
                    src: "logo-3",
                    alt: "partner",
                },
                {
                    src: "logo-4",
                    alt: "partner",
                },
                {
                    src: "logo-5",
                    alt: "partner",
                },
                {
                    src: "logo-6",
                    alt: "partner",
                },
            ],
        };
    },
};
</script>
