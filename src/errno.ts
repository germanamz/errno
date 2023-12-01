export const isErrnoSymbol = Symbol('isErrno');

export interface ErrnoI {
  code?: string;
  message?: string;
  context?: unknown[];
  status?: number;
}

export class Errno extends Error implements ErrnoI {
  readonly [isErrnoSymbol] = true;

  public code?: string;

  public context?: unknown[];

  public status?: number;

  constructor(code?: string, message?: string, context?: unknown[], status?: number) {
    super(message);

    this.code = code;
    this.context = context || [];
    this.status = status;
  }

  toJSON(): ErrnoI {
    return {
      code: this.code,
      message: this.message,
      context: this.context,
      status: this.status,
    };
  }
}
