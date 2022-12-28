<template>
  <section id="landing-request" class="c-section bg-primary-150">
    <div
      class="c-section__wrapper container grid justify-between items-center gap-8 grid-cols-1 md:grid-cols-2"
    >
      <div class="c-section__content">
        <h2 class="fs-34 font-bold">
          {{ $t("Need installment for your surgery?") }}
        </h2>
        <p class="mt-6 fs-21">
          {{
            $t("The first site & app to installment any surgery or procedure")
          }}
        </p>

        <ul class="list mt-12 flex flex-col text-primary">
          <li v-for="item in items" :key="item" class="flex gap-3 items-center">
            <span class="list-item__icon">
              <!-- <img
                                class="checked-icon"
                                height="19"
                                width="19"
                                src="/images/checked.svg"
                                alt="checked icon"
                            /> -->
              <svg
                class="checked-icon text-primary"
                style="width: auto; height: 19px"
                viewBox="0 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" transform="">
                  <path
                    d="m7.526965 1.169865c.8036-1.55982 3.0338-1.55982 3.8374 0 .4829.93727 1.5722 1.3885 2.5764 1.06719 1.6712-.53471 3.2482 1.04226 2.7135 2.71346-.3213 1.0042.1299 2.09357 1.0672 2.57645 1.5598.8036 1.5598 3.0338 0 3.8374-.9373.4829-1.3885 1.5723-1.0672 2.5764.5347 1.6712-1.0423 3.2482-2.7135 2.7135-1.0041-.3213-2.0935.1299-2.5764 1.0672-.8036 1.5598-3.0338 1.5598-3.8374 0-.48288-.9373-1.57225-1.3885-2.57645-1.0672-1.6712.5347-3.24817-1.0423-2.71346-2.7135.32131-1.0041-.12992-2.0935-1.06719-2.5764-1.55982-.8036-1.55982-3.0338 0-3.8374.93727-.48288 1.3885-1.57225 1.06719-2.57645-.53471-1.6712 1.04226-3.24817 2.71346-2.71346 1.0042.32131 2.09357-.12992 2.57645-1.06719z"
                    fill="currentColor"
                  />
                  <path
                    d="m12.301965 5.635965c.2043-.24046.5208-.2518.7612-.04741.2405.20439.2054.52144.001.76191l-3.7555 4.751c-.2076.2443-.5754.27-.815.057l-2.57144-2.2857c-.23588-.2097-.25712-.5708-.04745-.8067.20966-.2359.57085-.2571.80672-.0475l2.13477 1.8976z"
                    fill="#fff"
                  />
                </g>
              </svg>
            </span>
            <span class="fs-17 font-bold">{{ $t(item) }}</span>
          </li>
        </ul>
      </div>

      <request-form
        :formId="'form-installment-request'"
        :loading="loading"
        :loaded="loaded"
        :errors="errors"
        @submit="(formData) => sendInstallmentRequest(formData)"
      />
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import RequestForm from "@pages/LandingPage/Partials/RequestForm.vue";

export default defineComponent({
  components: {
    RequestForm,
  },

  data() {
    return {
      loading: false,
      loaded: false,
      items: [
        "Installment up to 60 months",
        "Compliant with the provisions of Islamic Sharia",
        "Without upfront",
      ],
      errors: {
        type: Object,
        default: () => ({}),
      },
    };
  },

  methods: {
    sendInstallmentRequest({ name, age, gender, phone, description, utm }) {
      const data = {
        name,
        phone: phone.parsedPhone,
        age,
        gender,
        description,
        type: "installment form",
        utm,
      };

      this.$inertia.post("store/contact", data, {
        preserveScroll: true,
        onStart: (visit) => {
          this.loading = true;
          this.loaded = false;
        },
        onSuccess: (page) => {
          this.$store.dispatch("core/gtagEvent", {
            event: "gtm.formSubmit",
          });

          this.$vfm.show("message", {
            type: "success",
          });
        },
        onError: (errors) => {},
        onFinish: (visit) => {
          this.loading = false;
          this.loaded = true;
        },
      });
    },
  },
});
</script>
