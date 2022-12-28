<template>
    <div
        class="chat-content-item"
        :class="{
            away,
            attachment: ['image', 'audio', 'video'].find(
                (i) => i === data.message_type
            ),
            image: data.message_type === 'image',
            audio: data.message_type === 'audio',
            file: data.message_type === 'file',
        }"
    >
        <!-- text -->
        <div v-if="data.message_type === 'text'" class="content">
            {{ data.message }}
        </div>

        <!-- image -->
        <div
            v-else-if="data.message_type === 'image'"
            class="content content--image"
        >
            <img
                :src="data.message"
                :alt="data.metadata ? data.metadata.name : ''"
                :width="data.metadata ? data.metadata.width : ''"
                :height="data.metadata ? data.metadata.height : ''"
                @click="
                    $vfm.show('chat-attachment', {
                        type: data.message_type,
                        content: data.message,
                    })
                "
            />
        </div>

        <!-- audio -->
        <div
            v-else-if="data.message_type === 'audio'"
            class="content content--audio"
        >
            <audio controls>
                <source
                    :src="data.message"
                    :type="data.metadata ? data.metadata.contentType : ''"
                />
                Your browser does not support the audio element.
            </audio>
        </div>

        <!-- video -->
        <div
            v-else-if="data.message_type === 'video'"
            class="content content--file"
        >
            <video width="320" height="240" controls>
                <source
                    :src="data.message"
                    :type="data.metadata ? data.metadata.contentType : ''"
                />
                Your browser does not support the video tag.
            </video>
        </div>

        <!-- file -->
        <div
            v-else-if="data.message_type === 'file'"
            class="content content--unsupported"
        >
            <a
                :href="data.message"
                download
                class="flex items-center gap-3 cursor-pointer"
                :title="
                    data.metadata
                        ? `[${data.metadata.name}]`
                        : $t('Download file')
                "
            >
                <strong class="long--text">
                    {{
                        data.metadata
                            ? `[${data.metadata.name}]`
                            : $t("Download file")
                    }}
                </strong>
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-download"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                        />
                    </svg>
                </span>
            </a>
        </div>

        <!-- unsupported -->
        <div v-else class="content content--unsupported">
            <i class="text-gray-450">
                {{ `(${$t("Unsupported file format")})` }}
            </i>
        </div>

        <!-- date -->
        <span class="date ltr">
            {{ formatDate(data.message_time_milliseconds) }}
        </span>
    </div>
</template>

<script>
import { format } from "date-fns";

export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        auth() {
            return this.$store.state.auth.user_auth;
        },
        away() {
            const userId = `${this.auth.type}_${this.auth.id}`;
            return userId !== this.data.message_sender_id;
        },
    },

    methods: {
        formatDate(date) {
            if (!date) {
                return "";
            }

            const sameDay = (d1, d2) =>
                d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate();
            const sameMonth = (d1, d2) =>
                d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth();
            const sameYear = (d1, d2) => d1.getFullYear() === d2.getFullYear();

            const isSameYear = sameYear(new Date(date), new Date());
            const isSameMonth = sameMonth(new Date(date), new Date());
            const isSameDay = sameDay(new Date(date), new Date());

            let result = "";

            if (!isSameYear) {
                result = format(new Date(date), "MMM dd, y - h:mm a");
            } else if (!isSameMonth) {
                result = format(new Date(date), "MMM dd - h:mm a");
            } else if (!isSameDay) {
                result = format(new Date(date), "eee - h:mm a");
            } else {
                result = format(new Date(date), "h:mm a");
            }

            return result;
        },
    },
};
</script>
