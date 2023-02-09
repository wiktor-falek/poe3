import type Client from "../helpers/Client";
import type { Socket } from "socket.io";

function registerCombatHandler(io: any, socket: Socket, client: Client): void {
  const getData = () => {
    const room = client.instance?.currentRoom;
    if (!room) return socket.emit("error", "Room does not exist");
    if (!("combat" in room)) {
      return socket.emit("error", "Room is not a combat room");
    }
    const combat = room.combat;
    if (combat === null) {
      return socket.emit("error", "Combat is not initialized");
    }

    return socket.emit("combat:data", room.combat);
  };

  const nextStep = () => {
    const room = client.instance?.currentRoom;
    if (!room) return socket.emit("error", "Room does not exist");
    if (!("combat" in room)) {
      return socket.emit("error", "Room is not a combat room");
    }
    const combat = room.combat;
    if (combat === null) {
      return socket.emit("error", "Combat is not initialized");
    }

    if (combat.waitingForPlayerAction) {
      return socket.emit("combat:player-turn", {
        logs: combat.logs,
        allyParty: combat.allyParty,
        enemyParty: combat.enemyParty,
      });
    }

    combat.gen ?? combat.startTurn();
    let step = combat.next();

    while (!combat.hasEnded) {
      if (step.value === true) {
        // player turn
        return socket.emit("combat:player-turn", {
          logs: combat.logs,
          allyParty: combat.allyParty,
          enemyParty: combat.enemyParty,
        });
      }
      if (step.value === false) {
        // enemy is taking action
        step = combat.next();
      }
      if (step.value === null) {
        // turn has ended
        combat.startTurn();
        step = combat.next();
      }
    }
    combat.logs.push({ message: "Combat has ended" });
    return socket.emit("combat:end", {
      logs: combat.logs,
      allyParty: combat.allyParty,
      enemyParty: combat.enemyParty,
    });
  };

  const playerAction = () => {
    const room = client.instance?.currentRoom;
    if (!room) return socket.emit("error", "Room does not exist");
    if (!("combat" in room)) {
      return socket.emit("error", "Room is not a combat room");
    }
    const combat = room.combat;
    if (combat === null) {
      return socket.emit("error", "Combat is not initialized");
    }
    if (!combat.waitingForPlayerAction) {
      return socket.emit("error", "Not player turn");
    }
    // combat.gen;
    combat.logs.push({ message: "Player did nothing" });
    combat.waitingForPlayerAction = false;

    // notify the client that next step is ready to be taken
    socket.emit("combat:take-next-step", { logs: combat.logs });
  };

  socket.on("combat:get-data", getData);
  socket.on("combat:next-step", nextStep);
  socket.on("combat:player-action", playerAction);
}

export default registerCombatHandler;
