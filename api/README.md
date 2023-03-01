# Auth

## POST `/auth/login`
Authenticates an user if credentials match, creates a sessionId
and sends a cookie with sessionId and username

### Body

```
username: string
password: string
```

<br>

## POST `/auth/register`
Creates an user if username is available
and another user hasn't verified the email already

### Body

```
username: string
password: string
email: string
```

<br>

## GET `/auth/verify/:token`
This url is sent in an email confirmation message,
sets account.confirmedEmail to account.email

<br>
<br>

# API v1

## GET `/api/v1/characters`
Returns array of basic data of each character, which includes fields:
```
id
name
class
level
```

<br>

## GET `/api/v1/characters/:id`
Returns full data of a character matching the id

<br>

## POST `/api/v1/characters`
Creates a new character, if account.characterLimit (defaults to 12) has not been exceeded

### Body

```
name: string
class: "swordsman" | "ranger" | "sorcerer" | "assassin"
```

<br>

## DELETE `/characters/:id`
Deletes a character matching the id


<br>
