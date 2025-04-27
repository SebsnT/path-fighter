<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="'Donations'"
    :style="{ width: '30rem' }"
    :closable="true"
    @hide="cancel"
  >
    <div>
      <p class="hint-text">
        If you like my work, support me with a small donation on my "Buy me a
        coffee".
      </p>

      <span class="bmac-button">
        <BuyMeACoffee />
      </span>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Dialog from "primevue/dialog";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  },
);

function cancel() {
  emit("update:modelValue", false);
}
</script>

<style lang="scss" scoped>
.hint-text {
  margin-bottom: 12px;
}

.bmac-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.buttons {
  margin-top: 20px;
}
</style>
