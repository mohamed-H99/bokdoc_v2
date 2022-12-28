<template>
    <section id="landing-counters" class="c-section" ref="counters">
        <div class="c-section__wrapper container">
            <ul
                class="list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8"
            >
                <li
                    class="list-item group"
                    v-for="item in items"
                    :key="item.id"
                    :ref="item.id"
                >
                    <div class="list-item__img-wrapper">
                        <img
                            height="87"
                            width="100"
                            class="shape p-2 transition-all duration-500"
                            src="/images/hexagonal-shape.svg"
                            alt="hexagonal shape"
                        />
                        <img
                            height="50"
                            width="40"
                            class="list-img mx-auto"
                            v-lazy="`/images/${item.icon}`"
                            :alt="$t(item.title)"
                        />
                    </div>
                    <div class="flex flex-col items-center gap-4 mt-4">
                        <strong class="block fs-36 font-bold text-primary">
                            {{
                                counters[item.id]
                                    ? counters[item.id].count + "+"
                                    : 0
                            }}
                        </strong>
                        <h3
                            class="text-gray-darker font-bold fs-15 text-center"
                        >
                            {{ $t(item.title) }}
                        </h3>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        inView: Boolean,
        data: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            items: [
                {
                    id: "hospitals_and_centers_count",
                    title: "Hospitals and centers",
                    icon: "counters-1.svg",
                },
                {
                    id: "surgeon_and_doctor_count",
                    title: "Surgeon and doctor",
                    icon: "counters-2.svg",
                },
                {
                    id: "operation_count",
                    title: "Operation",
                    icon: "counters-3.svg",
                },
                {
                    id: "medical_specialty_count",
                    title: "Medical specialty",
                    icon: "counters-4.svg",
                },
            ],

            counters: {},
        };
    },

    methods: {
        initCounter(data) {
            this.items.forEach((item) => {
                this.counters[item.id] = {
                    count: data[item.id] > 10 ? data[item.id] - 10 : 0,
                    maxCount: data[item.id],
                };
            });
        },

        activateCounter() {
            const countersKeys = Object.keys(this.counters);

            let interv = setInterval(() => {
                if (this.countersCompleted()) {
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
            }, 200);
        },

        countersCompleted() {
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
                this.initCounter(newVal);
            }
        },
        inView(newVal) {
            if (newVal) {
                this.activateCounter();
            }
        },
    },
};
</script>
