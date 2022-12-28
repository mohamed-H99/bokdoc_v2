<template>
    <div
        class="filters-placeholder bg-white rounded-xl border !border-light-660"
    >
        <div class="cell border-b !border-light-660" v-for="i in 3" :key="i">
            <content-loader
                primaryColor="#E9EAEA"
                secondaryColor="#f7f7f7"
                viewBox="0 0 229 183"
            >
                <rect x="0" y="0" rx="0" ry="0" width="229" height="17" />
                <rect x="0" y="30" rx="0" ry="0" width="189" height="13" />

                <rect x="0" y="70" rx="0" ry="0" width="229" height="17" />
                <rect x="0" y="101" rx="0" ry="0" width="189" height="13" />

                <rect x="0" y="142" rx="0" ry="0" width="229" height="17" />
                <rect x="0" y="168" rx="0" ry="0" width="189" height="13" />
            </content-loader>
        </div>
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
