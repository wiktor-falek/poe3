import app from "./app.js";
import User from "./db/models/user.js";

const result = await User.register("testtest", "testtest", "testtest@test.com");
// const result = await User.login("testtest", "testtest");
// const result = await User.verify("testtest");
console.log(result);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
