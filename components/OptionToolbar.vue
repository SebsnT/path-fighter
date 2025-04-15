<template #end>
  <div class="buttons">
    <Button
      label="Reset"
      class="button-spacer"
      :severity="'warn'"
      @click="reset()"
    ></Button>
    <FileUpload
      mode="basic"
      accept=".json"
      :max-file-size="1000000"
      label="Import"
      choose-label="Import JSON"
      auto
      custom-upload
      :choose-button-props="{ severity: 'secondary' }"
      @select="importJSON($event)"
    />
    <Button
      label="Export JSON"
      icon="pi pi-upload"
      severity="secondary"
      @click="exportJSON(encounterArray)"
    />
    <Button
      label="Export PDF"
      icon="pi pi-upload"
      severity="secondary"
      @click="exportPDF()"
    />
  </div>
</template>

<script setup lang="ts">
import { exportJSON, exportPDF } from "~/utils/export";
import { importJSON } from "~/utils/import";
import { reset } from "~/utils/reset";

const { encounterArray } = useEncounterState();
</script>

<style lang="scss">
@use "../assets/scss/toolbar";
</style>
