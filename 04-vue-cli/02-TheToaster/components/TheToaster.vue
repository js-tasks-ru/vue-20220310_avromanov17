<template>
  <div class="toasts">
    <toast
      v-for="toast in toasts"
      :key="toast.message"
      :class="`toast_${toast.type}`"
      :message="toast.message"
      :icon="toast.icon"
      :removeToastTimeoutMs="toast.removeToastTimeoutMs"
      @removeToastAfterTimeout="removeToastAfterTimeout"
    />
  </div>
</template>

<script>
import Toast from './Toast.vue';

export default {
  name: 'TheToaster',

  components: { Toast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(message) {
      this.toasts.push({
        message,
        type: 'success',
        icon: 'check-circle',
        removeToastTimeoutMs: 5000,
      });
    },
    error(message) {
      this.toasts.push({
        message,
        type: 'error',
        icon: 'alert-circle',
      });
    },
    removeToastAfterTimeout(toastMessage, timeout) {
      setTimeout(() => {
        if (this.toasts.length) {
          this.toasts = this.toasts.filter((toast) => toast.message !== toastMessage);
        }
      }, timeout);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
