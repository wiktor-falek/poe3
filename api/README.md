# Auth

<br>

## POST /auth/register

Allows user to register an account, if username is not already taken, or the specified email is not already confirmed.

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   6    |   30   |
| password |   Yes    | string |   8    |  128   |
|  email   |   Yes    | string |   6    |  254   |

<br>

<h2 id="login">POST /auth/login</h2>

Allows user to authenticate, and get a sessionId cookie in response to get access to authorized content.

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
| username |   Yes    | string |   6    |   30   |
| password |   Yes    | string |   8    |  128   |

<br>

## GET /auth/verify/:token

This endpoint link is sent to the email specified on registration.
Once requested, user email is confirmed.

`:token` - JWT token that encodes username and email.

## PUT /auth/password

Updates the password of the user encoded in a token.

### Body

|  Field   | Required |  Type  | minLen | maxLen |
| :------: | :------: | :----: | :----: | :----: |
|  token   |   Yes    | string |  ???   |  ???   |
| password |   Yes    | string |   6    |   30   |

<br>

# Api

### _Endpoints require authorization_ [/auth/login](#login)

<br>

## GET /api/characters

Returns overview data of all characters of the user.

### Example response

```
[
    {
        "name": "first character",
        "class": "swordsman",
        "level": 1
    },
    {
        "name": "second character",
        "class": "assassin",
        "level": 1
    }
]
```

<br>

## GET /api/characters/:name

Returns full data of the specified character of the user.

### Example response

```
{
    "name": "first character",
    "class": "swordsman",
    "equipment": {
        "hand": {
            "name": "Broken Sword",
            "ilvl": 1,
            "rarity": "normal",
            "requirements": {
                "level": 1
            },
            "baseMods": [
                {
                    "modId": "physical_damage",
                    "description": "Physical Damage: # to #",
                    "values": [ 2, 3 ]
                },
                {
                    "modId": "critical_strike_chance",
                    "description": "Critical Strike Chance: #%",
                    "values": [ 4 ]
                }
            ],
            "implicits": [],
            "slot": "hand"
        },
        "offhand": null,
        "helmet": null,
        "chest": {
            "name": "Rusted Plate Armor",
            "ilvl": 1,
            "rarity": "normal",
            "requirements": {
                "level": 1
            },
            "baseMods": [
                {
                    "modId": "armor",
                    "description": "Armor: #",
                    "values": [ 6 ]
                }
            ],
            "implicits": [],
            "slot": "chest"
        },
        "gloves": null,
        "boots": null,
        "ring_1": null,
        "ring_2": null,
        "amulet": null,
        "belt": null
    },
    "silver": 0,
    "level": {
        "value": 1,
        "xp": 0,
        "requiredXp": 10
    },
    "inventory": [
      null, null, null, null, null,
      null, null, null, null, null,
      null, null, null, null, null,
      null, null, null, null, null,
    ],
    "progression": {
        "mainStory": {
            "highestZoneId": 0
        }
    }
}
```

<br>

## POST /api/characters

Creates a new character if the name is available.

### Body

| Field | Required |                        Type                         | minLen | maxLen |
| :---: | :------: | :-------------------------------------------------: | :----: | :----: |
| name  |   Yes    |                       string                        |   3    |   24   |
| class |   Yes    | "swordsman" \| "ranger" \| "sorcerer" \| "assassin" |   3    |   16   |

<br>

## DELETE /api/characters/:name

Moves the character of the user from `characters` collection to `deletedCharacters` collection.
