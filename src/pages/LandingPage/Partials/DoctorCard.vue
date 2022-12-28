<template>
    <div class="doctor-card">
        <span class="doctor-card__badge">
            <span class="icon">
                <img
                    src="/images/auditory@2x.png"
                    alt="demo"
                    width=""
                    height=""
                />
            </span>
            <span class="text">{{ "Stirrup Bone" }}</span>
        </span>

        <div class="doctor-card__image">
            <picture>
                <source
                    srcset="/images/demo-doctor.png"
                    media="(min-width: 56.25em)"
                    width="111"
                    height="111"
                />
                <img
                    src="/images/demo-doctor.png"
                    alt="Dr. Khaled El-Gohary"
                    title="Dr. Khaled El-Gohary"
                    width="80"
                    height="80"
                />
            </picture>
        </div>

        <h3 class="doctor-card__title">{{ "Dr. Khaled El-Gohary" }}</h3>
        <span class="doctor-card__sub">{{ "Consultant" }}</span>

        <div class="doctor-card__footer">
            <span class="title">{{ $t("Starts from") }}</span>
            <strong class="price">
                {{
                    `${
                        $store.state.payments.current_currency_symbol
                    } ${"10,000"}`
                }}
            </strong>
            <p class="sub">
                {{
                    `${$t(
                        "Interest-free installments are available starting from"
                    )}  ${"517"} ${
                        $store.state.payments.current_currency_symbol
                    } ${$t("Monthly")}`
                }}
            </p>

            <comp-btn
                variant="secondary"
                size="xl"
                class="rounded !w-full"
                style="--fs: 1rem"
            >
                <span>{{ $t("Continue booking") }}</span>
            </comp-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
