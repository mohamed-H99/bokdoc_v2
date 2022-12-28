<template>
    <div
        v-if="timerShow"
        class="offer-timer bg-white flex items-center fit-content justify-between rounded-xl px-2 py-1 border"
    >
        <small class="pe-2 text-xs text-black">
            {{ $t("Offer Ends On") }}
        </small>
        <ul class="flex items-center countdown">
            <li class="border-light-600">
                <strong :id="'days' + id" class="text-gray-550" ref="days">
                    {{ 0 }}
                </strong>
                <small class="text-gray-415">
                    {{ $t("DAYS") }}
                </small>
            </li>
            <li class="border-light-600">
                <strong :id="'hours' + id" class="text-gray-550" ref="hours">
                    {{ 0 }}
                </strong>
                <small class="text-gray-415">
                    {{ $t("HRS") }}
                </small>
            </li>

            <li class="border-light-600">
                <strong
                    :id="'minutes' + id"
                    class="text-gray-550"
                    ref="minutes"
                >
                    {{ 0 }}
                </strong>
                <small class="text-gray-415">
                    {{ $t("MIN") }}
                </small>
            </li>

            <li class="border-light-600">
                <strong :id="'seconds' + id" class="text-red" ref="seconds">
                    {{ 0 }}
                </strong>
                <small class="text-gray-415">
                    {{ $t("SEC") }}
                </small>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        endDate: {
            type: String,
            default: () => "",
        },
        id: {
            type: Number,
            default: () => 0,
        },
    },

    data() {
        return {
            timerShow: true,
        };
    },

    mounted() {
        this.activateCountdown();
    },

    methods: {
        activateCountdown() {
            if (!this.$store.getters["core/isBrowser"]) return;
            // The data/time we want to countdown to
            const dom = {
                days: document.getElementById("days" + this.id),
                hours: document.getElementById("hours" + this.id),
                minutes: document.getElementById("minutes" + this.id),
                seconds: document.getElementById("seconds" + this.id),
            };
            const countDownDate = new Date(this.endDate).getTime();
            const now_data = new Date().getTime();
            const endTime = countDownDate - now_data;
            if (endTime <= 0) {
                this.timerShow = false;
                return;
            }

            // Run myfunc every second
            let myfunc = setInterval(function () {
                const now = new Date().getTime();
                const timeleft = countDownDate - now;

                // Calculating the days, hours, minutes and seconds left
                const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (timeleft % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

                // Result is output to the specific element

                if (dom.days) dom.days.textContent = days;
                if (dom.hours) dom.hours.textContent = hours;
                if (dom.minutes) dom.minutes.textContent = minutes;
                if (dom.seconds)
                    dom.seconds.textContent =
                        seconds < 10 ? `0${seconds}` : seconds;

                // Display the message when countdown is over
                if (timeleft < 0) {
                    clearInterval(myfunc);
                    if (dom.days) dom.days.textContent = 0;
                    if (dom.hours) dom.hours.textContent = 0;
                    if (dom.minutes) dom.minutes.textContent = 0;
                    if (dom.seconds) dom.seconds.textContent = 0;
                }
            }, 1000);
        },
    },
};
</script>
