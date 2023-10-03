import { Errno } from './errno';

export const translateToErrno = (e: Error, code: string = 'UNHANDLED_ERROR', context?: unknown[]) => {
  const eno = new Errno(code, e.message, context);

  eno.name = e.name
  eno.stack = e.stack;

  return eno;
}
