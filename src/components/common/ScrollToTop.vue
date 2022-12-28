<script>
export default {
    computed: {
        btn() {
            return this.$refs.btn;
        },
    },

    methods: {
        scrollToTop() {
            if (!this.$store.getters["core/isBrowser"]) return;
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        check() {
            if (!window) {
                return;
            }

            if (window.scrollY > window.innerHeight)
                this.btn.classList.add("show");
            else this.btn.classList.remove("show");
        },
    },

    mounted() {
        if (!this.$store.getters["core/isBrowser"]) {
            return;
        }

        window.addEventListener("scroll", this.check, { passive: true });
    },

    unmounted() {
        if (!this.$store.getters["core/isBrowser"]) {
            return;
        }

        window.removeEventListener("scroll", this.check);
    },
};
</script>

<template>
    <button
        ref="btn"
        @click.stop="scrollToTop"
        class="scroll-to-top-btn text-white justify-center !fixed rounded-full bottom-9 right-4 !p-2 pointer-events-none opacity-0 bg-primary flex justify-center items-center transition-opacity"
        aria-label="scroll to top button"
    >
        <svg
            class="transform rotate-90 h-4 w-auto"
            fill="currentColor"
            viewBox="0 0 16 11"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m5.5 17 1.10785714-1.1078571-3.59857143-3.6064286h12.70499999v-1.5714286h-12.70499999l3.60642858-3.60642856-1.11571429-1.10785714-5.5 5.5z"
                transform="translate(0 -6)"
            />
        </svg>
    </button>
</template>
