# Errno
Better errors make your life simpler.

Errno simplifies how errors are handled on reliable systems
by providing a clear interface to define known code, messages
and statuses.

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
const NOT_FOUND = (context?: unknown[]) => new Errno('NOT_FOUND', 'Not found', context);

const e = NOT_FOUND({
  thingId: 'inexistent',
});

JSON.stringify(e);
```
Having the same result as the prev example but with a bit less code
```json
{
  "code": "NOT_FOUND",
  "message": "Not found",
  "context": [
    {
      "thingId": "inexistent"
    }
  ]
}
```

_Note: There's no way for us to know your errors in advance, so the best
thing to do is for you to write your own set of known errors_

### Translate to Errno
You can take a plain Error and _translate_ it to be an Errno using `translateToErrno`

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
Remember Errno is an Error subclass which is why if a new instance of Errno
is created it will have a `e.stack` property.

Another fun thing you could do is to implement your own class using the ErrnoI
interface, but that's a rabbit hole on its own... so I'll leave it to you.

## Additional notes
A very good approach for creating reliable systems is to use some kind of
interface for responses between two system parts, [neverthrow](https://www.npmjs.com/package/neverthrow)
provides a simple structure for that, in combination with Errno it can
have an even more robust interface for error handling and definition.

# Licence
Open source [licensed as MIT](https://github.com/germanamz/errno/blob/main/LICENSE).

# Credits
German Meza ([germanamz.com](https://germanamz.com) / @germanamz)
