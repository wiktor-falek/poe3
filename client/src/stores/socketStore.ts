import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref } from "vue";
import getSession from "../utils/getSession";
import getCharacterId from "../utils/getCharacterId";

/*
  ---USAGE EXAMPLE---
  import { useSocketStore } from "@/stores/socketStore";
  const socketStore = useSocketStore();
  const socket = socketStore.socket;
*/
export const useSocketStore = defineStore("socket", () => {
  const socket = ref(
    io("http://localhost:4000", {
      auth: { ...getSession(), characterId: getCharacterId() },
    })
  );
  const isConnected = ref(true);
  const ping = ref(0);
  const playerCount = ref(0);

  socket.value.on("connect", () => {
    isConnected.value = true;
  });

  socket.value.on("disconnect", () => {
    isConnected.value = false;
  });

  socket.value.on("error:connection-already-exists", () => {
    isConnected.value = false;
  })

  socket.value.on("player-count", count => {
    playerCount.value = count;
  })

  setInterval(() => {
    const start = Date.now();

    socket.value.emit("utils:ping", () => {
      const duration = Date.now() - start;
      ping.value = duration;
    });
  }, 1000);

  return {
    socket,
    isConnected,
    ping,
    playerCount,
  };
});

export default useSocketStore;
