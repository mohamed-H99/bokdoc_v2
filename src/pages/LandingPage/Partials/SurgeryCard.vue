<template>
    <Link href="#" class="surgery-card" :class="`v${version}`">
        <div class="surgery-card__image">
            <picture>
                <source
                    srcset="https://picsum.photos/279/308"
                    media="(min-width: 48em)"
                    width="279"
                    height="308"
                />
                <img
                    src="https://picsum.photos/279/308"
                    alt="demo"
                    width=""
                    height=""
                    class=""
                />
            </picture>
        </div>

        <div class="surgery-card__header">
            <span class="icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45.368"
                    height="45.512"
                    viewBox="0 0 45.368 45.512"
                >
                    <g data-name="Group 5692">
                        <path
                            data-name="Path 4802"
                            d="M46.18 22.756a22.756 22.756 0 0 1-22.756 22.757C-6.729 44.4-6.721 1.111 23.424 0A22.756 22.756 0 0 1 46.18 22.756z"
                            transform="translate(-.812)"
                            style="fill: #fdcd08"
                        />
                    </g>
                    <path
                        data-name="Path 4803"
                        d="m35.802 10.676-2.159 2.159-.028-.361a.787.787 0 0 0-.724-.724l-.361-.028 2.159-2.159a.786.786 0 1 1 1.112 1.112zm-13.9 9.087a.786.786 0 1 0 0-1.112.787.787 0 0 0 0 1.112zM20.79 28.29a.786.786 0 1 0 0 1.112.787.787 0 0 0-.004-1.112zm12.664-4.878L21.526 35.333a2.887 2.887 0 0 1-4.078 0l-7.415-7.415a2.887 2.887 0 0 1 0-4.078l11.923-11.923a2.881 2.881 0 0 1 2.26-.836l8.317.64-3.407 3.407-.556-.556a.786.786 0 0 0-1.112 1.112l2.225 2.225a.786.786 0 0 0 1.112-1.112l-.556-.556 3.407-3.407.64 8.317a2.88 2.88 0 0 1-.836 2.26zM20.79 17.538a2.359 2.359 0 1 0 3.337 0 2.362 2.362 0 0 0-3.341 0zm-5.947 8.739 13.347-2.966a.787.787 0 1 0-.341-1.536l-13.347 2.967a.787.787 0 0 0 .341 1.536zm7.059 4.237a2.359 2.359 0 1 0-3.337 0 2.362 2.362 0 0 0 3.337.001z"
                    />
                </svg>
            </span>
            <div class="">
                <strong class="title">{{ "15%" }}</strong>
                <span class="sub">{{ $t("Discounts") }}</span>
            </div>
        </div>

        <div class="surgery-card__footer">
            <strong class="text--long">{{ "Sleeve gastrectomy" }}</strong>
            <span class="ltr--icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6.238"
                    height="10.565"
                    viewBox="0 0 6.238 10.565"
                >
                    <path
                        data-name="Path 4804"
                        d="m7104.415 4474 3.77 4.708-4.185 4.556"
                        transform="translate(-7103.264 -4473.375)"
                        style="fill: none; stroke: #fff; stroke-width: 2px"
                    />
                </svg>
            </span>
        </div>
    </Link>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        version: Number,
    },
};
</script>
