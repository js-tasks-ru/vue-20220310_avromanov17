<template>
  <component :is="tag" v-bind="$attrs">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiLink',

  inheritAttrs: false,

  props: {
    tag: {
      type: [String, Object],
      default: 'router-link',
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
