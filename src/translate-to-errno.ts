import { Errno } from './errno';
import { isErrno } from './is-errno';

export const translateToErrno = <S extends number>(e: unknown, code: string = 'UNKNOWN_ERROR', context?: unknown[], status?: S): Errno<S> => {
  if (isErrno<S>(e)) {
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
