<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="dialogHeader"
    :style="{ width: '30rem' }"
    :closable="true"
    @hide="cancel"
  >
    <div>
      <p class="file-name-hint-text">
        {{ hintText }}
      </p>
      <InputText
        v-model="name"
        class="file-name-input-text"
        :placeholder="`Enter ${fileTypeLabel} name`"
      />
      <div class="buttons">
        <Button label="Cancel" severity="secondary" @click="cancel" />
        <Button label="Save" :disabled="!name.trim()" @click="confirm" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

const props = defineProps({
  modelValue: Boolean,
  defaultName: {
    type: String,
    default: "path-fighter-encounter",
  },
  type: {
    type: String,
    default: "pdf", // "pdf" or "json"
    validator: (value: string) => ["pdf", "json"].includes(value),
  },
  hintText: {
    type: String,
    default: `Enter a name for your file`,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const visible = ref(props.modelValue);
const name = ref(props.defaultName);

// Computed fields for dynamic text
const dialogHeader = computed(
  () => `Save Encounter as ${props.type.toUpperCase()}`,
);
const fileTypeLabel = computed(() => props.type.toUpperCase());
const hintText = computed(() => props.hintText);

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val) {
      name.value = props.defaultName;
    }
  },
);

function cancel() {
  emit("update:modelValue", false);
}

function confirm() {
  let fileName = name.value.trim();
  if (!fileName) {
    fileName = props.defaultName;
  }
  emit("confirm", fileName);
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.file-name-hint-text {
  margin-bottom: 12px;
}

.file-name-input-text {
  display: flex;
  width: 100%;
  margin-bottom: 24px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
