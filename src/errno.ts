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

  public source?: unknown;

  constructor(code: string, message: string, status: S, context: unknown[] = [], source?: unknown) {
    super(message);

    this.code = code;
    this.context = context;
    this.status = status;
    this.source = source;

    if (source instanceof Error) {
      this.name = source.name;
      this.stack = source.stack;
    }
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
