# Overview

## My long term passion project - a multiplayer browser game

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

Here are some npm modules that I wrote:

- [pyrand](https://github.com/wiktor-falek/pyrand) - Python random module ported to JavaScript
- [resultat](https://github.com/wiktor-falek/resultat) - Tiny module for easy and type safe error handling

<br>

### What is the genre of the game?

Multiplayer browser game that combines ARPG item and loot system similar to Diablo II and Path of Exile,
randomised environment generation of roguelikes, with turn based strategy genre.

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

#### Handles authentication and authorization, CRUD operations for player characters.

<br>

### **`socket-server`**

#### Authoritative game server which handles all of the logic.

<br>

### **`client`**

#### Serves HTML and renders data emitted by socket-server, and provides an interface for player actions.

<br>

### **`items`**

#### Module for generating items randomly and storing data of item modifiers.

<br>
<br>

## Getting started with development

Create MongoDb indexes

```
db.users.createIndex(
  { "characters.name": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "characters.name": { $type: "string" }
    }
  }
)
```

TODO: Finish setting up docker
