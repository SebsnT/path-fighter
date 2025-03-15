<template>
  <a :href="baseUrl + props.url" target="_blank">
    {{ props.name }}
  </a>
</template>

<script lang="ts" setup>
import { baseUrl } from "~/constants/url.constants";

const props = defineProps<{
  url: string;
  name: string;
}>();
</script>

<style></style>
