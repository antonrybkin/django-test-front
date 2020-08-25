import Vue from 'vue'
import { required, numeric } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import { ValidationObserver, ValidationProvider } from 'vee-validate';

extend("required", {
  ...required,
  message: "Вы не ввели значение"
});

extend("numeric", {
  ...numeric,
  message: "Должны быть цифры"
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
