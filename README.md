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

#### Source maps

Source maps allow you to debug with the ES6/ES7 syntax you wrote.
You should activate them for debugging. Type `enable source maps <browser>` in Google if you don't know how to do this.

#### Bundle

You've just done cool stuff and you want to make a production build? One way: `npm run bundle`. Details:
* `npm run bundle`: Bundle the project
* `npm run bundle_css`: Bundle the Less files
* `npm run bundle_js`: Bundle the JavaScript files

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

#### Create a component

Here is the component boilerplate used in this project:
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