# pure-snow.ts

A simple TypeScript package that generates snowflakes and corresponding CSS to make them fall on your webpage.
Forked and base of works from https://github.com/hyperstown/pure-snow.js. Thanks to original author!

## Description
To resolve these issues, I rewrote the original pure-snow.js in TypeScript and adding type definitions:
 - Hardcoded document element access.
 - Attachment to window object.
 - Fullscreen only support.

## Usage
You can use several ways to include and use the package in your project:
### By CDN
#### Auto initialization
You can include the package via a CDN link in your HTML file. The snow effect will be automatically initialized when the document is loaded.
```html
<!--     You can use either the IIFE or the ES module version with auto initialize -->
<script src="dist/pure-snow.iife.js" data-init="true" ></script>
<script type="module" src="dist/pure-snow.es.js?init=true"></script>
```

#### Manual initialization
```html
<!--     use the IIFE version and manually initialize -->
<script src="dist/pure-snow.iife.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
    initPureSnow();
});
</script>

<!--     Or else use the ES module version and manually initialize -->
<script type="module">
    import { init } from '/src/pure-snow.ts';
    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
</script>
```
### By npm
You can install the package via npm and import it in your JavaScript or TypeScript files.
```bash
npm install pure-snow.ts
```
Then, you can import and use the package as follows:
```ts
import { initPureSnow } from 'pure-snow.ts';
document.addEventListener('DOMContentLoaded', () => {
    initPureSnow();
});
```

## Customization
### Specifying a container element
Instead of global document, you can specify a container element to which the snow effect will be applied.
```ts
import { initPureSnow } from 'pure-snow.ts';
const container = document.getElementById('my-container');
document.addEventListener('DOMContentLoaded', () => {
    initPureSnow({
        root: container
    });
});
```
### Adjusting snowflake count
You can adjust the number of snowflakes by specifying the `count` option.
```ts
import { initPureSnow } from 'pure-snow.ts';
document.addEventListener('DOMContentLoaded', () => {
    initPureSnow({
        count: 300
    });
});
```
Or just use data attribute `data-count` on the container element:
```html
<div id="my-container" data-count="300"></div>
```
### All options
```typescript
export type PureSnowConfig = {
    root: Element,
    cssRoot: Element,
    snowflakesCount: number,
    snowWrapperClass: string,
    // when snowflakeClass is changed, make sure to update the baseCSS accordingly
    snowflakeClass: string,
    heightPx?: number,
    heightVh?: number,
    baseCSS: string,
}
```
# Original README for pure-snow.js
Written in pure JS/CSS. (No SCSS). 

Inspired by: [alphardex](https://codepen.io/alphardex/pen/dyPorwJ) (SCSS Version) and [YusukeNakaya](https://codepen.io/YusukeNakaya/pen/NWPqvWW) (Vue implementation).

pure-snow.js was created for those who don't want to install any additional libraries and want to easily change parameters. \
If you only need the effect I can also recommend downloading compiled version of [alphardex's](https://codepen.io/alphardex/details/dyPorwJ) work. 
It should be render slightly faster.



## Installation

### npm

To install via npm, run the following command in your terminal:

```bash
npm install pure-snow.js
```

### Script Tag

To use the script via a script tag, include the following in head of your HTML file:

```html
<link rel="stylesheet" href="/path/to/style.css">
<script src="/path/to/pure-snow.js" defer></script>
```

## Usage

In case you used npm to install the package, generate snowflakes with `generateSnow` function.

```js
// import "pure-snow.js/style.css"; // Remember to import style.css
import { createSnow, showSnow } from "pure-snow.js";

createSnow(); // creates snowflakes and generate css for them
showSnow(true); // snow can be disabled using showSnow function
```

**NOTE: When used via a script tag, generateSnow will run automatically after document has been loaded.**

Create snow element.

```html
<div id="snow"></div>
```


### Controlling snowfall density:

Default amount of snowflakes is set to 200. This might be challenging for an older GPU. \
You can change that by adding data attribute `count` to snow div eg:
```html
<div id="snow" data-count="200"></div>
```


### No CSS files whatsoever:
It is also possible to get rid of style.css file. Just paste it's content to declaration of const `BASE_CSS` in script above pure-snow.js file eg:

```html
<script>
const BASE_CSS = `
    body {
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        overflow-x: hidden;
        min-height: 100vh; 
        /* If you want to change the site height you can remove overflow-y */
        /* pure-snow will automatically detect height of body tag */
        overflow-y: hidden;
        color: white;
    }
    
    .snowflake {
        position: absolute;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        filter: drop-shadow(0 0 10px white);
    }
`
</script>
<script src="/path/to/pure-snow.js" defer></script>
```

## Example

Here is a full example of how you might use the `pure-snow.js` in a webpage:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/path/to/style.css">
        <script src="/path/to/pure-snow.js" defer></script>
        <!-- Generated snowflake styles will be injected here --> 
    </head>
    <body>
        <div id="snow" data-count="200"></div>
        <!-- Your content goes here --> 
    </body>
</html>
```

## Caveats

### Page height:
Keep in mind that increasing page height might impact performance. 
While increasing page height snowflake count should also be increased.

For example:

Page `height:100vh` ---> `count = 200`

Page `height:200vh` ---> `count = 300`


## Demo: 
https://hyperstown.github.io/puresnowjs/


## License

This project is licensed under the MIT License. See the LICENSE file for more details.
