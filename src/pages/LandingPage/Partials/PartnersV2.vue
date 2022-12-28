<template>
    <section id="landing-partners" class="section-v2 partners-v2">
        <div
            class="container grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-8"
        >
            <div class="section__content">
                <h2 class="section__title">
                    {{ $t("The leading solution for health systems") }}
                </h2>
                <p class="section__subtitle">
                    {{ $t("The leading solution for health systems") }}
                    <br />
                    {{
                        $t(
                            "We are proud of the confidence of the largest hospitals and doctors in Bok Doc to provide solutions that help patients"
                        )
                    }}
                </p>
            </div>

            <div class="items">
                <div v-for="(img, index) in images" :key="img" class="item">
                    <picture>
                        <source
                            :srcset="`/images/${img.src}.webp`"
                            type="image/webp"
                        />
                        <img
                            height=""
                            width=""
                            class="img transition-all ease-in-out block mx-auto"
                            v-lazy="`/images/${img.src}.png`"
                            :alt="`${img.alt} ${index + 1}`"
                        />
                    </picture>
                </div>
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
