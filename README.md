# Navigator.js
Validate the navigator version that's being used to access the website.

# Usage 

First of all, you must import the JavaScript file to your page:

```html
<script src="Navigator.js" type="text/javascript"></script>
```

And then, use the main function to test the navigator version:

```javascript
if (!$.Navigator().test()) {
    alert('Update your browser!');
}
```

You can easily specify the minimum version supported:

```javascript
if (!$.Navigator().test({ chrome: 40 })) {
    alert('Update your browser!');
}
```
