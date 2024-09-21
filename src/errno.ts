export const isErrnoSymbol = Symbol('isErrno');

export interface ErrnoI<S extends number = number> {
  code: string;
  message: string;
  context: unknown[];
  status: S;
}

export class Errno<S extends number = number> extends Error implements ErrnoI<S> {
  readonly [isErrnoSymbol] = true;

  public code: string;

  public context: unknown[];

  public status: S;

  constructor(code: string, message: string, status: S, context: unknown[] = []) {
    super(message);

    this.code = code;
    this.context = context;
    this.status = status;
  }

  toJSON(): ErrnoI<S> {
    return {
      code: this.code,
      message: this.message,
      context: this.context,
      status: this.status,
    };
  }
}
