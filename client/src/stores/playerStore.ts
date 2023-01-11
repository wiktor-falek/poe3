import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const characterData = ref();

  function loadCharacterData(_characterData) {
    characterData.value = _characterData;
  }

  return {
    characterData,
    loadCharacterData,
  };
});
