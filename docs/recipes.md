# Code Recipes

The Recipes provide code examples to common use-cases. If you want to share your recipe feel free to send a [pull request](https://github.com/pagekit/vue-resource/pulls).

## Forms

Sending forms using [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

```js
{
  var formData = new FormData();

  // append string
  formData.append('foo', 'bar');

  // append Blob/File object
  formData.append('pic', fileInput, 'mypic.jpg');

  // POST /someUrl
  this.$http.post('/someUrl', formData).then(response => {
    // success callback
  }, response => {
    // error callback
  });
}
```

## Abort a request

Abort a previous request when a new request is about to be sent. For example when typing in a autocomplete input.

```js
{
  // GET /someUrl
  this.$http.get('/someUrl', {

    // use before callback
    before(request) {

      // abort previous request, if exists
      if (this.previousRequest) {
        this.previousRequest.abort();
      }

      // set previous request on Vue instance
      this.previousRequest = request;
    }

  }).then(response => {
    // success callback
  }, response => {
    // error callback
  });
}
```
