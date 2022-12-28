<template>
    <div @mouseleave="handleClose" class="dropdown-hover-overlay relative">
        <div @mouseover="open = true">
            <slot name="trigger"></slot>
        </div>

        <!-- Full Screen Dropdown Overlay -->
        <div
            v-show="open"
            class="overlay fixed inset-0"
            @click="handleClose"
        ></div>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div
                v-show="open"
                class="dropdown-menu absolute z-50 mt-2 shadow-lg"
                :class="[widthClass, alignmentClasses]"
                @mouseleave="handleClose"
            >
                <div
                    class="dropdown-menu__wrapper ring-1 ring-black rounded ring-opacity-5"
                    :class="contentClasses"
                >
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
    props: {
        align: {
            default: "right",
        },
        width: {
            default: "48",
        },
        contentClasses: {
            default: () => ["py-1", "bg-white"],
        },
    },

    setup() {
        let open = ref(false);

        const closeOnEscape = (e) => {
            if (open.value && e.keyCode === 27) {
                open.value = false;
            }
        };

        const handleClose = (e) => {
            const searchForm = e.target.closest(".search-form");
            if (!searchForm) open.value = false;
        };

        onMounted(() => {
            if (!document) return;
            document.addEventListener("keydown", closeOnEscape);
        });
        onUnmounted(() => {
            if (!document) return;
            document.removeEventListener("keydown", closeOnEscape);
        });

        return {
            open,
            handleClose,
        };
    },

    computed: {
        widthClass() {
            return {
                48: "w-48",
            }[this.width.toString()];
        },

        alignmentClasses() {
            if (this.align === "left") {
                return "origin-top-left left-0";
            } else if (this.align === "right") {
                return "origin-top-right right-0";
            } else {
                return "origin-top";
            }
        },
    },
});
</script>
