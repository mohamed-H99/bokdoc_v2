<template>
    <default-modal
        :name="modalName"
        @params="getParams"
        @before-open="beforeOpen"
    >
        <template #body>
            <div class="message">
                <div class="flex items-center justify-center px-2">
                    <!-- success -->
                    <svg
                        v-if="type === 'success'"
                        xmlns="http://www.w3.org/2000/svg"
                        height="138"
                        viewBox="0 0 134.933 138"
                        width="134.933"
                    >
                        <path
                            d="m455 115.5a3.067 3.067 0 1 1 -3.067 3.067 3.068 3.068 0 0 1 3.067-3.067z"
                            fill="#94d4ff"
                            transform="translate(-323.13 -87.9)"
                        />
                        <path
                            d="m455 375.5a3.067 3.067 0 1 1 -3.067 3.067 3.068 3.068 0 0 1 3.067-3.067z"
                            fill="#94d4ff"
                            transform="translate(-323.13 -268.167)"
                        />
                        <path
                            d="m398.063 435.5a6.133 6.133 0 1 1 -6.133 6.133 6.132 6.132 0 0 1 6.133-6.133z"
                            fill="#24bce3"
                            transform="translate(-281.53 -309.767)"
                        />
                        <path
                            d="m385 25.5a3.067 3.067 0 1 1 -3.067 3.067 3.068 3.068 0 0 1 3.067-3.067z"
                            fill="#94d4ff"
                            transform="translate(-274.597 -25.5)"
                        />
                        <path
                            d="m113.263 55.5a61.333 61.333 0 1 0 61.337 61.333 61.332 61.332 0 0 0 -61.337-61.333z"
                            fill="#ffd400"
                            transform="translate(-45.797 -46.3)"
                        />
                        <path
                            d="m147.93 197.5a46 46 0 1 1 46-46 46 46 0 0 1 -46 46z"
                            fill="#fff"
                            transform="translate(-80.463 -80.967)"
                        />
                        <path
                            d="m219.264 204.157a6.131 6.131 0 0 1 0 8.673l-21.684 21.687-8.673 8.673-8.676-8.673-6.5-6.507a6.133 6.133 0 1 1 8.673-8.673l6.507 6.5 21.685-21.684a6.13 6.13 0 0 1 8.672 0z"
                            fill="#24bce3"
                            transform="translate(-128.997 -148.123)"
                        />
                        <path
                            d="m95 455.5a3.067 3.067 0 1 1 -3.067 3.067 3.068 3.068 0 0 1 3.067-3.067z"
                            fill="#94d4ff"
                            transform="translate(-73.53 -323.633)"
                        />
                        <path
                            d="m59.6 45.5a7.667 7.667 0 1 1 -7.667 7.667 7.666 7.666 0 0 1 7.667-7.667z"
                            fill="#24bce3"
                            transform="translate(-45.797 -39.367)"
                        />
                        <path
                            d="m35 125.5a3.067 3.067 0 1 1 -3.067 3.067 3.068 3.068 0 0 1 3.067-3.067z"
                            fill="#94d4ff"
                            transform="translate(-31.93 -94.833)"
                        />
                        <path
                            d="m35 375.5a3.067 3.067 0 1 1 -3.067 3.067 3.068 3.068 0 0 1 3.067-3.067z"
                            fill="#94d4ff"
                            transform="translate(-31.93 -268.167)"
                        />
                        <g fill="#d0dce7">
                            <path
                                d="m281.8 248.567a3.067 3.067 0 1 0 -6.133 0 30.7 30.7 0 0 1 -30.667 30.666 3.067 3.067 0 0 0 -3.067 3.067v12.162c1.014.067 2.036.1 3.067.1s2.053-.037 3.067-.1v-9.222a36.851 36.851 0 0 0 33.733-36.673z"
                                transform="translate(-177.53 -178.034)"
                            />
                            <path
                                d="m131.93 151.5a3.067 3.067 0 1 0 6.133 0 30.7 30.7 0 0 1 30.667-30.667 3.067 3.067 0 0 0 3.067-3.067v-12.166c-1.014-.067-2.036-.1-3.067-.1s-2.053.037-3.067.1v9.222a36.851 36.851 0 0 0 -33.733 36.678z"
                                transform="translate(-101.263 -80.967)"
                            />
                        </g>
                    </svg>

                    <!-- error -->
                    <svg
                        v-if="type === 'error'"
                        xmlns="http://www.w3.org/2000/svg"
                        width="114"
                        height="114"
                        viewBox="0 0 114 114"
                    >
                        <g data-name="Group 4014">
                            <path
                                data-name="Path 2758"
                                d="M69.884 134.927c-10.317 0-19-.484-25.76-1.077a6.2 6.2 0 0 1-5.181-8.549A214.2 214.2 0 0 1 55.27 93.7c4.37-7 8.59-12.894 12.157-17.533a6.205 6.205 0 0 1 9.844 0 221.672 221.672 0 0 1 12.1 17.434A214.356 214.356 0 0 1 105.634 125a6.207 6.207 0 0 1-5.189 8.56 348.88 348.88 0 0 1-30.561 1.367z"
                                transform="translate(-15.273 -45.06)"
                                style="fill: #dd636e"
                            />
                            <path
                                data-name="Path 2759"
                                d="M73.808 73.911a5.636 5.636 0 0 0-3.182 2.276 224.395 224.395 0 0 0-11.152 17.689A224.681 224.681 0 0 0 44.5 125.761c-1.329 3.535.513 7.442 3.716 8.419q-2.149-.155-4.089-.327a6.2 6.2 0 0 1-5.181-8.55A214.284 214.284 0 0 1 55.271 93.7a219.93 219.93 0 0 1 12.157-17.533 6.2 6.2 0 0 1 6.38-2.255z"
                                transform="translate(-15.273 -45.063)"
                                style="fill: #da4a54"
                            />
                            <g data-name="Group 4011">
                                <path
                                    data-name="Path 2760"
                                    d="M441.838 251.4v-.45a3.018 3.018 0 0 1 2.811-3.011l4.868-.334a3.017 3.017 0 0 1 3.224 3.011v1.118a3.018 3.018 0 0 1-3.224 3.011l-4.868-.334a3.018 3.018 0 0 1-2.811-3.011z"
                                    transform="translate(-355.957 -191.905)"
                                    style="fill: #dd636e"
                                />
                                <path
                                    data-name="Path 2761"
                                    d="m414.243 137.427-.225-.39a3.018 3.018 0 0 1 .929-4.013L419 130.3a3.018 3.018 0 0 1 4.3 1l.559.968a3.018 3.018 0 0 1-1.287 4.219l-4.383 2.145a3.017 3.017 0 0 1-3.946-1.205z"
                                    transform="translate(-332.119 -92.402)"
                                    style="fill: #dd636e"
                                />
                                <path
                                    data-name="Path 2762"
                                    d="m339.852 54.748-.39-.225a3.017 3.017 0 0 1-1.2-3.94l2.145-4.383a3.018 3.018 0 0 1 4.219-1.287l.968.559a3.018 3.018 0 0 1 1 4.3l-2.723 4.049a3.018 3.018 0 0 1-4.019.927z"
                                    transform="translate(-268.216 -20.375)"
                                    style="fill: #dd636e"
                                />
                            </g>
                            <g data-name="Group 4012">
                                <path
                                    data-name="Path 2763"
                                    d="M10.9 251.4v-.45a3.018 3.018 0 0 0-2.811-3.011l-4.868-.334A3.018 3.018 0 0 0 0 250.617v1.118a3.018 3.018 0 0 0 3.224 3.011l4.868-.334A3.017 3.017 0 0 0 10.9 251.4z"
                                    transform="translate(17.217 -191.905)"
                                    style="fill: #dd636e"
                                />
                                <path
                                    data-name="Path 2764"
                                    d="m39.908 137.427.225-.39a3.018 3.018 0 0 0-.929-4.013l-4.049-2.724a3.018 3.018 0 0 0-4.3 1l-.559.968a3.018 3.018 0 0 0 1.287 4.219l4.383 2.145a3.017 3.017 0 0 0 3.942-1.205z"
                                    transform="translate(-8.031 -92.402)"
                                    style="fill: #dd636e"
                                />
                                <path
                                    data-name="Path 2765"
                                    d="m122.425 54.748.39-.225a3.017 3.017 0 0 0 1.2-3.94l-2.144-4.383a3.018 3.018 0 0 0-4.219-1.287l-.968.559a3.018 3.018 0 0 0-1 4.3l2.723 4.049a3.018 3.018 0 0 0 4.018.927z"
                                    transform="translate(-80.059 -20.375)"
                                    style="fill: #dd636e"
                                />
                            </g>
                            <g data-name="Group 4013">
                                <path
                                    data-name="Path 2766"
                                    d="M229.792 179.644a17.361 17.361 0 0 1 3.483 0 2.963 2.963 0 0 1 2.647 2.849q.266 7.238 0 14.476a2.963 2.963 0 0 1-2.647 2.849 17.361 17.361 0 0 1-3.483 0 2.963 2.963 0 0 1-2.647-2.849q-.266-7.238 0-14.476a2.963 2.963 0 0 1 2.647-2.849z"
                                    transform="translate(-174.516 -134.437)"
                                    style="fill: #fff"
                                />
                                <path
                                    data-name="Path 2767"
                                    d="M229.877 343.8q1.657-.079 3.314 0a2.963 2.963 0 0 1 2.814 2.821q.1 2.227 0 4.453a2.963 2.963 0 0 1-2.814 2.821q-1.657.079-3.314 0a2.963 2.963 0 0 1-2.814-2.821q-.1-2.227 0-4.453a2.963 2.963 0 0 1 2.814-2.821z"
                                    transform="translate(-174.517 -273.122)"
                                    style="fill: #fff"
                                />
                            </g>
                            <g
                                data-name="Ellipse 1244"
                                style="
                                    stroke: #dd636e;
                                    stroke-width: 4px;
                                    fill: none;
                                "
                            >
                                <circle
                                    cx="57"
                                    cy="57"
                                    r="57"
                                    style="stroke: none"
                                />
                                <circle
                                    cx="57"
                                    cy="57"
                                    r="55"
                                    style="fill: none"
                                />
                            </g>
                        </g>
                    </svg>
                </div>

                <div class="message-content">
                    <h3 class="message-content-title">
                        {{ msg.title }}
                    </h3>
                    <p class="message-content-subtitle">
                        {{ msg.description }}
                    </p>
                </div>

                <template v-if="showApps">
                    <div class="divider"></div>

                    <div class="apps">
                        <h4 class="apps-heading uppercase">
                            {{ $t("Download app") }}
                        </h4>
                        <div class="apps-icons">
                            <a
                                :href="$store.state.core.ios_url_patient || '#'"
                                aria-label="download app from app store"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="/images/app-store.svg"
                                    alt="app store"
                                    height="40"
                                    width="118"
                                />
                            </a>
                            <a
                                :href="
                                    $store.state.core.android_url_patient || '#'
                                "
                                aria-label="download app from google play"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="/images/google-play.svg"
                                    alt="google play"
                                    height="40"
                                    width="118"
                                />
                            </a>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </default-modal>
</template>

<script>
import DefaultModal from "@components/modal/DefaultModal.vue";

export default {
    components: { DefaultModal },

    emits: ["close"],

    computed: {
        modalName() {
            return "message";
        },
        msg() {
            let result = {
                title: "",
                description: "",
            };
            // title
            if (this.message && this.message.title) {
                result.title = this.message.title;
            } else {
                result.title =
                    this.messages[this.type] && this.messages[this.type].title;
            }
            // description
            if (this.message && this.message.description) {
                result.description = this.message.description;
            } else {
                result.description =
                    this.messages[this.type] &&
                    this.messages[this.type].description;
            }
            return result;
        },
    },

    data() {
        return {
            messages: {
                success: {
                    title: this.$t("Thank you"),
                    description: this.$t(
                        "Your request has been successfully sent You will be contacted"
                    ),
                },
                error: {
                    title: this.$t("Unexpected error occurred"),
                    description:
                        this.$t(
                            "We have been notified of this error and we will work to fix it as soon as possible. Glad to have you here"
                        ) + " :)",
                },
            },
            message: {
                title: "",
                description: "",
            },
            type: "success",
            code: 0,
            showApps: false,
        };
    },

    methods: {
        getParams(params) {
            this.message = params.message;
            this.type = params.type || "success";
            this.code = params.code || 0;
            this.showApps = params.showApps;
        },

        beforeOpen(event) {
            // event.stop();
        },
    },
};
</script>
