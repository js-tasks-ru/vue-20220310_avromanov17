<template>
  <div class="toast" @click="hideToast">
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
    icon: {
      type: String,
      required: true,
    },
    removeToastTimeoutMs: {
      type: Number,
      default: 5000,
    },
  },

  emits: ['removeToastAfterTimeout'],

  data() {
    return {
      showToast: true,
    };
  },

  mounted() {
    this.$emit('removeToastAfterTimeout', this.message, this.removeToastTimeoutMs);
  },

  methods: {
    hideToast() {
      const timeoutToHideNow = 0;
      this.$emit('removeToastAfterTimeout', this.message, timeoutToHideNow);
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
