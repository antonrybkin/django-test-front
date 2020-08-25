import Vue from "vue";
import Vuex from "vuex";
import {
  getAllFees,
  getAllTransactions,
  createFee,
  pay,
  spend,
  del
} from "@/api/fees";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fees: [],
    transactions: [],
    backEndError: null
  },
  mutations: {
    SET_FEES(state, fees) {
      state.fees = fees;
    },
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions;
    },
    CREATE_FEE(state, fee) {
      state.fees.push(fee);
    },
    SET_BACKEND_ERROR(state, err) {
      state.backEndError = err;
    }
  },
  actions: {
    loadFees(context) {
      getAllFees()
        .then(res => {
          context.commit(`SET_FEES`, res.data);
        })
        .catch(error => {
          const err = `Не работает BackEnd, по-этому 0 счетов. Подробнее: ${error}`;
          context.commit(`SET_BACKEND_ERROR`, err);
        });
    },
    createFee(context) {
      createFee().then(res => {
        context.commit(`CREATE_FEE`, res.data);
      });
    },
    pay(context, payload) {
      pay(payload)
        .then(() => {
          context.dispatch(`loadFees`);
        })
        .catch(error => console.error(error));
    },
    spend(context, payload) {
      return new Promise((resolve, reject) => {
        spend(payload)
          .then(() => {
            context.dispatch(`loadFees`);
            resolve(true);
          })
          .catch(error => {
            console.log(error);
            reject();
          });
      });
    },
    delete(context, id) {
      del(id)
        .then(() => {
          context.dispatch(`loadFees`);
        })
        .catch(error => console.error(error));
    },
    loadTransactions(context) {
      getAllTransactions().then(res => {
        context.commit(`SET_TRANSACTIONS`, res.data);
      });
    }
  },
  modules: {}
});
