import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import Player from "../logic/combat/Player";

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

    return socket.emit("combat:data", {
      combat: room.combat,
    });
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

  const playerAction = (action: any) => {
    const room = client.instance?.currentRoom;
    if (!room) return socket.emit("error", "Room does not exist");
    if (!("combat" in room)) {
      return socket.emit("error", "Room is not a combat room");
    }
    const combat = room.combat;
    if (combat == null) {
      return socket.emit("error", "Combat is not initialized");
    }
    if (!combat.waitingForPlayerAction) {
      return socket.emit("error", "Not player turn");
    }

    // checks if client input is a valid object
    function isValidAction(action: any) {
      if (action == null) return false;
      if (!("name" in action)) return false;
      if (
        action.name === "basic-attack" &&
        action.targetId != null &&
        combat!.getEntityById(action.targetId)
      ) {
        return true;
      }
      return false;
    }
    if (!isValidAction(action)) return socket.emit("error", "Invalid action");

    const player = combat.getPlayerByUsername(client.username);
    if (!player) return socket.emit("error", "Could not find player");

    const target = combat.getEntityById(action.targetId);
    if (!target) return socket.emit("error", "Could not find target");

    switch (action.name) {
      case "basic-attack":
        let action = player.basicAttack(target);
        if (action.type === "error") {
          return socket.emit("error", action.message);
        }
        socket.emit("chat:message", { content: action.message, sender: "COMBAT" });
        break;

      default:
        return socket.emit("error", "Unhandled action");
    }
    // action was successful
    combat.waitingForPlayerAction = false;

    // notify the client that next step is ready to be taken
    socket.emit("combat:take-next-step", { logs: combat.logs });

    // TODO: emit only changes instead of whole combat object
    socket.emit("combat:data", { combat: room.combat });
  };

  socket.on("combat:get-data", getData);
  socket.on("combat:next-step", nextStep);
  socket.on("combat:player-action", playerAction);
}

export default registerCombatHandler;
