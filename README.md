# JavaScript DOM & Events – Questions and Answers

---

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### Ans :

### document.getElementById():

1. The method is return to one specific element when id attribute exactly matches .
2. If a matching element is not found , it returns null otherwise it returns that specific Element object
3. IDs are intended to be unique identifiers so it is very fast compared to methods like querySelector()
4. This method has Document interface so only works on the document
5. Designed for unique IDs only so if it get multiple elements with the same ID, it will return the first one document's source.


### getElementsByClassName() :

1. The method returns an array-like object which name is HTMLCollection and it is "live", which meaning it automatically updates to reflect changes in the DOM.
2. It is called the entire document object to search because can search the whole pages.
3. It can handle the multiple classes and return the multiple elements.
4. It can be used on document or specific element and can be access element using zero-based index numbers like array
5. It is Faster than querySelector() or querySelectorAll() methods for simple class name.


### querySelectorAll():

1. It returns a static non-live NodeList which means does not update automatically if the DOM changes.
2. It accepts any valid complex CSS selector like .class, #id, div > p, [attribute] and using comma separating different elements at a time.
3. It throws a SyntaxError if provided selector string is invalid.
4. Return a empty NodeList or not null if no match .
5. It Slightly slower than getElementsByClassName() for simple class selection


### querySelector():

1. only the first found element in the DOM tree is returned from multiple matches element.
2. It supports all CSS selectors including nested selectors like div > p.highlight
3. It returns null instead of throwing an error If no elements match.
4. Slower than getElementById() for ID selection.
5. It can be used on document or specific element

---

## 2. How do you create and insert a new element into the DOM?

### Ans :

To create and insert a new element into the DOM using JavaScript we follow some steps like-

Firstly create a new element using document.createElement() method, pass the tag name as a string argument like –

```javascript
const newDiv = document.createElement("div");
```

then before inserting the element, we can set its content, classes, or other attributes. Like-

```javascript
newDiv.text = "This is a new div"; // Set text content
newDiv.classList.add("my-class"); // Add a CSS class
newDiv.setAttribute("id", "my-id"); // Set an ID attribute
```

Now get the target parent element in the DOM where we want to place the new element like –

```javascript
const parentElement = document.getElementById("container");
```

and finally Insert the new element: Use the appendChild() method in the parent element like –

```javascript
parentElement.appendChild(newDiv); // Appends the new div to the end of the container
```

so now we get a new element to the DOM.

---

## 3. What is Event Bubbling? And how does it work?

### Ans :

Event bubbling is a mechanism of the DOM where, when an event is triggered on an element, the event bubbles upward through the DOM tree, it means if a child element is clicked, the same event will also be triggered on its parent elements.

Event Bubbling has 3 phase like –

1. Capture phase
2. Target phase
3. Bubble phase

### Working process –

Suppose we have a button html code

```html
<body>
  <div id="parent">
    <button id="child">Click Me</button>
  </div>
</body>
```

now when I click the button the event flows like this:

1. Button (target element)
2. Div (parent)
3. Body
4. Html
5. Document

This upward movement is called bubbling.

We can see this clearly using JS code –

```javascript
const button = document.getElementById("child");
const parent = document.getElementById("parent");

button.addEventListener("click", function() {
  console.log("Button clicked");
});

parent.addEventListener("click", function() {
  console.log("Parent clicked");
});
```

Now When we click the button, output is:

```
Button clicked
Parent clicked
```

Because First the event runs on the button.Then it bubbles up to the parent div.

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

Event delegation is a technique in JavaScript where a parent element handles events for its child elements, even if the children are added dynamically after the page loads. This works because events in JavaScript bubble up from the target element to its ancestors.so we can say it make to using the concept of Event Bubbling.

### Working process –

3 steps of event delegation

Step 1. Determine the parent of elements to watch for events
Step 2. Attach the event listener to the parent element
Step 3. Use event.target to select the target element

```html
<!-- Step 1 -->
<div id="buttons"> 
  <button class="buttonClass">Click me</button>
  <button class="buttonClass">Click me</button>
  <button class="buttonClass">Click me</button>
</div>

<script>
document.getElementById('buttons')
// Step 2
  .addEventListener('click', event => {     
    if (event.target.className === 'buttonClass') {

      // Step 3
      console.log('Click!');
    }
  });
</script>
```

---

## 5. What is the difference between preventDefault() and stopPropagation() methods?

### event.preventDefault()

it stops the browser's default action for an event

Examples :

Normally When we click a link, the browser opens the new page.
But With preventDefault() method The page does not open.like -

```javascript
link.addEventListener("click", function(e) {
  e.preventDefault();
});
```

Normally when click a submit button Form sends data Page reloads
But With preventDefault() method Form does not reload page and can check data first like-

```javascript
form.addEventListener("submit", function(e) {
  e.preventDefault();
});
```

so lastly we say that preventDefault() stops the browser’s normal action.

---

### event.stopPropagation()

It stops the event from moving to parent elements.

Normally If you click the given code button First button runs then parent runs

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

But when we use stopPropagation() like below code it prevents the event from propagating up/down to parent elements.

```javascript
document.getElementById("parent").addEventListener("click", function() {
  console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", function(event) {
  event.stopPropagation();
  console.log("Button clicked");
});
```

Now only console output is:

```
Button clicked
```

---
