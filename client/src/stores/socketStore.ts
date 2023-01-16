import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { computed, ref, watch } from "vue";
import getSession from "../utils/getSession";

/*
  ---USAGE EXAMPLE---
  import { useSocketStore } from "@/stores/socketStore";
  const socketStore = useSocketStore();
  const socket = socketStore.socket;
*/
export const useSocketStore = defineStore("socket", () => {
  const socket = ref(
    io("http://localhost:4000", {
      auth: getSession(),
    })
  );
  const isConnected = ref(false);
  const ping = ref(0);

  socket.value.on("connect", () => {
    isConnected.value = true;
  });

  socket.value.on("disconnect", () => {
    isConnected.value = false;
  });

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
  };
});

export default useSocketStore;
