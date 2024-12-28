<template>
  <div>
    <Toolbar>
      <template #end>
        <FileUpload
          class="file-upload"
          mode="basic"
          accept=".json"
          :max-file-size="1000000"
          label="Import"
          custom-upload
          choose-label="Import"
          auto
          :choose-button-props="{ severity: 'secondary' }"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          severity="secondary"
          @click="exportPDF()"
        />
      </template>
    </Toolbar>
  </div>
</template>

<script setup lang="ts">
import { exportPDF } from "~/composables/pdfExport";
</script>

<style lang="scss">
@use "~/assets/scss/toolbar.scss";
</style>
