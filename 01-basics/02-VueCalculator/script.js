import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      firstOperand: 0,
      operator: 'sum',
      secondOperand: 0,
    };
  },

  computed: {
    result() {
      let result = 0;
      switch (this.operator) {
        case 'sum':
          result = this.firstOperand + this.secondOperand;
          break;
        case 'subtract':
          result = this.firstOperand - this.secondOperand;
          break;
        case 'multiply':
          result = this.firstOperand * this.secondOperand;
          break;
        default:
          result = this.firstOperand / this.secondOperand;
      }
      return result;
    },
  },
}).mount('#app');
