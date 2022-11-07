<template>
  <div class="pagination-container">
    <template v-for="item in itemsPerPage" :key="item.id">
      <slot :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    itemsPerPage() {
      const startItemIdx = (this.page - 1) * this.perPage;
      const endItemIdx = startItemIdx + this.perPage;
      return this.items.slice(startItemIdx, endItemIdx);
    },
  },
};
</script>

<style></style>
