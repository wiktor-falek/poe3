export type CharacterClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

export interface Character {
  id: number;
  userId: number;
  name: string;
  class: CharacterClass;
  silver: number;
  level: number;
  xp: number;
  reqXp: number;
}

export interface CharacterOverview {
  name: string;
  class: CharacterClass;
  level: number;
}

/*
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES user(id) ,
  name VARCHAR(24) NOT NULL UNIQUE,
  class VARCHAR(16)  NOT NULL,
  level SMALLINT DEFAULT 1  NOT NULL,
  xp BIGINT DEFAULT 0  NOT NULL,
  req_xp BIGINT DEFAULT 0  NOT NULL,
  silver BIGINT DEFAULT 0  NOT NULL,
*/
