<template>
    <section class="section-v2 auth-v2">
        <div class="container section__wrapper">
            <div class="box">
                <div class="box__image">
                    <img
                        src="/images/section-auth-graphic.svg"
                        :alt="$t('Sign in, Save Money Instantly')"
                        width="258.711"
                        height="219.449"
                    />
                </div>

                <div class="box__content">
                    <h3 class="box__title">
                        {{ $t("Sign in, Save Money Instantly") }}
                    </h3>
                    <p class="box__description">
                        {{
                            $t(
                                "Get instant access to our special prices for our logged in users and enjoy a lot of discounts"
                            )
                        }}
                    </p>

                    <div class="actions">
                        <comp-btn
                            as="Link"
                            href="/register"
                            variant="light"
                            size="sm"
                            class="rounded-sm"
                            style="--clr-bg: #ebf1f3"
                        >
                            <span>{{ $t("Register") }}</span>
                        </comp-btn>
                        <comp-btn
                            as="Link"
                            href="/login"
                            variant="secondary"
                            size="sm"
                            class="rounded-sm"
                        >
                            <span>{{ $t("Sign in") }}</span>
                        </comp-btn>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {};
</script>
