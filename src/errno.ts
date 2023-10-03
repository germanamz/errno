export const isErrnoSymbol = Symbol('isErrno');

export interface ErrnoI {
  code: string;
  message: string;
  context: unknown[];
}

export class Errno extends Error implements ErrnoI {
  readonly [isErrnoSymbol] = true;

  public code: string;

  public context: unknown[];

  constructor(code: string, message: string, context?: unknown[]) {
    super(message);

    this.code = code;
    this.context = context || [];
  }

  toJSON(): ErrnoI {
    return {
      code: this.code,
      message: this.message,
      context: this.context,
    };
  }
}
