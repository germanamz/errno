import { Errno, isErrnoSymbol } from './errno';

export const isErrno = (e: any): e is Errno => Boolean(e[isErrnoSymbol]);
