# Overview

## Multiplayer browser game that combines ARPG item and loot system similar to Diablo II and Path of Exile, randomised environment generation of roguelikes, with turn based strategy genre.

<br>

### Tech Stack

- TypeScript
- MongoDB Native Driver
- Express
- Socket.io
- Vue.js, Pinia, xstate
- Joi for MongoDB schema validation & socket event argument validation
- [Redis (socket.io adapter)]
- Vitest

My own npm modules:

- [pyrand](https://github.com/wiktor-falek/pyrand) - Python random module ported to JavaScript
- [resultat](https://github.com/wiktor-falek/resultat) - Tiny module for easy and type safe error handling

<br>

### Features

- Character inventory and equipment management (drag & drop API, popovers), with state synchronised between database, socket server and frontend in real time.

- Global chat with client side and server side commands. Messages have different groups such as: System, Global, Whisper, Party, Guild whose visibility can be toggled on/off. Supports 1000 separate global rooms. Use `/global n` command to join a room number `n`.

- Persisting character changes such as silver, experience points, and moving items between inventory.

- Party system supporting up to four players.

- Basic turn based combat prototype. Enemy and Ally party hold up to 8 entities each. Player is able to target an enemy and use Basic Attack to deal random amount of damage based on strength attribute. As of now doesn't support multiple clients in one dungeon instance.

<br>

### Roadmap

TODO

<br>

# Documentation

## Projects

### **`api`**

#### Handles auth and CRUD operations for player characters.

<br>

### **`game-server`**

#### Authoritative game server which handles all of the game logic.

<br>

### **`client`**

#### Renders data emitted by game-server, and provides an interface for player actions.

<br>

### **`items`**

#### Module that generates items randomly.

<br>
<br>

## Getting started with development

```bash
# Installation
git clone https://github.com/wiktor-falek/poe3 && cd poe3
```
