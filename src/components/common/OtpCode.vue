<template>
    <form class="otp-code" @submit.prevent="handleOtp">
        <div class="otp-code__boxes ltr">
            <div class="otp-code__box" v-for="item in count" :key="item">
                <input
                    :id="`code_${item}`"
                    :name="`code_${item}`"
                    class="box"
                    type="text"
                    maxlength="1"
                    required
                    aria-required="true"
                    @input="(e) => handleCodeEntered(e.target.value, item)"
                    :value="code[item - 1]"
                    :disabled="loading || subLoading"
                />
            </div>
        </div>

        <div class="otp-code__actions">
            <button
                class="action"
                type="button"
                :disabled="!timerCompleted || loading || subLoading"
                @click.prevent="handleResend"
            >
                {{ $t("Resend") }}
            </button>

            <span class="timer">
                {{ visibleTimer }}
            </span>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        errors: String,
        loading: Boolean,
        status: String,
        mobile_number: String,
        count: {
            type: Number,
            default: () => 4,
        },
    },

    emits: ["submit"],

    computed: {
        visibleTimer() {
            return `00:${
                this.timerCountDown < 10
                    ? "0" + this.timerCountDown
                    : this.timerCountDown
            }`;
        },
    },

    data() {
        return {
            subLoading: false,
            code: [],
            timerCountDown: 30,
            timerCompleted: false,
            _errors: {
                phone: "",
                otp: "",
            },
        };
    },

    methods: {
        handleOtp() {
            this.$emit("submit", this.code);
        },

        activateTimer() {
            this.timerCompleted = false;
            let count = this.timerCountDown;
            let interv = setInterval(() => {
                this.timerCountDown = --count;
                if (count < 1) {
                    clearInterval(interv);
                    this.timerCompleted = true;
                }
            }, 1000);
        },

        handleCodeEntered(value, num) {
            this.code[num - 1] = value;

            if (value) {
                this.changeFocus(num + 1);
            }
        },

        changeFocus(inputNum) {
            if (!document) {
                return;
            }

            let loopCount = 0;
            let valid = this.code.every((item) => {
                loopCount++;
                return item ? true : false;
            });

            valid = loopCount === this.count ? valid : false;
            if (this.code.length === this.count && valid) {
                this.handleOtp();
            } else {
                const input = document.querySelector(`#code_${inputNum}`);
                if (input) {
                    input.focus();
                }
            }
        },

        async handleResend() {
            if (!this.mobile_number) {
                this._errors.phone = this.$t("Phone is not provided");
                return;
            }

            this.resetForm();
            this.$emit("resend");
        },

        resetForm() {
            this._errors = {};
            this.timerCompleted = false;
            this.timerCountDown = 30;
            this.code = [];
            this.changeFocus(0);
        },
    },

    beforeDestroy() {
        this.resetForm();
    },

    watch: {
        status: {
            handler(newVal) {
                if (newVal === "beforeOpen") {
                    this.activateTimer();
                    this.changeFocus(1);
                } else if (newVal === "beforeClose") {
                    this.resetForm();
                }
            },
            immidiate: true,
        },
        errors: {
            handler(newVal) {
                if (newVal) {
                    this.resetForm();
                }
            },
            immidiate: true,
            deep: true,
        },
    },
};
</script>

<style>
.otp-code {
    --clr-bg: #fafafa;
    --clr-text: #24bce3;
    --shadow: none;
    --effect: 375ms ease-in-out;
    --w: 76px;
    --h: 65px;
    --radius: 5px;
}
.otp-code__boxes {
    display: flex;
    align-items: center;
    gap: 1.375rem;
    justify-content: center;
}
.otp-code__box input {
    transition: background-color var(--effect), color var(--effect),
        box-shadow var(--effect);
    font-weight: 600;
    font-size: 1.875rem;
    background-color: var(--clr-bg);
    color: var(--clr-text);
    box-shadow: var(--shadow) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: var(--w);
    min-width: var(--w);
    height: var(--h);
    border-radius: var(--radius);
    border: 0;
    outline: none;
}
.otp-code__box input:focus {
    --clr-bg: #ffffff;
    --shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
/* @media (prefers-reduced-motion: reduce) {
    .otp-code__box {
        --effect: 0s;
    }
} */
.otp-code__box input:disabled {
    --clr-bg: #fafafa;
    --shadow: none;
    cursor: no-drop;
}
.otp-code__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    color: #8b8b8b;
    font-weight: normal;
    margin-top: 1.875rem;
}
.otp-code__actions .action {
    font-size: 0.875rem;
    cursor: no-drop;
}
.otp-code__actions .action:not(:disabled):hover {
    text-decoration: underline;
    color: #000000;
    cursor: pointer;
}
.otp-code__actions .timer {
    font-size: 1rem;
}
</style>
