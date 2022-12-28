<template>
    <section class="section-v2 stats-v2">
        <div class="container">
            <div ref="statsItems" class="items">
                <div v-for="item in items" :key="item.id" class="item">
                    <div class="item__icon">
                        <img
                            :src="item.icon"
                            :alt="item.title"
                            width="98"
                            height=""
                        />
                    </div>

                    <h3 class="item__title">
                        {{
                            counters[item.id]
                                ? `${counters[item.id].count}+`
                                : 0
                        }}
                        <span class="sub">{{ item.title }}</span>
                    </h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => null,
        },
    },

    computed: {
        items() {
            return [
                {
                    id: "hospitals_and_centers_count",
                    title: "Hospitals and centers",
                    icon: "/images/hospitals_and_centers_count.svg",
                },
                {
                    id: "surgeon_and_doctor_count",
                    title: "Surgeon and doctor",
                    icon: "/images/surgeon_and_doctor_count.svg",
                },
                {
                    id: "operation_count",
                    title: "Operation",
                    icon: "/images/operation_count.svg",
                },
                {
                    id: "medical_specialty_count",
                    title: "Medical specialty",
                    icon: "/images/medical_specialty_count.svg",
                },
            ];
        },
    },

    data() {
        return {
            inview: false,
            counters: {},
        };
    },

    mounted() {
        window.addEventListener("scroll", this.handleCounterView, {
            passive: true,
        });
    },

    methods: {
        handleCounterView() {
            const res = this.isElementVisible(this.$refs.statsItems);
            if (!!res) {
                this.inview = true;
            }
        },

        isElementVisible(el) {
            if (!el) {
                return;
            }

            var rect = el.getBoundingClientRect(),
                vWidth =
                    window.innerWidth || document.documentElement.clientWidth,
                vHeight =
                    window.innerHeight || document.documentElement.clientHeight,
                efp = function (x, y) {
                    return document.elementFromPoint(x, y);
                };

            // Return false if it's not in the viewport
            if (
                rect.right < 0 ||
                rect.bottom < 0 ||
                rect.left > vWidth ||
                rect.top > vHeight
            )
                return false;

            // Return true if any of its four corners are visible
            return (
                el.contains(efp(rect.left, rect.top)) ||
                el.contains(efp(rect.right, rect.top)) ||
                el.contains(efp(rect.right, rect.bottom)) ||
                el.contains(efp(rect.left, rect.bottom))
            );
        },

        initialize(data) {
            this.items.forEach((item) => {
                this.counters[item.id] = {
                    count: data[item.id] > 20 ? data[item.id] - 20 : 0,
                    maxCount: data[item.id],
                };
            });
        },

        activate() {
            window.removeEventListener("scroll", this.handleCounterView);

            const countersKeys = Object.keys(this.counters);

            let interv = setInterval(() => {
                if (this.isCompleted()) {
                    clearInterval(interv);
                    return;
                }

                countersKeys.forEach((key) => {
                    if (
                        this.counters[key].count < this.counters[key].maxCount
                    ) {
                        this.counters[key].count += 1;
                    }
                });
            }, 150);
        },

        isCompleted() {
            const countersKeys = Object.keys(this.counters);
            let count = 0;

            countersKeys.forEach((key) => {
                let obj = this.counters[key];

                if (obj.count >= obj.maxCount) {
                    count++;
                }
            });

            return count === countersKeys.length;
        },
    },

    watch: {
        data(newVal) {
            if (newVal) {
                this.initialize(newVal);
            }
        },
        inview(newVal) {
            if (newVal === true) {
                this.activate();
            }
        },
    },
};
</script>
