<template>
  <div>
    <Toolbar>
      <template #end>
        <Button
          label="Reset"
          class="button-spacer"
          :severity="'warn'"
          @click="reset()"
        ></Button>
        <FileUpload
          class="button-spacer"
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
import { exportPDF } from "~/utils/export";
import { reset } from "../composables/utils";
</script>

<style lang="scss">
@use "~/assets/scss/toolbar.scss";
</style>
