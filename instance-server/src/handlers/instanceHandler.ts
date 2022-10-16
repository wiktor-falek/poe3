import { Server, Socket } from "socket.io";
import logger from "../logger";
import Player from "../logic/entities/Player";
import Instance from "../logic/instances/Instance";
import InstanceFactory from "../logic/instances/InstanceFactory";

module.exports = (io: Server, socket: Socket) => {
  const joinInstance = (instanceId: number) => {
    const { userId, characterData } = socket.data;
    
    // create instance (even if it overwrites existing one for now)
    const instance: Instance = InstanceFactory.createInstance(userId, instanceId);

    const player = new Player(characterData);

    instance.playerJoin(player);
    logger.info("player joined an instance")

  };

  socket.on("instance:join", joinInstance);
};
