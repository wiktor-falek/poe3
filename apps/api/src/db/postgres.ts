import { createPool, sql } from "slonik";

const pool = await createPool("postgresql://postgres:@localhost:5432/poe3");

export const testingPool = await createPool("postgresql://postgres:@localhost:5432/poe3-testing");

export default pool;
