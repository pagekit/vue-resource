# API Reference

## Request

```js
{
  // Constructor
  constructor(object: options)

  // Properties
  url (string)
  body (any)
  headers (Headers)
  method (string)
  params (object)
  timeout (number)
  credentials (boolean)
  emulateHTTP (boolean)
  emulateJSON (boolean)
  before (function(Request))
  progress (function(Event))

  // Methods
  getUrl() (string)
  getBody() (any)
  respondWith(any: body, object: options) (Response)
}
```

## Response

```js
{
  // Constructor
  constructor(any: body, object: {string: url, object: headers, number: status, string: statusText})

  // Properties
  url (string)
  body (any)
  headers (Headers)
  ok (boolean)
  status (number)
  statusText (string)

  // Methods
  blob() (Promise)
  text() (Promise)
  json() (Promise)
}
```

## Headers

```js
{
  // Constructor
  constructor(object: headers)

  // Properties
  map (object)

  // Methods
  has(string: name) (boolean)
  get(string: name) (string)
  getAll() (string[])
  set(string: name, string: value) (void)
  append(string: name, string: value) (void)
  delete(string: name) (void)
  forEach(function: callback, any: thisArg) (void)
}
```
