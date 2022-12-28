<template>
    <section class="section-v2 join-v2">
        <div class="container">
            <div class="row">
                <!--  -->
                <div class="content">
                    <h2 class="section__title">
                        {{
                            $t(
                                "Are you a surgeon interested in accessing new patients?"
                            )
                        }}
                    </h2>

                    <ul class="section__list">
                        <li v-for="(item, index) in items" :key="index">
                            <span class="icon">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m0 0h24v24h-24z" fill="none" />
                                    <path
                                        d="m9 16.17-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </span>
                            <span>{{ $t(item) }}</span>
                        </li>
                    </ul>

                    <comp-btn
                        variant="secondary"
                        size="xl"
                        class="rounded"
                        style="--fs: 1rem"
                        @click="$vfm.show('join')"
                    >
                        {{ $t("Doctor/hospital? join us") }}
                    </comp-btn>
                </div>

                <!-- graphic -->
                <div
                    v-if="!$store.getters['core/checkMobileView']"
                    class="graphic"
                    :style="{ '--image': `url(${'/images/call@2x.png'})` }"
                >
                    <picture>
                        <source
                            srcset="/images/call@2x.png"
                            media="(min-width: 56.25em)"
                            type="image/png"
                        />
                        <img
                            src="/images/call.png"
                            onerror="this.src='/images/call@2x.png'"
                            alt="join us"
                            width="520"
                            height="402"
                        />
                    </picture>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        items() {
            return [
                "1ST Surgery & Procedures App",
                "1ST Medical Tourism Application",
                "Surgeries installments",
                "Multiple Payment Methods",
            ];
        },
    },
};
</script>
