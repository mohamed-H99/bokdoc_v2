<template>
    <form
        @submit.prevent="submit"
        class="hero-form bg-white rounded border-light-500"
    >
        <!--  -->
        <div class="form-group">
            <span class="form-icon text-primary" :class="{ loading: false }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22.194"
                    height="20.026"
                    viewBox="0 0 22.194 20.026"
                >
                    <path
                        data-name="Path 4798"
                        d="M11.091 26.848a6.507 6.507 0 0 0-10.007 8.215h4.784l.851-1.418a.65.65 0 0 1 1.106-.015l1.8 2.821 2.617-5.524a.651.651 0 0 1 1.16-.03l2.243 4.166H21.1c4.042-6.318-3.947-13.515-10.006-8.215z"
                        style="fill: currentColor"
                        transform="translate(0 -25.006)"
                    />
                    <path
                        data-name="Path 4799"
                        d="m61.312 204.639-1.818-3.376-2.57 5.426a.651.651 0 0 1-1.136.071l-1.863-2.927-.5.832a.65.65 0 0 1-.557.316h-4.122c.129.135-.56-.552 8.519 8.48a.65.65 0 0 0 .917 0c8.939-8.893 8.39-8.345 8.519-8.48h-4.816a.65.65 0 0 1-.573-.342z"
                        transform="translate(-46.633 -193.623)"
                        style="fill: currentColor"
                    />
                </svg>
            </span>
            <input
                class="form-control"
                :placeholder="$t('What are you complaining about?')"
            />

            <div class="form-results">
                <Link
                    href="#"
                    class="form-result transition-colors hover:bg-light-860"
                    v-for="i in 3"
                    :key="i"
                >
                    <strong class="title">{{ "Dr. mohamed fateen" }}</strong>
                    <span class="sub">{{ "Dental specialist" }}</span>
                </Link>
            </div>
        </div>
        <!--  -->
        <div class="form-group" :class="{ loading: true }">
            <span class="form-icon text-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="doctor (4)"
                    width="21.599"
                    height="25"
                    viewBox="0 0 21.599 25"
                >
                    <g data-name="Group 4512">
                        <g data-name="Group 4511">
                            <path
                                data-name="Path 4796"
                                d="M157.189 0a4.89 4.89 0 0 0-4.889 4.885v2.531a4.885 4.885 0 1 0 9.77 0V4.885A4.89 4.89 0 0 0 157.189 0z"
                                transform="translate(-146.389)"
                                style="fill: currentColor"
                            />
                        </g>
                    </g>
                    <g data-name="Group 4514">
                        <g data-name="Group 4513">
                            <path
                                data-name="Path 4797"
                                d="M55.579 267.469a12.39 12.39 0 0 0-7.04-5.565.2.2 0 0 0-.195.048 20.4 20.4 0 0 1-3.534 2.687 25.381 25.381 0 0 1-3.542-2.687.2.2 0 0 0-.195-.048 12.387 12.387 0 0 0-7.04 5.565.2.2 0 0 0 0 .2 12.527 12.527 0 0 0 21.546 0 .2.2 0 0 0 0-.2zm-4.129 1.457a.2.2 0 0 1-.21.19h-1.323a.228.228 0 0 0-.225.2v1.368a.167.167 0 0 1-.165.19h-1.189a.2.2 0 0 1-.209-.19v-1.368a.189.189 0 0 0-.182-.2h-1.38a.193.193 0 0 1-.2-.19v-1.178a.2.2 0 0 1 .2-.195h1.38a.184.184 0 0 0 .181-.2v-1.37a.206.206 0 0 1 .209-.193h1.175a.18.18 0 0 1 .178.193v1.374a.208.208 0 0 0 .212.192h1.338a.212.212 0 0 1 .21.2v1.174z"
                                transform="translate(-34.007 -248.801)"
                                style="fill: currentColor"
                            />
                        </g>
                    </g>
                </svg>
            </span>
            <input
                class="form-control"
                :placeholder="$t('Search For Doctors')"
            />
        </div>
        <!--  -->
        <comp-btn variant="secondary rounded-sm">
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.707"
                    height="15.707"
                    viewBox="0 0 15.707 15.707"
                >
                    <g data-name="Group 4523">
                        <path
                            data-name="Path 4800"
                            d="M11587.073 1698.08 11581 1692"
                            transform="translate(-11572.073 -1683.08)"
                            style="
                                stroke: currentColor;
                                stroke-width: 2px;
                                fill: none;
                            "
                        />
                        <g
                            data-name="Ellipse 1392"
                            style="
                                stroke: currentColor;
                                stroke-width: 2px;
                                fill: none;
                            "
                        >
                            <circle cx="6" cy="6" r="6" style="stroke: none" />
                            <circle cx="6" cy="6" r="5" style="fill: none" />
                        </g>
                    </g>
                </svg>
            </span>
            <span>{{ $t("Search") }}</span>
        </comp-btn>
    </form>
</template>

<script lang="js">
export default {
    data() {
        return {};
    },

    methods: {
        submit() {},
    },
};
</script>
