<template>
    <default-modal
        :name="modalName"
        @params="getParams"
        @beforeClose="beforeClose"
    >
        <template #body>
            <div class="c-modal__body flex flex-col items-center gap-8 p-8">
                <div
                    class="flex flex-col items-center text-center gap-4 w-11/12 md:w-3/4"
                >
                    <div class="mb-6">
                        <img
                            :src="
                                $store.state.core.logo ||
                                '/images/default-logo.svg'
                            "
                            onerror="this.src='/images/default-logo.svg'"
                            :alt="$store.state.core.site_name"
                            :title="$store.state.core.site_name"
                            class="block mx-auto"
                            width="160"
                            height=""
                        />
                    </div>
                </div>

                <!-- items -->
                <div
                    class="items grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                >
                    <Link
                        v-for="item in $store.state.geo.supported_countries"
                        :key="item.id"
                        href="#"
                        class="item"
                    ></Link>
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
            return "book-options";
        },
    },

    data() {
        return {
            loading: false,
            items: [],
        };
    },

    methods: {
        getParams(params) {
            this.items = params.items;
        },
    },
};
</script>
