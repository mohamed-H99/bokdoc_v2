<template>
    <default-modal :name="modalName" @params="getParams">
        <template #body>
            <div :class="data.type">
                <div v-if="data.type === 'image'" class="wrapper">
                    <img :src="data.content" alt="" width="" height="" />
                </div>
            </div>
        </template>
    </default-modal>
</template>

<script>
import DefaultModal from "@components/modal/DefaultModal.vue";

export default {
    components: { DefaultModal },

    computed: {
        modalName() {
            return `chat-attachment`;
        },
    },

    data() {
        return {
            data: {
                type: "",
                content: "",
                metadata: {},
            },
        };
    },

    methods: {
        getParams(params) {
            this.data = params;
        },
    },
};
</script>
