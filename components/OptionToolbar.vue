<template>
  <div class="buttons">
    <Button
      label="Reset"
      class="button-spacer reset button"
      :severity="'warn'"
      @click="reset()"
    />

    <FileUpload
      mode="basic"
      accept=".json"
      :max-file-size="1000000"
      label="Import"
      choose-label="Import JSON"
      auto
      custom-upload
      :choose-button-props="{ severity: 'contrast' }"
      @select="importJSON($event)"
    />

    <Button
      label="Export JSON"
      icon="pi pi-upload"
      :severity="'contrast'"
      @click="openJsonDialog"
    />
    <ExportFileDialog
      v-model="showJsonDialog"
      :default-name="defaultPdfName"
      type="json"
      hint-text="Enter a name for your encounter"
      @confirm="handleJsonExport"
    />

    <Button
      label="Export PDF"
      icon="pi pi-file-pdf"
      class="pdf-export-button"
      @click="openPdfDialog"
    />
    <ExportFileDialog
      v-model="showPdfDialog"
      :default-name="defaultPdfName"
      type="pdf"
      hint-text="Enter a name for your PDF"
      @confirm="handlePdfExport"
    />

    <LegalInformation />

    <Button
      label="Donate"
      class="donation-button"
      @click="openDonationDialog"
    />
    <DonationDialog v-model="showDonationDialog"></DonationDialog>
  </div>
</template>

<script setup lang="ts">
import { exportJSON, exportPDF } from "~/utils/export.utils";
import { importJSON } from "~/utils/import";
import { reset } from "~/utils/reset";
import ExportFileDialog from "./dialogs/ExportFileDialog.vue";

const { encounterArray } = useEncounterState();

const showPdfDialog = ref(false);
const showJsonDialog = ref(false);
const showDonationDialog = ref(false);

const defaultPdfName = "path-fighter-encounter";

function openPdfDialog() {
  showPdfDialog.value = true;
}

function openJsonDialog() {
  showJsonDialog.value = true;
}

function openDonationDialog() {
  showDonationDialog.value = true;
}

async function handlePdfExport(fileName: string) {
  showPdfDialog.value = false;
  await exportPDF(encounterArray.value, fileName);
}

async function handleJsonExport(fileName: string) {
  showPdfDialog.value = false;
  exportJSON(encounterArray.value, fileName);
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex: 1;
  justify-content: end;
  align-items: center;
  gap: 12px;
  margin-right: 12px;
}

.p-button-warn {
  color: black !important;
}

.pdf-export-button {
  background-color: #fd4949 !important;
  border-color: #fd4949 !important;
  color: white !important;
}

.donation-button {
  background-color: #ebff14 !important;
  border-color: #ebff14 !important;
  color: black !important;
}
</style>
