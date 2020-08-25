<template>
  <v-container>
    <h1>Транзакции по счёту №{{ id }}:</h1>
    <v-data-table
      :headers="headers"
      :items="transactions"
      hide-default-footer
      class="fees"
    >
      <template slot="no-data">
        <div class="text-xs-center">0 транзакций</div>
      </template>
    </v-data-table>
    <router-link to="/">Список счетов</router-link>
  </v-container>
</template>

<script>
export default {
  name: 'Fees',
  data () {
    return {
      headers: [
        { text: 'Номер', value: 'id' },
        { text: 'Название', value: 'merchant' },
        { text: 'Сумма', value: 'amount' },
      ],
      id: Number(this.$route.params.id)
    }
  },
  computed: {
    transactions() {
      return this.$store.state.transactions.filter((t) => t.id === this.id)
    }
  },
  mounted() {
    this.$store.dispatch('loadTransactions')
  }
}
</script>