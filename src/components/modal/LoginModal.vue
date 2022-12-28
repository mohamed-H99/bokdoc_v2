<template>
  <default-modal
    :name="modalName"
    @params="getParams"
    @status="(value) => (status = value)"
  >
    <template #body>
      <form :id="formId" @submit.prevent="handleActivation">
        <div class="modal__top border-b !border-light-500 !pt--0">
          <p class="modal__top-text mt--0">
            {{
              $t(
                "This phone number is already registered before, please enter the number sent to your phone on the following entry"
              )
            }}:
          </p>

          <ul
            v-if="
              $page.props.flash &&
              $page.props.flash.successMessage &&
              $page.props.flash.message == ''
            "
            class="form-feedback-list-success"
          >
            <li>{{ $t($page.props.flash.successMessage) }}</li>
          </ul>

          <ul
            v-if="$page.props.flash && $page.props.flash.message"
            class="form-feedback-list-danger"
          >
            <li>{{ $t($page.props.flash.message) }}</li>
          </ul>

          <div class="modal__top-box relative">
            <input
              type="text"
              disabled
              readonly
              class="modal__top-phone ltr rounded-xl border-2 !border-light-680 text-center font-bold text-primary fs-16 w-full"
              :value="formattedPhone"
            />
          </div>

          <button
            class="block text-gray-290 text-xs hover:underline mx-auto mt-3 text-center bg-transparent"
            @click.prevent="$vfm.hide(modalName)"
          >
            {{ $t("Want change mobile number?") }}
          </button>
        </div>

        <div class="modal__bottom p-activation">
          <div class="modal__bottom-content">
            <otp-code
              :mobile_number="phone"
              :loading="loading || subLoading"
              @submit="(code) => handleActivation(code)"
              @resend="handleResend"
              :status="status"
              :errors="$page.props.flash && $page.props.flash.message"
            />

            <comp-btn
              variant="secondary"
              className="modal__bottom-btn rounded w-full"
              style="--min-h: 2.8125rem"
              :loading="loading || subLoading"
            >
              <strong>{{ $t("Login") }}</strong>
            </comp-btn>
          </div>
        </div>
      </form>

      <full-loader :loading="subLoading" class="!absolute" />
    </template>
  </default-modal>
</template>

<script>
import { defineAsyncComponent } from "vue";
import Cookies from "js-cookie";
import DefaultModal from "@components/modal/DefaultModal.vue";
import FullLoader from "@components/base/FullLoader.vue";

export default {
  components: {
    DefaultModal,
    FullLoader,
    OtpCode: defineAsyncComponent(() =>
      import("@components/common/OtpCode.vue")
    ),
  },

  computed: {
    modalName() {
      return "login";
    },
    formId() {
      return `form-send-patient-information-login`;
    },
  },

  data() {
    return {
      loading: false,
      subLoading: false,
      status: "",
      name: "",
      phone: "",
      formattedPhone: "",
      speciality: "",
      subSpeciality: "",
      surgery: "",
      // country_code: "",
      _errors: {},
    };
  },

  methods: {
    getParams(params) {
      this.name = params.name;
      this.phone = params.phone;
      this.formattedPhone = params.formattedPhone;
      this.speciality = params.speciality || "";
      this.subSpeciality = params.subSpeciality || "";
      this.surgery = params.surgery || "";
      // this.country_code = params.country_code || "";

      this.$inertia.post(
        "/user/send-otp",
        {
          mobile_number: this.phone,
          country_code: params.country_code,
        },
        {
          onStart: () => {},
          onSuccess: () => {},
          onError: () => {},
          onFinish: () => {
            // this.resetForm();
          },
        }
      );
    },

    handleActivation(code) {
      const otp = code.join("");
      if (!otp) {
        console.error("Otp is invalid!");
        return;
      }

      const data = {
        phone: this.phone,
        name: this.name,
        formattedPhone: this.formattedPhone,
        speciality: this.speciality,
        subSpeciality: this.subSpeciality,
        surgery: this.surgery,
      };

      // const csrf_token = usePage().props.value.csrf_token;
      const csrf_token = "";

      const utm = JSON.parse(Cookies.get("utm") || "null");
      if (!!utm) {
        data.utm = utm;
      }

      this.loading = true;
      axios
        .post("/user/validate-otp", {
          mobile_number: this.phone,
          otp,
          compare: 1,
          _token: csrf_token,
        })
        .then((res) => {
          if (res.data == "success") {
            this.$inertia.post("/check/auth/search", data, {
              preserveScroll: true,
              onStart: (visit) => {
                this.loading = true;
              },
              onSuccess: (res) => {
                // redirect to search-page w/ chosen params
                // better use Inertia.redirect();
              },
              onFinish: (visit) => {
                this.loading = false;
              },
            });
          } else {
            this.loading = false;
            this.$page.props.flash.message = this.$t("Invalid OTP");
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    handleResend() {
      this.$inertia.post(
        "/user/send-otp",
        {
          mobile_number: this.phone,
        },
        {
          onStart: () => {
            this.loading = true;
          },
          onSuccess: () => {
            // this.activateTimer();
          },
          onFinish: () => {
            this.loading = false;
            // this.resetForm();
          },
        }
      );
    },

    handleSendSmsForgetPassword() {
      this.$inertia.post(
        "/user/new-password",
        {
          phone: this.phone,
        },
        {
          preserveScroll: true,
          preserveState: true,
          onStart: (visit) => {
            this.subLoading = true;
          },
          onSuccess: (res) => {},
          onError: (errors) => {},
          onFinish: (visit) => {
            this.subLoading = false;
          },
        }
      );
    },
  },
};
</script>
