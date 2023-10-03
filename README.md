# Errno
Better errors make your life simpler.

Errno standardizes they way errors are created and used by providing
a simple interface that can be used as errors for any AP or SDK.

It can be used as a replacement of plain old js Error or alongside
them, it extends the *Error* class making it easier to do so.

But what makes Errno useful is that it adds a couple of new properties
*code* and *context*, they make error identification easier in a
big system.

# Usage

Just create an instance
```typescript
import Errno from 'errno';

const e = new Errno('NOT_FOUND', 'That thing was not found', [
  {
    thingId: 'inexistent',
  },
]);
```
This will allow you to use errno in a json stringification straight
forward.

```typescript
const res = JSON.stringify(e);
```
Having the result be

```json
{
  "code": "NOT_FOUND",
  "message": "That thing was not found",
  "context": [
    {
      "thingId": "inexistent"
    }
  ]
}
```

### Known error
A better way of using Errno is by creating a set of `known` errors.

```typescript
const NOT_FOUND = (context?: unknown[]) => new Errno('NOT_FOUND', 'That thing was not found', context);

const e = NOT_FOUND({
  thingId: 'inexistent',
});

JSON.stringify(e);
```
Having the same result as the prev example but with a bit less code
```json
{
  "code": "NOT_FOUND",
  "message": "That thing was not found",
  "context": [
    {
      "thingId": "inexistent"
    }
  ]
}
```

_Note: There's no way for use to know your errors in advance, so the better
thing to do is you write your own set_

### Translate to Errno
You can take a plain Error and transform it to be an Errno using `translateToErrno`

```typescript
import { translateToErrno } from 'errno';

const e = translateToErrno(new Error('something went wrong'), 'UNHANDLED_ERROR');

JSON.stringify(e);
```
Having the json be
```json
{
  "code": "UNHANDLED_ERROR",
  "message": "something went wrong",
  "context": []
}
```
By doing a simple `console.log()` you'll get something like this on the console
```
Errno [Error]: something went wrong
    at REPL23:1:5
    at Script.runInThisContext (node:vm:123:12)
    at REPLServer.defaultEval (node:repl:569:29)
    at bound (node:domain:433:15)
    at REPLServer.runBound [as eval] (node:domain:444:12)
    at REPLServer.onLine (node:repl:899:10)
    at REPLServer.emit (node:events:529:35)
    at REPLServer.emit (node:domain:489:12)
    at [_onLine] [as _onLine] (node:internal/readline/interface:423:12)
    at [_line] [as _line] (node:internal/readline/interface:894:18) {
  code: 'UNHANDLED_ERROR',
  context: [ ],
  [Symbol(isErrno)]: true
}
```
Remember Errno is an Error subclass
