export default function assert(value: unknown): asserts value {
  if (value === undefined) {
    throw new Error("Value must be defined");
  }
}
