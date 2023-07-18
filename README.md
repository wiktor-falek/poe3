# Overview

### Multiplayer browser game that combines ARPG item and loot system similar to Diablo II and Path of Exile, randomised environment generation of roguelikes, with turn based strategy genre.

### **Notice: This game is still in very early stages of development.**

<br>

### Tech Stack

- TypeScript
- Express
- Socket.io
- Postgresql
- Vue.js
- Joi and Zod for validation
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

### Alpha Version Roadmap

Loot generation

- [x] Generating loot from pool of materials and gear

Combat win rewards

- [ ] Awarding generated loot after winning combat
- [ ] Awarding random amount of silver to the players

Inventory management (drag & drop API, popovers):

- [ ] Moving item to a different spot
- [ ] Deleting an item

Equipment management

- [ ] Equipping an item (swap with already equipped item)
- [ ] Unequipping an item

Combat

- [ ] Clean way to apply updates from the server and play animations
- [ ] One starting skill for each class
- [ ] Different types of targeting
- [ ] Awarding xp for each character that is alive at the end of combat

Equipment

- [ ] Parsing values of modifiers and applying them to the character

<br>

# Documentation

## Projects

### **`api`**

#### Auth, account management and creating/deleting player characters.

<br>

### **`game-server`**

#### Authoritative game server which handles all of the game logic.

<br>

### **`client`**

#### Renders data emitted by game-server, and provides an interface for player actions.

<br>

### **`items`**

#### Module for creating items, and generating them randomly.

### **`common`**

#### Type declarations and functions reused in multiple projects

<br>

<br>

## Getting started with development

### Installation

```bash
git clone https://github.com/wiktor-falek/poe3 && cd poe3
```

<hr>

### Install dependencies in all npm workspaces

```bash
npm install
```

<hr>

### Postgres

### Installing with a package manager

```bash
yay -S postgresql
```

### Change to _postgres_ user

```bash
sudo -iu postgres
```

### Initialize database

```
initdb -D /var/lib/postgres/data
```

### Interactive terminal (as postgres user)

```
psql
```

<hr>

### Running main projects in dev mode

```bash
npm run api
npm run client
npm run game-server
```

<hr>

### Optionally if making any changes to apps/common or apps/items

```bash
npm run common
npm run items
```

## Production checklist

### Provide environment variables

#### Add email provider credentials and JWT Secret in `api`

```bash
cp apps/api/.env.example .env

# ./apps/api/.env
EMAIL_USER=emailprovideruser
EMAIL_PASS=emailproviderpass

# https://generate-random.org/encryption-key-generator?count=1&bytes=256&cipher=aes-256-cbc&string=&password=
JWT_SECRET=w0kZ4yCL6VtxNISQeDpa28kL84+ik6ofWSdMObgU0WC3eglpePf/chlM46eyRBZeXQAjGH2/47cLqw61lfkXyXd+W5dC9UOX1j+K8jR18BkJ/bQYRCEOOfIjUWPwCRqPeOKZ0DSekKFuxsA5IRPJF02uvrlA8EVbtnA3wWVpTwCDivipRmu5gloGwIzB4gqJU2Q/TqPJcsGXdwxcFfv4YWsraG2tn/VYA74VrBFtfAIihHOYsCjHsmoZofRKgxvkMq0Tl0iw6oJm0mJYOKqFJvocnfhCTlK6UyLg9x4wS6OZVsbTn49av4UkzEZ7uYTRY2+V2JSfg89IGDVxUrL93+hTX5k6VNy7Zc1ss2koRng=
```
