import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import type { CombatRoom } from "../logic/Rooms";
import logger from "../logger";
import capitalize from "../utils/capitalize";

function getCurrentCombatRoom(
  socket: Socket,
  client: Client
): CombatRoom | null {
  const room = client.instance?.currentRoom;
  if (!room) {
    socket.emit("error", "Room does not exist");
    return null;
  }
  if (!("combat" in room)) {
    socket.emit("error", "Room is not a combat room");
    return null;
  }
  return room;
}

function registerCombatHandler(io: any, socket: Socket, client: Client): void {
  const getData = () => {
    const room = getCurrentCombatRoom(socket, client);
    if (room == null) return socket.emit("error", "Room does not exist");

    if (room.combat === null) {
      return socket.emit("error", "Combat is not initialized");
    }

    return socket.emit("combat:data", {
      combat: room.combat,
    });
  };

  const nextStep = () => {
    const room = getCurrentCombatRoom(socket, client);
    if (room == null) return socket.emit("error", "Room does not exist");
    const { combat } = room;

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

    if (!combat.hasEnded) {
      combat.gen ?? combat.startTurn();
      let step = combat.next();

      while (true) {
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
          socket.emit("combat:recent-logs", combat.getRecentLogsAndClear());
          // emit recent logs and clear them
        }
        if (step.value === null) {
          // turn has ended
          combat.startTurn();
          step = combat.next();
        }
        if (combat.hasEnded) {
          break;
        }
      }
    }

    combat.addLog({ type: "combat-end", message: "Combat has ended" });
    combat.addLog({
      type: "combat-end",
      message: capitalize(`${combat.whoWon} party won`),
    });

    socket.emit("combat:recent-logs", combat.getRecentLogsAndClear());

    return socket.emit("combat:end", {
      logs: combat.logs,
      whoWon: combat.whoWon,
      reward: null, // TODO: emit reward, and have user select/discard rewards
    });
  };

  const playerAction = (action: any) => {
    const room = getCurrentCombatRoom(socket, client);
    if (room == null) return socket.emit("error", "Room does not exist");
    const { combat } = room;

    if (combat == null) {
      return socket.emit("error", "Combat is not initialized");
    }

    if (!combat.waitingForPlayerAction) {
      return socket.emit("error", "Not player turn");
    }

    // checks if client input is a valid object
    function isValidAction(action: any) {
      if (action == null) return false;
      if (!("skillId" in action)) return false;
      if (
        action.skillId === 0 &&
        action.targetId != null &&
        combat!.getEnemyById(action.targetId)
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

    switch (action.skillId) {
      case 0:
        let action = player.basicAttack(target);
        if (action.type === "error") {
          return socket.emit("error", action.message);
        }
        combat.addLog(action);
        socket.emit("combat:recent-logs", combat.getRecentLogsAndClear());
        break;

      default:
        return socket.emit("error", "Unhandled action");
    }

    // notify the client that next step is ready to be taken
    socket.emit("combat:take-next-step", { logs: combat.logs });

    // TODO: emit only changes instead of whole combat object
    socket.emit("combat:data", { combat: room.combat });
  };

  const playerEndTurn = () => {
    const room = getCurrentCombatRoom(socket, client);
    if (room == null) return socket.emit("error", "Room does not exist");
    const { combat } = room;

    if (combat == null) {
      return socket.emit("error", "Combat is not initialized");
    }

    if (!combat.waitingForPlayerAction) {
      return socket.emit("error", "Not player turn");
    }

    combat.waitingForPlayerAction = false;

    socket.emit("combat:take-next-step", { logs: combat.logs });
  };

  socket.on("combat:get-data", getData);
  socket.on("combat:next-step", nextStep);
  socket.on("combat:player-action", playerAction);
  socket.on("combat:player-end-turn", playerEndTurn);
}

export default registerCombatHandler;
