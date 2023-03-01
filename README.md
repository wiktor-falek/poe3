# Overview

## My long term passion project (that is yet to be named, poe3 is just a placeholder) - a multiplayer browser game

<br>

### Tech Stack

- JavaScript for the REST api
- TypeScript everywhere else
- Express
- MongoDB Native Driver + Joi for schema validation
- Vue.js, vue-router, Pinia, xstate
- Socket.io
- [Redis (socket.io adapter)]
- [Jest]
- [Puppeteer]

<br>

### Features

- Character inventory and equipment management (drag & drop API, popovers), with state synchronised between database, backend and frontend in real time.

<br>

### What is the genre of the game?

Multiplayer browser game that combines ARPG item and loot system similar to Diablo II and Path of Exile,
randomised environment generation of roguelikes, with turn based strategy genre.

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

### **api** - `Handles authentication and authorization, CRUD operations for player characters.`

<br>

### **socket-server** - `Authoritative game server which handles all of the logic.`

<br>

### **client** - `Serves HTML and renders data emitted by socket-server, and provides an interface for player actions.`

<br>

### **items** - `Module for generating items randomly and storing data of item modifiers.`

<br>
<br>

## Getting started with development

Make sure you have MongoDB installed, verify by running `mongod` command

Install dependencies of all projects by running `npm i` in root directory

TODO: Setup a script to start all processes
