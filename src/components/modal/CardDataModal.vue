<template>
    <default-modal :name="modalName" @props="getProps">
        <template #body>
            <div class="body">
                <table v-if="items.length" width="100%" class="custom-props">
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{
                                    item.price !== 0
                                        ? `${$store.state.payments.current_currency_symbol} ${item.price}`
                                        : $t("Free")
                                }}
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            return "card-data";
        },
    },

    data() {
        return {
            items: [],
        };
    },

    methods: {
        getProps(props) {
            this.items = props.items;
        },
    },
};
</script>
