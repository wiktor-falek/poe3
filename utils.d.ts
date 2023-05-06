interface ResultOk<T> {
  ok: true;
  value?: T;
}

interface ResultError {
  ok: false;
  error: string;
}

type Result<T = void> = ResultOk<T> | ResultError;

export {
  Result
}