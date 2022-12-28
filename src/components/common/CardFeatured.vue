<script>
import OfferTimer from "@components/common/OfferTimer";
import RatingStars from "@components/common/RatingStars";

export default {
    components: {
        OfferTimer,
        RatingStars,
    },

    props: {
        loading: Boolean,
        data: { type: Object, default: () => ({}) },
    },
};
</script>

<template>
    <div
        class="featured-card rounded-xl border text-black border-secondary-255 bg-secondary-220"
    >
        <div
            class="featured-card__wrapper grid grid-cols-1 md:grid-cols-3 items-center gap-6"
        >
            <div>
                <div
                    class="header flex items-center justify-center md:justify-start"
                    v-if="true"
                >
                    <div
                        class="avatar-wrapper bg-primary-100 !border-primary-300 rounded-full overflow-hidden flex items-center justify-center"
                    >
                        <img
                            class="skeleton avatar w-full object-cover"
                            :src="
                                data.image ||
                                $store.getters['core/avatarPlaceholder']({
                                    gender: '',
                                    type: 'support-lg',
                                })
                            "
                            :class="{ 'placeholder support': !data.image }"
                            :title="data.name"
                            :alt="data.name"
                            width="80"
                            height="80"
                        />
                    </div>

                    <div class="flex flex-col">
                        <span class="title">
                            {{ data.name }}
                        </span>
                        <span class="text-sm">
                            {{ $t("Personal Medical Assistant") }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="featured-card__middle text-center">
                <p class="featured-card__middle-text font-normal">
                    {{ $t("Hello") }}
                    <br />
                    {{ $t("Can I Help you?") }}
                </p>
                <a
                    target="_blank"
                    rel="noreferrer"
                    :href="`https://wa.me/${$store.state.core.contact_us_number}`"
                    class="ltr featured-card__middle-phone block mt-1 mb-4 font-bold"
                >
                    {{ $store.state.core.contact_us_number }}
                </a>

                <comp-btn
                    id="featured-card-send-help-request"
                    :as="$store.state.auth.user_auth ? 'button' : 'Link'"
                    href="/contact-us"
                    variant="secondary"
                    size=""
                    className="rounded text-sm w-full font-normal"
                    :loading="loading"
                    @click.prevent="$emit('sendHelp')"
                >
                    <span>{{ $t("Contact us") }}</span>
                </comp-btn>
            </div>

            <div v-if="data.review" class="featured-card__review">
                <strong class="featured-card__review-name text-lg block">
                    {{ data.user }}
                </strong>

                <rating-stars :rating="Number(data.rating)" :size="10" />

                <p class="featured-card__review-text text-sm font-normal">
                    {{ data.review }}
                </p>
            </div>
        </div>
    </div>
</template>
