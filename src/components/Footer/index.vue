<template>
  <div style="text-align: center; font-size: 16px">
    Copyright&copy;{{ year }} {{ $t("footer.nuist") }}
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
