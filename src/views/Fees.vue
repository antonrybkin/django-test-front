<template>
  <v-container>
    <h1>Cписок всех счетов:</h1>
    <v-data-table
      :headers="headers"
      :items="$store.state.fees"
      :page.sync="pagination.page"
      :items-per-page="pagination.itemsPerPage"
      hide-default-footer
      @page-count="pagination.pageCount = $event"
      class="fees"
    >
      <template v-slot:item.id="{ item }">
          <router-link :to="{ name: 'Transactions', params: { id: item.id }}">Счёт {{ item.id }}</router-link>
      </template>
      <template v-slot:item.actions="{ item }">
          <v-btn color="primary mr-3" @click="wantToPay(item.id)">Пополнить</v-btn>
          <v-btn :disabled="item.balance === '0.00'" color="primary" class="mr-3" @click="wantToSpend(item.id)">Потратить</v-btn>
          <v-btn color="error" @click="wantToDelite(item.id)">Удалить</v-btn>
      </template>
      <template slot="no-data">
        <div class="text-xs-center">0 счетов</div>
      </template>
    </v-data-table>
    <div class="grey--text mt-3 mb-3">Колличество активных счетов: {{ this.$store.state.fees.length }}</div>
    <div class="text-xs-center" v-if="pages > 1">
      <v-pagination v-model="pagination.page" :length="pagination.pageCount"></v-pagination>
    </div>
    
    <v-btn large @click="$store.dispatch('createFee')">Создать новый</v-btn>

    <PayModal v-model="dialogToPay" :selected-account="selectedAccount" />

    <SpendModal v-model="dialogToSpend" :selected-account="selectedAccount" />

    <DeliteFeeModal v-model="dialogToDelite" :selected-account="selectedAccount" />
  </v-container>
</template>

<script>
import PayModal from "@/components/Modals/PayModal"
import SpendModal from "@/components/Modals/SpendModal"
import DeliteFeeModal from "@/components/Modals/DeliteFeeModal"

export default {
  name: 'Fees',
  components: {
    PayModal,
    SpendModal,
    DeliteFeeModal
  },
  data () {
    return {
      headers: [
        { text: 'Счёт', value: 'id' },
        { text: 'сумма', value: 'balance' },
        {
          text: " ",
          sortable: false,
          value: 'actions'
        }
      ],
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'id',
        itemsPerPage: 10
      },
      dialogToPay: false,
      dialogToSpend: false,
      dialogToDelite: false,
      selectedAccount: null
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.$store.state.fees.length / this.pagination.itemsPerPage);
    }
  },
  methods: {
    wantToPay (id) {
      this.dialogToPay = true;
      this.selectedAccount = id;
    },

    wantToSpend (id) {
      this.dialogToSpend = true;
      this.selectedAccount = id;
    },

    wantToDelite (id) {
      this.dialogToDelite = true;
      this.selectedAccount = id;
    },
  }
}
</script>