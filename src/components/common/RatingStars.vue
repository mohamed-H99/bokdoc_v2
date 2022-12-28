<template>
    <div class="rating-stars ltr flex items-center">
        <span v-for="i in 5" :key="i">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9.467 9.07"
                :width="size"
                :height="size"
            >
                <path
                    d="m9.261 5.157a.679.679 0 0 0 -.377-1.157l-2.292-.334a.3.3 0 0 1 -.225-.166l-1.025-2.075a.679.679 0 0 0 -1.218 0l-1.024 2.075a.3.3 0 0 1 -.226.164l-2.293.336a.679.679 0 0 0 -.381 1.158l1.663 1.616a.3.3 0 0 1 .086.265l-.391 2.283a.665.665 0 0 0 .148.551.686.686 0 0 0 .837.165l2.05-1.078a.307.307 0 0 1 .279 0l2.05 1.078a.672.672 0 0 0 .316.079.681.681 0 0 0 .521-.244.664.664 0 0 0 .148-.551l-.391-2.282a.3.3 0 0 1 .084-.266z"
                    :fill="i <= Math.round(rating) ? '#ff9900' : '#d6d6d6'"
                    transform="translate(.001 -1.047)"
                />
            </svg>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        rating: Number,
        size: {
            type: Number,
            default: () => 10,
        },
    },
};
</script>
