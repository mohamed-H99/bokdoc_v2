<script>
export default {
    props: {
        path: Array,
        firstPath: String,
        secondPath: String,
        thirdPath: String,
    },
};
</script>

<template>
    <div class="breadcrumb bg-transparent border-b border-light-850">
        <div class="container">
            <ul
                class="list overflow-x-auto overflow-y-hidden h-full flex justify-start items-center"
            >
                <li class="item text-gray-500">
                    <Link
                        class="link transition-colors text-xs text-gray-500 hover:text-gray-800 focus:text-gray-800"
                        href="/"
                    >
                        {{ `${$t("BokDoc")} - ${$t("Homepage")}` }}
                    </Link>
                </li>
                <li
                    class="item text-gray-500"
                    v-for="(value, index) in path"
                    :key="`${value.text}_${index}`"
                >
                    <svg
                        width="5"
                        height="8"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4.94.94L4 0 0 4l4 4 .94-.94L1.887 4 4.94.94z"
                            fill="currentColor"
                            fill-rule="evenodd"
                        />
                    </svg>
                    <Link
                        class="link transition-colors text-xs text-gray-500 hover:text-gray-800 focus:text-gray-800"
                        :href="value.link"
                    >
                        {{ value.text }}
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</template>
