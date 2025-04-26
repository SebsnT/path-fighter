<template>
  <div>
    <Button
      label="Legal Information"
      class="legal-button"
      :severity="'info'"
      @click="isOpen = true"
    />

    <Dialog v-model:visible="isOpen" header="License" modal>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="licenses-text" v-html="renderedLicenses"></div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import MarkdownIt from "markdown-it";

// Import the raw markdown file
import licenses from "../LICENSE.md?raw";

const isOpen = ref(false);

// Initialize markdown-it
const md = new MarkdownIt({
  // Automatically detect links
  linkify: true,
  // Use typographic replacements (quotes, ellipsis)
  typographer: true,
});

// Convert the raw markdown file to HTML
const renderedLicenses = md.render(licenses);
</script>

<style scoped lang="scss">
.p-dialog-mask {
  backdrop-filter: blur(2px);
}

/* Additional styling to make the dialog more readable */
.licenses-text {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 0.875rem;
  line-height: 1.5;
  word-break: break-word;
  white-space: normal;
  margin-top: 0.5rem;
}

/* Styling for links */
.licenses-text a {
  color: #0066cc;
  text-decoration: none;
}

.licenses-text a:hover {
  text-decoration: underline;
}

.legal-button {
  color: black;
}
</style>
