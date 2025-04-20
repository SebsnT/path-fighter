<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Save PDF"
    :style="{ width: '30rem' }"
    :closable="true"
    @hide="cancel"
  >
    <div>
      <p class="file-name-hint-text">Enter a name for your PDF:</p>
      <InputText
        v-model="name"
        class="file-name-input-text"
        placeholder="Enter file name"
      />
      <div class="buttons">
        <Button label="Cancel" severity="secondary" @click="cancel" />
        <Button label="Save" @click="confirm" :disabled="!name.trim()" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const props = defineProps({
  modelValue: Boolean,
  defaultName: {
    type: String,
    default: "path-fighter-encounter",
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const visible = ref(props.modelValue);
const name = ref(props.defaultName);

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
    fileName = "path-fighter-encounter";
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
