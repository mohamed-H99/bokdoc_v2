<template>
    <img
        :src="`/images/${icon}.svg`"
        :alt="alt"
        :width="width"
        :height="height"
        :class="classes"
    />
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
        classes: {
            type: String,
            default: () => "",
        },
        alt: {
            type: String,
            default: () => "",
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
    },
};
</script>
