import { Errno } from './errno';
import { isErrno } from './is-errno';

export const translateToErrno = <S extends number>(
  e: unknown,
  code: string,
  status: S,
  context: unknown[],
  message?: string,
): Errno<S> => {
  if (isErrno<S>(e)) {
    return e;
  }

  if (e instanceof Error) {
    const eno = new Errno<S>(code, e.message || message || 'Error', status, context);

    eno.name = e.name;
    eno.stack = e.stack;

    return eno;
  }

  return new Errno<S>(code, message || 'Error', status, context);
};
