# How to use in your project

The styleguide is a NPM/Bower package that can be simply included in your dependencies and from which you can fetch the built styles and scripts. This way, you can ensure a better maintanability and update when needed without any hassle.

## Install

First, make sure you have [Node.js](http://nodejs.org/) installed: we'll be using the `$ npm` command. To install Node.js, download and run the installer you'll find on [their homepage](http://nodejs.org/).

If you want to import all files without getting them through your personnal task runner (gulp/grunt/other...)

```
$ npm install swiss-styleguide --save
```

Or if you plan to compile all the dependencies with your task runner and therefore only need to add the component as a development dependency

```
$ npm install swiss-styleguide --save-dev
```

Now you basically need to import all the CSS & JavaScript files placed in the `build` folder. If you want to build them on your own, you should look for files in the `src` folder.

## Report issues

You should **never** alter anything in the project folder. If you find any bugs, [https://github.com/swiss/styleguide/issues](create an issue on the official repository). Make sure that the issue doesn't already exist before posting.
