import { Errno } from './errno';

export const translateToErrno = (e: Error, code: string = 'UNKNOWN_ERROR', context?: unknown[], status?: number) => {
  const eno = new Errno(code, e.message, context, status);

  eno.name = e.name;
  eno.stack = e.stack;

  return eno;
};
