<template>
  <slot v-if="state === states.fulfilled" name="fulfilled" :result="result" />
  <slot v-else-if="state === states.rejected" name="rejected" :error="error" />
  <slot v-else name="pending" />
</template>

<script>
const states = Object.freeze({
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
});

export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      states,
      state: states.pending,
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      immediate: true,
      async handler(newPromise) {
        this.state = this.states.pending;
        await newPromise
          .then((result) => {
            this.handleResponse(states.fulfilled, result);
          })
          .catch((error) => {
            this.handleResponse(states.rejected, error);
          });
      },
    },
  },

  methods: {
    handleResponse(state, result) {
      const isFulfilled = state === this.states.fulfilled;
      this.result = isFulfilled ? result : null;
      this.error = isFulfilled ? null : result;
      this.state = state;
    },
  },
};
</script>
