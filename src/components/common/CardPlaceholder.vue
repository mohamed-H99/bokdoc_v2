<template>
    <div
        class="card-placeholder rounded-xl p-6 bg-white border !border-light-660 w-full"
    >
        <content-loader
            primaryColor="#E9EAEA"
            secondaryColor="#f7f7f7"
            viewBox="0 0 927 155"
        >
            <circle cx="41.5" cy="41.5" r="41.5" />
            <rect x="97" y="5" rx="0" ry="0" width="233" height="19" />
            <rect x="97" y="32" rx="0" ry="0" width="233" height="19" />
            <rect x="97" y="59" rx="0" ry="0" width="155" height="19" />
            <rect x="0" y="93" rx="0" ry="0" width="330" height="19" />

            <rect x="677" y="5" rx="0" ry="0" width="233" height="19" />
            <rect x="677" y="32" rx="0" ry="0" width="233" height="19" />
            <rect x="677" y="77" rx="11" ry="11" width="250" height="40" />
            <rect x="677" y="127" rx="15" ry="15" width="15" height="15" />
            <rect x="702" y="127" rx="0" ry="0" width="146" height="15" />
        </content-loader>
    </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
    components: {
        ContentLoader,
    },
};
</script>
