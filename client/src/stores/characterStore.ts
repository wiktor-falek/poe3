import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import type { DynamicCharacter, StaticCharacter } from "../../../common/types";
import { getDynamicCharacter } from "../core/getDynamicCharacter";

const useCharacterStore = defineStore("character", () => {
  const staticCharacter: Ref<StaticCharacter | null> = ref(null);
  const dynamicCharacter: Ref<DynamicCharacter | null> = ref(null);

  function setStaticCharacter(character: StaticCharacter) {
    staticCharacter.value = character;
  }

  watch(staticCharacter, () => {
    if (staticCharacter.value !== null) {
      dynamicCharacter.value = getDynamicCharacter(staticCharacter.value);
    }
  });

  return {
    staticCharacter,
    dynamicCharacter,
    setStaticCharacter
  };
});

export default useCharacterStore