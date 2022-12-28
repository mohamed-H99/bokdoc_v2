<template>
    <default-modal name="process" :full="true">
        <template #body>
            <div class="p-booking-process">
                <header class="header text-black text-center">
                    <div class="container">
                        <h1 class="header__title font-bold !mt-8">
                            {{ $t("How to book your surgery") }}
                        </h1>
                        <p
                            class="header__subtitle max-w-prose text-center mx-auto"
                        >
                            {{
                                $t(
                                    "Compare many doctors and hospitals, inquire about your surgery or any medical procedure, and choose the right doctor for you"
                                )
                            }}
                        </p>
                    </div>
                </header>

                <section class="text-black">
                    <div class="container">
                        <div
                            v-for="(item, index) in items"
                            :key="item.title || index"
                            class="row items-center flex flex-col lg:flex-row justify-between"
                        >
                            <div class="graphic">
                                <picture>
                                    <source
                                        :srcset="`/images/${
                                            $store.state.localization
                                                .current_locale === 'ar'
                                                ? item.image + '_ar'
                                                : item.image
                                        }@2x.png`"
                                        media="(min-width: 56.25em)"
                                    />
                                    <img
                                        v-lazy="
                                            `/images/${
                                                $store.state.localization
                                                    .current_locale === 'ar'
                                                    ? item.image + '_ar'
                                                    : item.image
                                            }.png`
                                        "
                                        :alt="$t(item.title)"
                                        :title="$t(item.title)"
                                        width="463"
                                        height="472"
                                    />
                                </picture>
                            </div>

                            <div class="info relative">
                                <span class="count text-primary">
                                    {{
                                        index + 1 > 10
                                            ? index + 1
                                            : `0${index + 1}`
                                    }}
                                </span>

                                <h2 class="title fs-20 font-bold">
                                    {{ $t(item.title) }}
                                </h2>

                                <p class="text text-sm max-w-prose">
                                    {{ $t(item.description) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </template>
    </default-modal>
</template>

<script>
import DefaultModal from "@components/modal/DefaultModal.vue";

export default {
    components: { DefaultModal },

    data() {
        return {
            items: [
                {
                    title: "Choose the right specialty for your medical procedure",
                    description:
                        "Through our website, you can choose the specialty that is right for you",
                    image: "speciality",
                },
                {
                    title: "Comparison of doctors",
                    description:
                        "We can help you compare the best doctors in the specialty or the procedure that was chosen in terms of cost, experience, skill and opinions of previous patients, and you can know the offers and discounts for each doctor",
                    image: "compare",
                },
                {
                    title: "Send the request with description and medical reports",
                    description:
                        "You can send your medical inquiry and medical reports to many doctors and you will be informed of what is best for you medically With the possibility of doing an online examination in the event that there is no time to go to the doctor and there are no reports",
                    image: "send-request",
                },
                {
                    title: "Receive and approve your application to the doctor",
                    description:
                        "You will receive an application to the doctor and you will be able to approve it or reject it",
                    image: "approval",
                },
                {
                    title: "Book an examination and examination at the doctor",
                    description:
                        "Your personal assistant follows up before the medical procedure until after the procedure to ensure your safety",
                    image: "appointments",
                },
                {
                    title: "Doing a medical procedure or operation",
                    description:
                        "You can do a medical procedure in the comfort of your own home",
                    image: "surgery",
                },
                {
                    title: "A thousand safety on you, we wish you good health",
                    description:
                        "The task of the personal assistant does not end when the procedures are done, but communication is made after the procedures to ensure your safety",
                    image: "rating",
                },
            ],
        };
    },
};
</script>
