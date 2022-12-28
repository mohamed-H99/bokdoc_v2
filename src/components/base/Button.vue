<script>
import Loader from "@components/base/Loader";

export default {
    components: { Loader },

    props: {
        loading: Boolean,
        img: Object,
        contentClass: String,
        imgClass: String,
        imgWidth: Number,
        imgHeight: Number,
        text: String,
        variant: String,
        size: String,
        imgFirst: Boolean,
        as: String,
        href: String,
        effect: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<template>
    <Link
        v-if="as === 'Link'"
        :href="href"
        class="font-display btn hover:bg-white flex items-center relative mx-auto rounded-full font-bold transition-all duration-300"
        :class="{
            'bg-primary text-white border-primary btn-primary':
                variant === 'primary',
            'bg-secondary border-secondary text-black focus:ring-secondary focus:ring-opacity-100 btn-secondary':
                variant === 'secondary',
            'bg-white border !border-light-850 text-black hover:!text-black hover:bg-light-850 btn-light':
                variant === 'light',
            'bg-white border !border-black text-black hover:bg-light-850 btn-white':
                variant === 'white',
            'flex justify-center items-center c-gap': img,
            'btn-lg': size === 'lg',
            'btn-sm px-3 sm:px-5 md:px-7 py-2': size === 'sm',
            'HOVER hover:text-black': effect,
            'hover:shadow-primary': effect && variant === 'primary',
            'hover:shadow-secondary': effect && variant === 'secondary',
        }"
    >
        <strong v-if="text && !imgFirst" :class="contentClass">
            {{ text }}
        </strong>
        <img
            :width="imgWidth || '20'"
            :height="imgHeight || '20'"
            v-if="img && (img.src || img.alt)"
            class="transition-all duration-300"
            :class="imgClass"
            :src="`/images/${img.src}`"
            :alt="img.alt"
        />
        <strong v-if="text && imgFirst" :class="contentClass">
            {{ text }}
        </strong>
    </Link>
    <!--  -->
    <a
        v-else-if="as === 'a'"
        :href="href"
        class="font-display btn hover:bg-white flex items-center relative mx-auto rounded-full font-bold transition-all duration-300"
        :class="{
            'bg-primary text-white border-primary btn-primary':
                variant === 'primary',
            'bg-secondary border-secondary text-black focus:ring-secondary focus:ring-opacity-100 btn-secondary':
                variant === 'secondary',
            'bg-white border !border-light-850 text-black hover:!text-black hover:bg-light-850 btn-light':
                variant === 'light',
            'bg-white border !border-black text-black hover:bg-light-850 btn-white':
                variant === 'white',
            'flex justify-center items-center c-gap': img,
            'btn-lg': size === 'lg',
            'btn-sm px-3 sm:px-5 md:px-7 py-2': size === 'sm',
            'HOVER hover:text-black': effect,
            'hover:shadow-primary': effect && variant === 'primary',
            'hover:shadow-secondary': effect && variant === 'secondary',
        }"
    >
        <strong v-if="text && !imgFirst" :class="contentClass">
            {{ text }}
        </strong>
        <img
            :width="imgWidth || '20'"
            :height="imgHeight || '20'"
            v-if="img && (img.src || img.alt)"
            class="transition-all duration-300"
            :class="imgClass"
            :src="`/images/${img.src}`"
            :alt="img.alt"
        />
        <strong v-if="text && imgFirst" :class="contentClass">
            {{ text }}
        </strong>
    </a>
    <!--  -->
    <button
        v-else
        :disabled="loading"
        class="font-display btn hover:bg-white flex items-center relative mx-auto rounded-full font-bold transition-all duration-300"
        :class="{
            isLoading: loading,
            'bg-primary text-white border-primary btn-primary':
                variant === 'primary',
            '!bg-white': loading, // && variant === 'primary'
            'bg-secondary border-secondary text-black focus:ring-secondary focus:ring-opacity-100 btn-secondary':
                variant === 'secondary',
            'bg-white border !border-light-850 text-black hover:!text-black hover:bg-light-850 btn-light':
                variant === 'light',
            'bg-white border !border-black text-black hover:bg-light-850 btn-white':
                variant === 'white',
            'flex justify-center items-center c-gap': img,
            'btn-lg': size === 'lg',
            'btn-sm px-3 sm:px-5 md:px-7 py-2': size === 'sm',
            'HOVER hover:text-black': effect,
            'hover:shadow-primary': effect && !loading && variant === 'primary',
            'hover:shadow-secondary':
                effect && !loading && variant === 'secondary',
        }"
    >
        <Loader v-if="loading" />

        <template v-else>
            <strong v-if="text && !imgFirst" :class="contentClass">
                {{ text }}
            </strong>
            <img
                :width="imgWidth || '20'"
                :height="imgHeight || '20'"
                v-if="img && (img.src || img.alt)"
                class="transition-all duration-300 dir-rotation"
                :class="imgClass"
                :src="`/images/${img.src}`"
                :alt="img.alt"
            />
            <strong v-if="text && imgFirst" :class="contentClass">
                {{ text }}
            </strong>
        </template>
    </button>
</template>
