<template>
    <div
        class="search-form-placeholder bg-white rounded-xl border !border-light-660"
    >
        <content-loader
            primaryColor="#E9EAEA"
            secondaryColor="#f7f7f7"
            viewBox="0 0 229 265"
        >
            <rect x="0" y="0" rx="0" ry="0" width="229" height="17" />
            <rect x="0" y="30" rx="0" ry="0" width="189" height="13" />

            <rect x="0" y="72" rx="0" ry="0" width="229" height="17" />
            <rect x="0" y="103" rx="0" ry="0" width="189" height="13" />

            <rect x="0" y="144" rx="0" ry="0" width="229" height="17" />
            <rect x="0" y="170" rx="0" ry="0" width="189" height="13" />

            <rect x="0" y="216" rx="8" ry="8" width="229" height="49" />
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
