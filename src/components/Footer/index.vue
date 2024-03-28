<template>
  <div style="text-align: center; font-size: 16px" class="footer">
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

<style scoped>
.footer {
  background-color: #bccbd9;
}
</style>
