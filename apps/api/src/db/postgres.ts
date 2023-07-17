import { createPool } from "slonik";
import { createFieldNameTransformationInterceptor } from "slonik-interceptor-field-name-transformation";
// import { type Interceptor, type QueryResultRow, SchemaValidationError } from "slonik";

// const createResultParserInterceptor = (): Interceptor => {
//   return {
//     // If you are not going to transform results using Zod, then you should use `afterQueryExecution` instead.
//     // Future versions of Zod will provide a more efficient parser when parsing without transformations.
//     // You can even combine the two – use `afterQueryExecution` to validate results, and (conditionally)
//     // transform results as needed in `transformRow`.
//     transformRow: (executionContext, actualQuery, row) => {
//       const { log, resultParser } = executionContext;

//       if (!resultParser) {
//         return row;
//       }

//       const validationResult = resultParser.safeParse(row);

//       if (!validationResult.success) {
//         throw new SchemaValidationError(actualQuery, row, validationResult.error.issues);
//       }

//       return validationResult.data as QueryResultRow;
//     },
//   };
// };

const interceptors = [
  // createResultParserInterceptor(),
  createFieldNameTransformationInterceptor({
    format: "CAMEL_CASE",
  }),
];

export const pool = await createPool(
  "postgresql://postgres:@localhost:5432/poe3",
  {
    interceptors,
  }
);

export const testingPool = await createPool(
  "postgresql://postgres:@localhost:5432/poe3-testing",
  {
    interceptors,
  }
);
