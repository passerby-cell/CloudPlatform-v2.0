<template>
  <div style="text-align: center; font-size: 16px">
    Copyright&copy;{{ year }} 南京信息工程大学
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
  methods: {},
};
</script>

<style scoped></style>
