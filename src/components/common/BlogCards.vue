<template>
    <section v-if="$store.state.search.articles.length" id="blog-cards">
        <div class="items relative">
            <swiper v-bind="settings">
                <swiper-slide
                    v-for="(item, index) in $store.state.search.articles"
                    :key="item.id || index"
                >
                    <blog-card :data="item" />
                </swiper-slide>
            </swiper>

            <!-- <button
                :class="`swiper-button-next ${'blog-cards'}_swiper-button-next`"
                aria-label="next slide"
            ></button>
            <button
                :class="`swiper-button-prev ${'blog-cards'}_swiper-button-prev`"
                aria-label="prev slide"
            ></button> -->
        </div>
    </section>
</template>

<script lang="js">
import BlogCard from "@components/common/BlogCard";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
    components: {
        BlogCard,
        Swiper,
        SwiperSlide,
    },

    data() {
        return {
            settings: {
                modules: [Navigation],
                navigation: true,
                pagination: false,
                slidesPerView: 1,
                allowTouchMove: true,
                spaceBetween: 16,
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                    },
                },
            },
        };
    },

    mounted() {
        // this.$store.dispatch("search/fetchArticles", "");
    }
};
</script>
