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

    return socket.emit("combat:data", { combat: room.combat });
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
    // NOTE: doesn't check if target exists, this has to be checked later
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
    if (!isValidAction(action)) return socket.emit("error", "Invalid input");

    const characterName = client.playerModel.character.name;
    const player = combat.allyParty.find(
      (ally) => ally.name === characterName
    ) as Player;
    const target = combat.getEntityById(action.targetId);
    // console.log({ player, target });
    if (!player) return socket.emit("error", "Could not find player");
    if (!target) return socket.emit("error", "Could not find target");


    switch (action.name) {
      case "basic-attack":
        const action = player.basicAttack(combat.enemyParty, target);
        console.log("BEFORE", combat.enemyParty);
        target.takeDamage(action.damage);
        console.log("AFTER", combat.enemyParty);
        break;

      default:
        socket.emit("error", "Unhandled action");
    }

    combat.logs.push({ message: "Player did nothing" });
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
