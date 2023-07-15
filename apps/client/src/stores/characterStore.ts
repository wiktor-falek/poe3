import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import getDynamicCharacter from "common/getDynamicCharacter";
import type { Character, DynamicCharacter } from "types/character";

const useCharacterStore = defineStore("character", () => {
  const character: Ref<Character | null> = ref(null);
  const dynamicCharacter: Ref<DynamicCharacter | null> = ref(null);

  function setCharacter(characterData: Character) {
    character.value = characterData;
  }

  watch(character, () => {
    if (character.value !== null) {
      dynamicCharacter.value = getDynamicCharacter(character.value);
    }
  });

  return {
    character,
    dynamicCharacter,
    setCharacter,
  };
});

export default useCharacterStore;
