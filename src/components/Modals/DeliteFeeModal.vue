<template>
  <v-dialog
      v-model="show"
      max-width="300"
  >
    <v-card>
      <v-card-title>Вы уверены?</v-card-title>

      <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
          text
          @click="clearForm"
      >
          Отмена
      </v-btn>

      <v-btn
          color="red darken-1"
          text
          @click="delite"
      >
          Удалить
      </v-btn>
      </v-card-actions>
    </v-card>
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
      toPay: null
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
      this.toPay = null;
      this.show = false;
    },

    delite () {
      const id = this.selectedAccount
      this.$store.dispatch('delete', id).then(() => this.clearForm())
    }
  },
  mounted() {
    this.$store.dispatch('loadFees')
  }
}
</script>
