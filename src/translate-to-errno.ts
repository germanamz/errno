import { Errno } from './errno';

export const translateToErrno = (e: unknown, code: string = 'UNKNOWN_ERROR', context?: unknown[], status?: number) => {
  if (e instanceof Errno) {
    return e;
  }

  if (e instanceof Error) {
    const eno = new Errno(code, e.message, context, status);

    eno.name = e.name;
    eno.stack = e.stack;

    return eno;
  }

  return new Errno(code, 'Unknown error', context, status);
};
