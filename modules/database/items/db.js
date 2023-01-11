const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./gear.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

let sql;

// Create items table
// sql = "CREATE TABLE weapons(id INTEGER PRIMARY KEY,name STRING,type STRING,level_req INTEGER,dmg_range_1 INTEGER,dmg_range_2 INTEGER,crit_chance INTEGER);"
// db.run(sql);

// Insert item
// sql = "INSERT INTO weapons(name,type, level_req, dmg_range_1, dmg_range_2, crit_chance) VALUES (?,?,?,?,?,?);"
// db.run(sql, ["Broken Sword", "sword", 1, 3, 4, 5], (err) => {
//     if (err) return console.error(err.message);
// });

db.close();
