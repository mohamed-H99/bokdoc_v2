<template>
    <div
        class="pagination--wrapper flex items-center justify-center sm:justify-between flex-wrap gap-3 px-5 py-2 bg-white rounded-xl border border-light-600"
    >
        <v-pagination
            v-model="localActivePage"
            :pages="totalPages"
            :range-size="1"
            active-color="inherit"
            :per-page="10"
            @update:modelValue="(newPage) => updatePage(newPage)"
        />

        <div class="fs-13 flex items-center flex-wrap c-gap text-gray-450">
            <span>{{ $t("Results") }}</span>
            <span>{{ `${activePage} - ${totalPages}` }}</span>
        </div>
    </div>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";

if (typeof document !== "undefined") {
    require("@hennge/vue3-pagination/dist/vue3-pagination.css");
}

export default {
    components: {
        VPagination,
    },

    emits: ["updated"],

    props: {
        activePage: {
            type: Number,
            default: () => 1,
        },
        totalPages: {
            type: Number,
            default: () => 0,
        },
    },

    data() {
        return {
            localActivePage: 1,
        };
    },

    methods: {
        updatePage(newPage) {
            this.localActivePage = newPage;
            this.$emit("updated", newPage);
        },
    },

    mounted() {
        this.localActivePage = this.activePage;
    },
};
</script>
