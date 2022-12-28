<template>
    <Link
        v-if="as === 'Link'"
        :href="href"
        :target="target"
        :class="`${baseClassName} ${className}`"
    >
        <slot></slot>
    </Link>

    <a
        v-else-if="as === 'a'"
        :href="href"
        :target="target"
        :class="`${baseClassName} ${className}`"
    >
        <slot></slot>
    </a>

    <button
        v-else
        :type="as"
        :class="`${baseClassName} ${className}`"
        :disabled="loading"
        :data-loading-text="`${$t('Loading')}...`"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        as: String, // [button, a, Link]
        loading: Boolean,
        target: {
            type: String,
            default: () => "_self",
        },
        className: String,
        href: String,
        variant: {
            type: String,
            default: () => "secondary",
        },
        size: {
            type: String,
            default: () => "md",
        },
    },

    computed: {
        baseClassName() {
            let result = "comp-btn font-bold ";
            if (this.loading) result += ` loading`;
            result += ` ${this.variant}`;
            result += ` ${this.size}`;
            return result;
        },
    },
};
</script>
