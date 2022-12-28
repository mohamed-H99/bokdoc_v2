<template>
    <div
        class="testimonials-card w-full flex flex-col justify-start items-start rounded-lg shadow relative"
    >
        <div
            class="flex gap-4 items-center justify-start transform -translate-y-1/2"
        >
            <div
                class="card-img__wrapper text-secondary shadow bg-white rounded-full"
            >
                <img
                    height="60"
                    width="60"
                    class="card-img bg-secondary bg-opacity-15 w-full h-full block p-1 rounded-full"
                    src="/images/service-3.svg"
                    alt="avatar"
                />
            </div>
            <div class="transform translate-y-1/2">
                <h3 class="fs-17 font-bold">{{ data.title }}</h3>
            </div>
        </div>
        <div
            class="content flex flex-col justify-between h-full transform -translate-y-1/4"
        >
            <q class="fs-13 quote text-start">
                {{ data.description }}
            </q>
            <div class="date flex gap-3 items-center">
                <img
                    height="12"
                    width="12"
                    src="/images/calender.svg"
                    alt="calender"
                />
                <span class="opacity-40 text-sm">
                    {{ $store.getters["localization/formatDate"](data.date) }}
                </span>
            </div>
        </div>

        <div class="card__footer">
            <Link
                :href="`/specialities`"
                class="text-secondary text-sm hover:underline font-bold w-full flex justify-between items-center"
            >
                <span>{{ $t("View Doctors This Specialty") }}</span>
                <img
                    height="16"
                    width="16"
                    class="card__footer-icon"
                    src="/images/arrow-2.svg"
                    alt="arrow"
                />
            </Link>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
});
</script>
