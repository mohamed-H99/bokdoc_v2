<template>
    <footer class="footer">
        <div class="container">
            <div class="grid pt-12 grid-cols-1 gap-8 items-center">
                <div
                    class="flex flex-col sm:flex-row justify-between md:justify-start md:gap-12 items-start gap-4 mx-auto w-full"
                >
                    <div
                        class="flex justify-center md:justify-start items-center gap-4"
                    >
                        <img
                            width="48"
                            height="48"
                            class="rounded-full footer-icon block p-3 border"
                            src="/images/phone.svg"
                            alt="phone icon"
                        />
                        <div class="flex flex-col">
                            <div class="opacity-70 fs-15 long--text">
                                {{ $t("Contact us") }}
                            </div>
                            <a
                                :href="
                                    true
                                        ? `tel:${$store.state.core.contact_us_number}`
                                        : '#'
                                "
                                class="font-normal text-gray-800 mt-0 fs-17 phone"
                            >
                                {{ $store.state.core.contact_us_number }}
                            </a>
                        </div>
                    </div>

                    <div
                        class="flex justify-center md:justify-start items-center gap-4"
                    >
                        <img
                            width="48"
                            height="48"
                            class="rounded-full footer-icon block p-3 border"
                            src="/images/share.svg"
                            alt="share icon"
                        />
                        <div class="flex items-start">
                            <div class="opacity-70 fs-15 long--text me-5">
                                {{ $t("Follow us") }}
                            </div>
                            <div class="flex items-center icon-links">
                                <a target="_black" href="#">
                                    <img
                                        width="48"
                                        class="object-contain"
                                        src="/images/facebook.svg"
                                        alt="social-media icon"
                                    />
                                </a>
                                <a target="_black" href="#">
                                    <img
                                        width="48"
                                        class="object-contain"
                                        src="/images/linked-in.svg"
                                        alt="social-media icon"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="js">
export default {
    computed: {
    }
};
</script>
