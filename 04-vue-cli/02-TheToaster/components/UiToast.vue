<template>
  <div class="toast" :class="`toast_${type}`" @click="hideToast">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  emits: ['removeToastAfterTimeout'],

  data() {
    return {
      showToast: true,
    };
  },

  computed: {
    icon() {
      switch (this.type) {
        case 'success':
          return 'check-circle';
        default:
          return 'alert-circle';
      }
    },
  },

  methods: {
    hideToast() {
      const timeoutToHideNow = 0;
      const toastToHideNow = {
        message: this.message,
        timeoutMs: timeoutToHideNow,
      };
      this.$emit('removeToastAfterTimeout', toastToHideNow);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
