<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },

    methods: {
        handleClick() {
            this.$store.dispatch('core/gtagEvent', {
                event: "gtm.click",
            });
        },
    },
};
</script>

<template>
    <div class="blog-card text-black group">
        <a
            class="blog-card__link gocompare absolute top-0 left-0 w-full h-full"
            :href="data.link"
            @click="handleClick"
            :aria-label="data.title"
            target="_blank"
            rel="noreferrer"
        ></a>
        <div class="blog-card__image--wrapper rounded-xl overflow-hidden">
            <img
                class="block blog-card__image w-full h-full object-cover"
                v-lazy="data.image"
                :alt="data.title"
                width="275"
                height="164"
            />
        </div>
        <div class="blog-card__content flex flex-col text-start">
            <h4
                class="blog-title text-sm mt-3 mb-0 font-bold group-hover:text-primary transition-colors"
            >
                {{ data.title }}
            </h4>
            <p
                class="blog-description text-xs text-gray-450 m-0"
                v-html="data.description"
            ></p>
        </div>
    </div>
</template>
