<template>
  <div class="toasts">
    <ui-toast
      v-for="toast in toasts"
      :key="toast.message"
      :type="toast.type"
      :message="toast.message"
      @removeToastAfterTimeout="removeToastAfterTimeout"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToast },

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
      });
      const removeSuccessToastTimeoutMs = 5000;
      this.removeToastAfterTimeout({ message, timeoutMs: removeSuccessToastTimeoutMs });
    },
    error(message) {
      this.toasts.push({
        message,
        type: 'error',
      });
      this.removeToastAfterTimeout({ message });
    },
    removeToastAfterTimeout(toast) {
      const { message, timeoutMs = 5000 } = toast;
      setTimeout(() => {
        if (this.toasts.length) {
          this.toasts = this.toasts.filter((toast) => toast.message !== message);
        }
      }, timeoutMs);
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
