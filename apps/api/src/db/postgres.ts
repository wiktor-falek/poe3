import { createPool } from "slonik";
import { createFieldNameTransformationInterceptor } from "slonik-interceptor-field-name-transformation";

const interceptors = [
  createFieldNameTransformationInterceptor({
    format: "CAMEL_CASE",
  }),
];

const pool = await createPool("postgresql://postgres:@localhost:5432/poe3", {
  interceptors,
});

export const testingPool = await createPool("postgresql://postgres:@localhost:5432/poe3-testing", {
  interceptors,
});

export default pool;
