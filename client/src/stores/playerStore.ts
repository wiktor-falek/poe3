import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const characterData: Ref<any> = ref({});

  function loadCharacterData(_characterData: Object) {
    characterData.value = _characterData;
  }

  function _objectIsEmpty() {
    return !!Object.keys(characterData.value);
  }

  function setSilver(amount: number) {
    if (!_objectIsEmpty()) {
      console.log("Character data does not exist");
      return;
    }
    characterData.value.silver = amount;
  }

  return {
    characterData,
    loadCharacterData,
    setSilver,
  };
});
