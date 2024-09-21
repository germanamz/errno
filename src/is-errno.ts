import { Errno, isErrnoSymbol } from './errno';

export const isErrno = <S extends number>(e: any): e is Errno<S> => Boolean(e[isErrnoSymbol]);
