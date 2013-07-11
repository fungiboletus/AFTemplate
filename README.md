AFTemplate
==========

Simple JavaScript template engine.

* Small (427bytes with minification and gzip)
* Fast (like others small templates engines)
* JSP like syntax
* Quick and dirty <3

## Usage
```javascript
var tpl = AFTemplate("Hello <%= name %>"),
    html = tpl({name: "world"});

// or 
var html = AFTemplate("Hello <%= name %>")({name: "world"});
```

```jsp
<script id="numbers" type="text/html">
<ul>
  <% for (var i = start; i <= end; ++i) { %>
    <li><%= i %></li>
  <% } %>
</ul>
</script>
```

```javascript
var html = AFT("numbers", {start: 1, end: 10});
```

## Browsers comptability
It seems that it's working on the majority of navigators, including IE6 and Safari mobile.

## Licence
This tool is released under the BSD opensource licence.

## Why ?

I like Mustache.js and ICanHaz.js but I'm converting server side JSP pages to client side JSON/Javascript pages,
and I'm too lazy to totally change the templates for a logicless solution.

Underscore.js is a good solution and http://ejohn.org/blog/javascript-micro-templating/ is what
I needed but I wanted to develop a new template engine.
