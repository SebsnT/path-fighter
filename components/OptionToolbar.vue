<template>
  <div class="buttons">
    <Button
      class="reset-button"
      label="Reset"
      :severity="'warn'"
      @click="reset()"
    />

    <FileUpload
      class="import-button header-button"
      mode="basic"
      accept=".json"
      label="Import"
      choose-label="Import JSON"
      auto
      custom-upload
      :max-file-size="1000000"
      :choose-button-props="{ severity: 'contrast' }"
      @select="importJSON($event)"
    />

    <Button
      class="export-button header-button"
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
      class="pdf-export-button header-button"
      label="Export PDF"
      icon="pi pi-file-pdf"
      @click="openPdfDialog"
    />
    <ExportFileDialog
      v-model="showPdfDialog"
      type="pdf"
      hint-text="Enter a name for your PDF"
      :default-name="defaultPdfName"
      @confirm="handlePdfExport"
    />

    <LegalInformation />

    <Button
      class="donation-button"
      label="Donate"
      @click="openDonationDialog"
    />
    <Button
      class="github-button header-button"
      label="GitHub"
      icon="pi pi-github"
      @click="openGithub"
    />
    <DonationDialog v-model="showDonationDialog" />
  </div>
</template>

<script setup lang="ts">
import { importJSON, exportJSON } from "~/utils/json.utils";
import { exportPDF } from "~/utils/pdf/exportPDF";
import { reset } from "~/utils/reset";
import ExportFileDialog from "./dialogs/ExportFileDialog.vue";
import { projectUrl } from "~/constants/url.constants";

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

function openGithub() {
  window.open(projectUrl, "_blank");
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

.github-button {
  background-color: #24292e !important;
  border-color: #24292e !important;
  color: white !important;
}

@media (max-width: 1000px) {
  .header-button :deep(.p-button-label) {
    display: none;
  }

  .header-button {
    height: 37px;
  }

  .p-fileupload :deep(.header-button) {
    .p-button-label {
      display: none;
    }
    height: 37px;
  }
}

@media (max-width: 700px) {
  .p-fileupload {
    display: none;
  }

  .export-button {
    display: none;
  }
}

@media (max-width: 600px) {
  .buttons {
    justify-content: center;
    margin-bottom: 12px;
  }
}
</style>
