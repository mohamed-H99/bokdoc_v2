<template>
    <button
        type="button"
        class="chat-list-item"
        @click.stop="$store.dispatch('chat/fetchContactData', data)"
    >
        <div class="info">
            <strong class="info__title">
                {{ data.contact_name }}
            </strong>
            <span class="info__sub">
                <!-- {{ data.contact_country }} -->
                {{ data.surgery }}
            </span>
        </div>

        <div class="tips">
            <div v-if="!data.last_message_seen" class="tips__notification">
                <span class="dot"></span>
                {{ $t("New message from the doctor") }}
            </div>

            <div class="tips__link">
                <span class="text">{{ $t("Read messages") }}</span>

                <span class="icon rtl--icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#707070"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-chevron-left"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </span>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
