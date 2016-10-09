Temporal Data Skeleton
======================

We are designing new methods to represent the time in graphs.

Stay tuned.

## Set up your environment 

#### Installation

Well, installation is a bit hard, but I'm sure you will succeed. Just `npm install`

#### Develop

If you intend to write some bytes of JavaScript or Less, you have the choice:
* `npm run build`: Build the project once (both JavaScript and Less files)
* **`npm run dev`**: Better for development, like build but watch JavaScript files changes and rebuilt on the fly
* `npm run build_css`: Compile Less files
* `npm run build_js`: Build JavaScript files
* `npm run watch_js`: Watch JavaScript files and compile when there is an update

#### Bundle

You've just done cool stuff and you want to make a production build? One way: `npm run bundle`. Details:
* `npm run bundle`: Bundle the project
* `npm run bundle_css`: Bundle the Less files
* `npm run bundle_js`: Bundle the JavaScript files

#### Source maps

Source maps allow you to debug with the ES6/ES7 syntax you wrote.
You should activate them for debugging. Type `enable source maps <browser>` in Google if you don't know how to do this.

#### Serve files

You don't need to install WAMP, LAMP, or someting else. Just `npm run serve` and you will get a server serving static files!

## Contribute and develop

#### ES6 & ES7

We are using latest features from JavaScript using Babel.

* ES6 : See excellent [es6features](https://github.com/lukehoban/es6features#readme) from lukehoban for all new features.
* ES7 : Contains "async await" feature, good bye promises! See [Syntax async functions](https://babeljs.io/docs/plugins/syntax-async-functions/).

#### Lodash

Don't write loop anymore! All small algorithms have been already written for you (Manipulation, Searching, Sorting, etc.).
Please use lodash instead of native methods for consistency. And it works for non-native structures!

#### React

You **must** read this before trying to use React : [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html).

## Snippets

You can copy paste those snippets as many times as you need them.

#### Standalone Class

Please always use methods to declare your functions. We will add soon unit tests so we have to access to all declared functions.
You must use prefixes and put public methods on top on the class (for better readability).

```javascript
const _ = require("lodash");

class ClassName {

    constructor() {
        
    }
    
    publicMethod() {
    
    }
    
    _protectedMethod() {
    
    }
    
    __privateMethod() {
    
    }
}

module.exports = ClassName;
```

#### Component (view)

```javascript
const _ = require("lodash");
const React = require("react");
const autoBind  = require("react-autobind");

class Component extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div>
                This is my component content.
            </div>
        )
    }
}

module.exports = Component;
```

#### Static Helper

```javascript
const _ = require("lodash");

class Helper {

    static init() {
    
    }

    static myMethod() {
        
    }
}

Helper.init();

module.exports = Helper;
```
