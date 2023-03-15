# Overview

## My long term passion project (that is yet to be named, poe3 is just a placeholder) - a multiplayer browser game

<br>

### Tech Stack

- JavaScript for the REST api
- TypeScript everywhere else
- Express
- MongoDB Native Driver + Joi for schema validation
- Socket.io
- Vue.js, vue-router, Pinia, xstate
- [Redis (socket.io adapter)]
- [Jest]
- [Puppeteer]

<br>

### Features

- Character inventory and equipment management (drag & drop API, popovers), with state synchronised between database, socket server and frontend in real time.

- Global chat with client side and server side commands. Messages have different groups such as: System, Global, Whisper, Party, Guild whose visibility can be toggled on/off. Supports 1000 separate global rooms, use `/global n` command to join a room `n`.

- Granting persistent rewards to a character such as silver and xp.

- Party system supporting up to four players.

- Basic turn based combat prototype. Enemy and Ally party hold up to 8 entities each. Player is able to target an enemy and use Basic Attack to deal random amount of damage based on strength attribute. As of now doesn't support multiple clients in one dungeon instance.

<br>

### What is the genre of the game?

Multiplayer browser game that combines ARPG item and loot system similar to Diablo II and Path of Exile,
randomised environment generation of roguelikes, with turn based strategy genre.

<br>

### What are the selling points of the game?

- Replayability
- In depth character itemisation and progresion
- Strategy
- Theorycrafting
- Community
- New content added regularly

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

Make sure you have MongoDB installed, verify by running `mongod` command

create indexes

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

Install dependencies of all projects by running `npm i` in root directory

TODO: Setup a script to start all processes
