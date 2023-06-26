# Overview

## Multiplayer browser game that combines ARPG item and loot system similar to Diablo II and Path of Exile, randomised environment generation of roguelikes, with turn based strategy genre.

<br>

### Tech Stack

- TypeScript
- Vue.js, Vue Router
- Express
- Socket.io
- MongoDB Native Driver
- Joi for MongoDB schema validation & socket argument type validation
- Vitest for unit tests

My own npm modules:

- [pyrand](https://github.com/wiktor-falek/pyrand) - Python random module ported to JavaScript
- [resultat](https://github.com/wiktor-falek/resultat) - Tiny module for easy and type safe error handling

<br>

### Features

- Global chat with client side and server side commands. Messages have different groups such as: System, Global, Whisper, Party, Guild whose visibility can be toggled on/off. Use `/global n` command to join a room number `n` (1-1000).

- Lobby system with ownership.
  The lobby owner can kick other members or create an instance where players fight monsters.

- Turn based combat prototype. Turn order is generated once per combat,
  players get to use 3 action points per turn, while enemies can only basic attack a random target.
  Players can use keyboard to select target or ability first, and then click the other one to attack an enemy.

<br>

### Roadmap

Loot generation

- [x] Generating loot from pool of materials and gear
- [ ] Awarding loot after winning combat

Combat win rewards

- [ ] Awarding random amount of silver to the players

Inventory management (drag & drop API, popovers):

- [ ] Moving item to a different spot
- [ ] Deleting an item

Equipment management

- [ ] Equipping an item (swap with already equipped item)
- [ ] Unequipping an item

<br>

# Documentation

## Projects

### **`api`**

#### Handles auth, account management and CRUD operations for player characters.

<br>

### **`game-server`**

#### Authoritative game server which handles all of the game logic.

<br>

### **`client`**

#### Renders data emitted by game-server, and provides an interface for player actions.

<br>

### **`items`**

#### Module for creating items, and generating them randomly.

<br>

<br>

## Getting started with development

```bash
# Installation
git clone https://github.com/wiktor-falek/poe3 && cd poe3
```
