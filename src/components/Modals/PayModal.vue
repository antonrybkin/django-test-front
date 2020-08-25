<template>
  <v-dialog v-model="show" max-width="300">
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <v-card>
        <v-card-text>
          <ValidationProvider
            name="toPay"
            rules="required|numeric"
            v-slot="{ errors, valid }"
          >
            <v-text-field
              v-model="toPay"
              label="Введите сумму"
              :error-messages="errors"
              :success="valid"
            ></v-text-field>
          </ValidationProvider>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="clearForm">
            Отмена
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            :disabled="invalid || !validated"
            @click="pay"
          >
            Пополнить
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script>
export default {
  name: "PayModal",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selectedAccount: Number
  },
  data() {
    return {
      toPay: null
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    clearForm() {
      this.toPay = null;
      this.show = false;
    },

    pay() {
      const payload = {
        account: this.selectedAccount,
        amount: this.toPay
      };
      this.$store.dispatch("pay", payload).then(() => this.clearForm());
    }
  },
  mounted() {
    this.$store.dispatch("loadFees");
  }
};
</script>
