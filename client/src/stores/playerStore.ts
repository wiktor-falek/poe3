import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const characterData: Ref<any> = ref(null);

  function loadCharacterData(_characterData: object) {
    if (characterData.value == null) {
      characterData.value = _characterData;
    } else {
      Object.assign(characterData.value, _characterData);
    }
    console.log(characterData.value);
  }

  function setSilver(amount: number) {
    characterData.value.silver = amount;
  }

  return {
    characterData,
    loadCharacterData,
    setSilver,
  };
});
