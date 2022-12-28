<template>
    <div
        ref="accordion"
        class="faq-accordion rounded-xl overflow-hidden w-full"
        :class="isOpen ? 'isOpen' : ''"
    >
        <header class="header">
            <button
                class="flex rounded-xl w-full gap-5 items-center justify-between"
                @click.stop="toggle"
            >
                <strong class="text-sm long--text">{{ data.question }}</strong>

                <span class="icon"></span>
            </button>
        </header>

        <div class="content" :class="isOpen ? '' : 'hidden'">
            <p class="answer">{{ data.answer }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, default: () => ({}) },
    },

    data() {
        return {
            isOpen: false,
        };
    },

    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
    },
};
</script>
