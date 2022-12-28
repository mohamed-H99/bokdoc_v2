<template>
    <button
        v-if="as === 'button'"
        type="submit"
        class="dropdown__link block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
        v-bind="$attrs"
    >
        <slot></slot>
    </button>

    <a
        v-else-if="as === 'a'"
        :href="href"
        :hreflang="hreflang"
        class="dropdown__link block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
        v-bind="$attrs"
    >
        <slot></slot>
    </a>

    <Link
        v-else
        :href="href"
        :hreflang="hreflang"
        class="dropdown__link block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
        v-bind="$attrs"
    >
        <slot></slot>
    </Link>
</template>

<script>
export default {
    props: {
        href: String,
        hreflang: { type: String, default: () => "" },
        as: String,
    },
};
</script>
