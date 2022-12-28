<template>
    <div class="slots-example">
        <header class="header py-4 border-b">
            <div class="filter flex items-center">
                <div class="date">
                    <input
                        class="form-control"
                        type="month"
                        v-model="dateFilter"
                        name=""
                        id=""
                        :min="formatingDateMonth(new Date())"
                        @change="handleFilter"
                    />
                </div>

                <div class="pagination"></div>
            </div>
        </header>

        <vue-meeting-selector
            ref="meetingSelector"
            class="slots-example__meeting-selector"
            v-model="meeting"
            :date="date"
            :loading="isLoading || loading"
            :class-names="classNames"
            :meetings-days="meetingsDays"
            @next-date="nextDate"
            @previous-date="previousDate"
        >
            <template #header="{ meetings }">
                <div class="text-black border-b py-3 cube">
                    <span class="day--name text-sm">
                        {{ $t(getDayName(meetings.date)) }}
                    </span>
                    <strong class="day--number block mt-1 fs-20">
                        {{ getDayNumber(meetings.date) }}
                    </strong>
                </div>
            </template>
            <template #meeting="{ meeting }">
                <div
                    v-if="meeting.date"
                    class="meeting cursor-pointer rounded px-5 bg-primary-200 text-sm text-black border-2 !border-primary-200 hover:!border-primary transition-colors"
                    :class="`${meetingSelectedClass(meeting)} ${
                        meeting.booked ? 'booked' : ''
                    }`"
                    @click.stop="selectMeeting(meeting)"
                >
                    {{ formatingTime(meeting.date) }}
                </div>
                <div
                    v-else
                    class="meeting--empty px-5 text-sm text-black border-2 !border-transparent rounded"
                >
                    &mdash;
                </div>
            </template>
            <template #button-previous>
                <button
                    @click.prevent="previousDate"
                    class="button-pagination rounded hover:bg-primary-200 transition-colors button--previous"
                    :disabled="isPreviousDisabled || loading"
                    :class="isPreviousDisabled || loading ? '' : 'bg-light'"
                >
                    <img src="/images/chevron--breadcrumb.svg" alt="previous" />
                </button>
            </template>
            <template #button-next>
                <button
                    @click.prevent="nextDate"
                    :disabled="loading"
                    class="button-pagination rounded hover:bg-primary-200 transition-colors button--next"
                    :class="loading ? '' : 'bg-light'"
                >
                    <img src="/images/chevron--breadcrumb.svg" alt="next" />
                </button>
            </template>
            <template #button-up="{ isDisabled }">
                <button
                    @click.prevent="previousMeetings"
                    class="button-pagination rounded hover:bg-primary-200 transition-colors button--up"
                    :disabled="isDisabled"
                    :class="isDisabled ? '' : 'bg-light'"
                >
                    <img src="/images/chevron--breadcrumb.svg" alt="up" />
                </button>
            </template>
            <template #button-down="{ isDisabled }">
                <button
                    @click.prevent="nextMeetings"
                    class="button-pagination rounded hover:bg-primary-200 transition-colors button--down"
                    :disabled="isDisabled"
                    :class="isDisabled ? '' : 'bg-light'"
                >
                    <img src="/images/chevron--breadcrumb.svg" alt="down" />
                </button>
            </template>
        </vue-meeting-selector>
    </div>
</template>

<script>
import VueMeetingSelector from "vue-meeting-selector";

export default {
    components: {
        VueMeetingSelector,
    },

    emits: ["selected", "newMonth"],

    data() {
        return {
            // fetchedDates: [],
            date: new Date(),
            dateFilter: "",
            meetingsDays: [],
            meeting: null,
            loading: true,
            nbDaysToDisplay: 4,
        };
    },
    computed: {
        classNames() {
            // because of line-height, font-type you might need to change top value
            return {
                tabLoading: "loading-div",
            };
        },
        // disable passed date
        isPreviousDisabled() {
            const date = new Date(this.date);
            date.setDate(date.getDate() - 1);

            return this.formatingDate(date) < this.formatingDate(new Date());
        },
    },
    props: {
        isLoading: {
            type: Boolean,
            default: () => false,
        },
        dates: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        handleFilter() {
            const currentDate = new Date(this.dateFilter);
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            this.date = new Date(currentDate.setFullYear(year));
            this.date = new Date(currentDate.setMonth(month));

            // this month
            if (
                this.formatingDateMonth(this.date) ===
                this.formatingDateMonth(new Date())
            ) {
                this.date = new Date(currentDate.setDate(new Date().getDate()));
            } else {
                //
            }
            this.meetingsDays = this.getNewDates(this.date);
        },

        // display meeting selected diferently
        meetingSelectedClass(meeting) {
            if (!this.meeting) {
                return "";
            }
            const selectedDate = new Date(meeting.date);
            const date = new Date(this.meeting.date);
            if (selectedDate.getTime() === date.getTime()) {
                return "meeting--selected";
            }
            return "";
        },

        // @click on meeting
        selectMeeting(meeting) {
            if (this.meeting) {
                const selectedDate = new Date(meeting.date);
                const date = new Date(this.meeting.date);
                if (selectedDate.getTime() !== date.getTime()) {
                    this.meeting = meeting;
                } else {
                    this.meeting = undefined;
                }
            } else {
                this.meeting = meeting;
            }

            this.$emit("selected", this.meeting);
        },

        formatingDate(dateToFormat) {
            const d = new Date(dateToFormat);
            const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
            const month =
                d.getMonth() + 1 < 10
                    ? `0${d.getMonth() + 1}`
                    : d.getMonth() + 1;
            const year = d.getFullYear();
            return `${year}-${month}-${day}`;
        },

        formatingDateMonth(dateToFormat) {
            const d = new Date(dateToFormat);
            const month =
                d.getMonth() + 1 < 10
                    ? `0${d.getMonth() + 1}`
                    : d.getMonth() + 1;
            const year = d.getFullYear();
            return `${year}-${month}`;
        },

        // header display
        getDayName(date, locale = "en-US") {
            var date = new Date(date);
            return date.toLocaleDateString(
                (navigator && navigator.language) || locale,
                { weekday: "long" }
            );
        },

        getDayNumber(date) {
            const d = new Date(date);
            const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
            return day;
        },

        formatingTime(date) {
            const d = new Date(date);
            const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            const minutes =
                d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
            return `${hours}:${minutes}`;
        },

        getNewDates(date) {
            let newDates = [];
            let currentDate = new Date(date);
            currentDate = new Date(
                currentDate.setDate(currentDate.getDate() - 1)
            );

            let currentMonth = currentDate.getMonth();
            let loopMonth = currentMonth;

            for (let i = 0; i < this.nbDaysToDisplay; i++) {
                currentDate = new Date(
                    currentDate.setDate(currentDate.getDate() + 1)
                );
                loopMonth = currentDate.getMonth();
                let currentDateFormat = this.formatingDate(currentDate);

                if (loopMonth !== currentMonth) {
                    this.$emit("newMonth", currentDateFormat);
                }

                let obj = this.dates.find((d) => {
                    let dDate = new Date(d ? d.date : "");
                    let dFormat = this.formatingDate(dDate);
                    return dFormat === currentDateFormat ? d : null;
                });

                newDates.push(
                    obj
                        ? {
                              date: obj.date,
                              slots: obj.slots,
                          }
                        : {
                              date: currentDateFormat,
                              slots: [],
                          }
                );
            }
            return newDates;
        },

        // @click on button-right
        async nextDate() {
            // display loading
            this.loading = true;
            // calcul new Date and change actual
            // get meetings with async function
            let currentDate = this.date;
            this.date = new Date(
                currentDate.setDate(
                    currentDate.getDate() + this.nbDaysToDisplay
                )
            );
            this.meetingsDays = this.getNewDates(this.date);
            // hide loading
            this.loading = false;
        },

        // @click on button-left
        async previousDate() {
            // display loading
            this.loading = true;
            // calcul new Date and change actual
            // you might need to handle the fact you can't go in past [DONE]
            // get meetings with async function
            let currentDate = this.date;
            this.date = new Date(
                currentDate.setDate(
                    currentDate.getDate() - this.nbDaysToDisplay
                )
            );
            this.meetingsDays = this.getNewDates(this.date);
            // hide loading
            this.loading = false;
        },

        // @click get more meetings
        nextMeetings() {
            this.$refs.meetingSelector.nextMeetings();
        },

        // @click get previous meetings
        previousMeetings() {
            this.$refs.meetingSelector.previousMeetings();
        },
    },
    async mounted() {
        // fetch data
        // this.fetchedDates = this.dates;
        // get meetings
        // this.meetingsDays = this.getNewDates(this.date);
        this.dateFilter = this.formatingDateMonth(new Date());
        // hide loading
        this.loading = false;
    },

    watch: {
        date(newVal) {
            this.dateFilter = this.formatingDateMonth(newVal);
        },
        dates(newVal) {
            if (!newVal) return;
            this.meetingsDays = this.getNewDates(this.date);
        },
    },
};
</script>
