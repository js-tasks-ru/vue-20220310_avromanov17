<template>
  <ui-input :type="type" :modelValue="formattedDateTime" v-bind="$attrs" @change="onChange">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import moment from 'moment';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    formattedDateTime() {
      const utcDate = moment(this.modelValue).utc();
      switch (this.type) {
        case 'time':
          return utcDate.format('HH:mm');
        case 'datetime-local':
          return utcDate.format('YYYY-MM-DDTHH:mm');
        default:
          return utcDate.format('YYYY-MM-DD');
      }
    },
  },

  methods: {
    onChange($event) {
      this.$emit('update:modelValue', $event.target.valueAsNumber);
    },
  },
};
</script>
