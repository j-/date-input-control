Date input control
==================

Create a date input control for capturing dates in any format:

* DD-MM-YYYY
* MM-DD-YYYY
* YYYY-MM-DD
* MM-YY
* etc.

What this does
--------------

This package allows you to create a single date input control using a sequence
of numeric input boxes. This pattern is especially useful for date of birth
capture where a calendar-based date picker may be cumbersome to use. It will:

* Move focus from one field to the next as the user types
* Move focus if pressing a date separator character (`,` or `.`. or `/`)
* Move focus between fields when pressing Backspace or Delete
* Move focus between fields when pressing left or right arrow keys
* Prevent the entry of non-numeric characters

What this doesn't do
--------------------

* Validation

  You'll need to implement your own validation logic to check that the date
  parts are valid (e.g. month cannot be `0`, day cannot be `99`) and that the
  date itself is valid (e.g. date cannot be February 31st).

* Create elements

  All this package does is attach event listeners to elements that you provide.
  You'll need to create your own numeric year, month and day fields.

How to use it
-------------

First you will need some input fields. There are two requirements in order for
this package to function correctly:

1. Inputs must be of type `text`. You cannot use type `number`.
2. Inputs must have a `maxLength` attribute.

It is recommended that you add `inputMode="numeric"` and `pattern="[0-9*]"` on
each input which will enable the numeric keyboard on mobile devices.

```html
<fieldset role="group">
  <legend>Date of birth</legend>
  <input type="text" maxlength="2" id="dd" inputMode="numeric" pattern="[0-9]*">
  <input type="text" maxlength="2" id="mm" inputMode="numeric" pattern="[0-9]*">
  <input type="text" maxlength="4" id="yyyy" inputMode="numeric" pattern="[0-9]*">
</fieldset>
```

Import `createDateInputControl` and call it with an array of input element refs.

```js
import { createDateInputControl } from 'date-input-control';

const dd = document.getElementById('dd');
const mm = document.getElementById('mm');
const yyyy = document.getElementById('yyyy');

createDateInputControl([dd, mm, yyyy]);
```

The order of the inputs provided determines the focus behaviour.

```js
// For DD-MM-YYYY
createDateInputControl([dd, mm, yyyy]);
// For MM-DD-YYYY
createDateInputControl([mm, dd, yyyy]);
// For YYYY-MM-DD
createDateInputControl([yyyy, mm, dd]);
```

You can provide as many or as few inputs as required.

```js
// For credit card expiry date
createDateInputControl([mm, yyyy]);
// For capturing date and time
createDateInputControl([yyyy, mm, dd, hh, ss]);
```

You can also provide a `NodeList`.

```js
const inputs = document.querySelectorAll('.date input');
createDateInputControl(inputs);
```

To remove the listeners that were attached to your input elements you can call
the returned function.

```js
const unsubscribe = createDateInputControl(inputs);
unsubscribe();
```
