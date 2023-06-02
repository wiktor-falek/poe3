<script setup>
import { ref } from "vue";

const props = defineProps(["inputValue"]);
const emit = defineEmits(["change"]);

const checked = ref();

console.log(props.inputValue);
function handleChange() {
  // emit("change");
  console.log(`change ${props.inputValue}`);
}
</script>

<template>
  <div class="checkbox-button" :class="{ unchecked: !checked }">
    <input
      id="input"
      type="checkbox"
      :value="props.value"
      hidden
      @change="handleChange"
      v-model="checked"
    />
    <label for="input">{{ props.inputValue }}</label>
  </div>
</template>

<style scoped>
label {
  background-color: rgb(60, 60, 60);
  border: 1px solid rgb(188, 188, 188);
  padding: 2px 0;
  display: block;
  text-align: center;
}

label::first-letter {
  text-transform: uppercase;
}

.unchecked {
  opacity: 0.5;
}
</style>
