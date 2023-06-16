class Combat {
  constructor() {
    // turn
    // actionQueue
  }

  playerAction() {
    // take action input - ability and target
    // update state like subtracting health of the target
    // validate and return action / error
  }

  continue() {
    // keep executing actions for each enemy in the turn
    // create next turn if turn.current === null
    // keep going until either combat ends or awaiting player action
  }

  private enemyAction() {
    // enemy ai choosing ability and targets
    // updating state
    // pushing action to actionQueue
  }
}
