<template>
  <v-dialog
      v-if="show"
      v-model="show"
      max-width="300"
  >
      <ValidationObserver ref="obs" tag="form" v-slot="{ invalid, validated, handleSubmit, validate }">
      <v-card>
          <v-card-text>
          <ValidationProvider name="toPay" rules="required" v-slot="{ errors, valid }">
              <v-text-field
              v-model="merchant"
              label="Название"
              :error-messages="errors"
              :success="valid"
              @keypress="errorText = ''" />
          </ValidationProvider>
          <ValidationProvider name="toPay" rules="required|numeric" v-slot="{ errors, valid }">
              <v-text-field
              v-model="toPay"
              label="Введите сумму"
              :error-messages="errors"
              @keypress="errorText = ''" />
          </ValidationProvider>
          <div class="error--text" v-if="errorText">{{ errorText }}</div>
          </v-card-text>

          <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text
              @click="clearForm"
          >
              Отмена
          </v-btn>

          <v-btn
              color="green darken-1"
              text
              :disabled="invalid || !validated"
              @click="spend"
          >
              Потратить
          </v-btn>
          </v-card-actions>
      </v-card>
      </ValidationObserver>
  </v-dialog>
</template>

<script>
export default {
  name: 'PayModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    selectedAccount: Number
  },
  data () {
    return {
      toPay: null,
      merchant: '',
      errorText: ''
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    clearForm () {
      this.merchant = '';
      this.toPay = null;
      this.show = false;
      this.errorText = '';
    },

    spend () {
      const payload = {
        account: this.selectedAccount,
        merchant: this.merchant,
        amount: this.toPay
      }
      this.$store.dispatch('spend', payload)
        .then(() => this.clearForm())
        .catch((error) => {
          this.errorText = 'Не хватает денег, либо что-то заполнено нетак.'
        })
    }
  },
  mounted() {
    this.$store.dispatch('loadFees')
  }
}
</script>
