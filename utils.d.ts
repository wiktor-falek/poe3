interface ResultOk {
  ok: true;
}

interface ResultError {
  ok: false;
  error: string;
}

type Result = ResultOk | ResultError;

export { Result };
