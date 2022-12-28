<template>
    <section id="landing-dropdowns" class="c-section bg-light" v-if="data && data.length > 0">
        <div class="c-section__wrapper container">
            <h2 class="fs-30 font-bold text-start title">
                {{ title }}
            </h2>

            <div
                class="dropdowns mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-between"
            >
                <dropdown
                    v-for="obj in data"
                    :key="obj.id"
                    align="right"
                    :width="48"
                    class="dropdown"
                    contentClasses="shadow-xl bg-white dropdown-menu__wrapper"
                >
                    <template #trigger>
                        <button
                            class="border dropdown-toggle bg-white w-full rounded flex justify-between items-center gap-2"
                            type="button"
                        >
                            <span>{{ obj.title }}</span>
                            <span class="dropdowns__icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="16"
                                    viewBox="0 0 12 16"
                                >
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        d="M30.5326574,32.036109 L25.9028548,37.186324 L20.8143062,32.4036061 L30.5326574,32.036109 Z M25.7504419,22.75 C25.8056159,22.75 25.8606861,22.7715073 25.9028548,22.813676 L25.9028548,22.813676 L30.6855727,27.5963939 C30.7172427,27.6280639 30.7385888,27.6641098 30.7462354,27.7027264 C30.7548763,27.7463646 30.7479196,27.7909061 30.7313959,27.8307572 C30.7149089,27.87052 30.6883771,27.9068531 30.651446,27.9315364 C30.6185512,27.9535219 30.5777234,27.963891 30.5326574,27.963891 L30.5326574,27.963891 L20.9672216,27.963891 C20.9221556,27.963891 20.8813278,27.9535219 20.8484329,27.9315364 C20.8115018,27.9068531 20.7849701,27.87052 20.768483,27.8307572 C20.7519594,27.7909061 20.7450027,27.7463646 20.7536436,27.7027264 L20.7536436,27.7027264 L25.6038716,22.8108324 C25.6441703,22.7701004 25.6973205,22.75 25.7504419,22.75 Z"
                                        transform="translate(-20 -22)"
                                    />
                                </svg>
                            </span>
                        </button>
                    </template>

                    <template #content>
                        <!-- no sub -->
                        <dropdown-link
                            v-if="
                                !obj.items || (obj.items && !obj.items.length)
                            "
                            :href="`/search?state=${obj.title}`"
                        >
                            <div class="py-1 flex items-center">
                                <span class="notifi-animation"></span>
                                <span>
                                    {{ `${$t("Doctors in")} ${$t(obj.title)}` }}
                                </span>
                            </div>
                        </dropdown-link>

                        <!-- w/sub -->
                        <template v-else>
                            <dropdown-link
                                v-for="item in obj.items"
                                :key="item.id"
                                :href="item.link"
                            >
                                <div class="py-1 flex items-center">
                                    <span class="notifi-animation"></span>
                                    <span>{{ item.title }}</span>
                                </div>
                            </dropdown-link>
                        </template>
                    </template>
                </dropdown>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "vue";
import Dropdown from "@jetstream/Dropdown.vue";
import DropdownLink from "@jetstream/DropdownLink.vue";

export default defineComponent({
    components: {
        Dropdown,
        DropdownLink,
    },

    props: {
        data: {
            type: Array,
            default: () => [],
        },
        title: String,
    },
});
</script>
