<template>
  <template v-if="hasMutipleMarkdownEntries(props.data)">
    <span
      v-for="(link, index) in TableUtils.parseMultipleMarkdownStrings(
        props.data,
      )"
      :key="index"
    >
      <a :href="baseUrl + link.link" target="_blank">{{ link.label }}</a>
      <span
        v-if="
          index < TableUtils.parseMultipleMarkdownStrings(props.data).length - 1
        "
        >,
      </span>
    </span>
  </template>
  <template v-else-if="hasOneMarkdownEntry(props.data)">
    <a
      :href="baseUrl + TableUtils.parseOneMarkdownLink(props.data).link"
      target="_blank"
      >{{ TableUtils.parseOneMarkdownLink(props.data).label }}</a
    >
  </template>
  <template v-else><div>-</div></template>
</template>

<script setup lang="ts">
import { baseUrl } from "~/constants/url.constants";

const props = defineProps({
  data: {
    type: String,
    required: true,
  },
});
</script>
