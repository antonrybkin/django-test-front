import Vue from 'vue'
import Vuex from 'vuex'
import { getAllFees, getAllTransactions, createFee, pay, spend, del } from "@/api/fees"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fees: [],
    transactions: []
  },
  mutations: {
    SET_FEES(state, fees) {
      state.fees = fees
    },
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    },
    CREATE_FEE(state, fee) {
      state.fees.push(fee)
    },
  },
  actions: {
    loadFees(context) {
      getAllFees()
      .then((res) => {
        context.commit(`SET_FEES`, res.data)
      })
    },
    createFee(context) {
      createFee()
      .then((res) => {
        context.commit(`CREATE_FEE`, res.data)
      })
    },
    pay(context, payload) {
      pay(payload)
      .then(() => {
        context.dispatch(`loadFees`)
      })
      .catch((error) => console.error(error))
    },
    spend(context, payload) {
      spend(payload)
      .then(() => {
        context.dispatch(`loadFees`)
      })
      .catch((error) => console.error(error))
    },
    delete(context, id) {
      del(id)
      .then(() => {
        context.dispatch(`loadFees`)
      })
      .catch((error) => console.error(error))
    },
    loadTransactions(context) {
      getAllTransactions()
      .then((res) => {
        context.commit(`SET_TRANSACTIONS`, res.data)
      })
    },
  },
  modules: {
  }
})
