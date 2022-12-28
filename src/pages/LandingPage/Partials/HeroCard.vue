<template>
    <Link href="#" class="hero-card transition-transform">
        <div class="hero-card__header">
            <span class="hero-card__image">
                <img
                    :src="data.image || '/images/botox@2x.png'"
                    :alt="data.name"
                    width=""
                    height="68"
                />
            </span>

            <span class="hero-card__badge">
                {{ `${$t("Save up to")} ${"15%"}` }}
            </span>
        </div>

        <strong class="hero-card__title long--text">
            {{ data.name || "Bariatric-Surgery" }}
        </strong>
        <div class="hero-card__subtitle">
            {{ $t("Starting from") + ":" }}

            <strong class="price ms-2 text-primary">
                {{ `${7400} ${$store.state.payments.current_currency_symbol}` }}
            </strong>
        </div>
    </Link>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            defaulkt: () => ({}),
        },
    },
};
</script>
