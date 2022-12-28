<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: String,
            default: () => "dark",
        },
    },
};
</script>

<template>
    <div v-if="loading" :class="theme">
        <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
