<template>
    <div ref="target">
        <slot />
    </div>
</template>

<script>
import { ref } from "vue";
import { useElementVisibility } from "@vueuse/core";

export default {
    setup() {
        const target = ref(null);
        const targetIsVisible = useElementVisibility(target);

        return {
            target,
            targetIsVisible,
        };
    },

    emits: ["visible"],

    watch: {
        targetIsVisible(newVal) {
            if (!newVal) return;
            this.$emit("visible", newVal);
        },
    },
};
</script>
