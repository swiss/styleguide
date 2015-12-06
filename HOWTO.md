# How to use the Swiss Admin Styleguide in your project

The styleguide is a bower component that can be simply included in your dependencies and from which you can fetch the built styles and scripts. This way, you can ensure a better maintanability and update when needed without any hassle.

## HOWTO

*This guide is for an OS X or Linux setup. Which you should be using already, of course.*

### Setup your environment

First, make sure you have [Node.js](http://nodejs.org/) installed: we'll be using the `$ npm` command. To install Node.js, download and run the installer you'll find on [their homepage](http://nodejs.org/).

### Install the Bower component

To use the styleguide as an easily maintanable dependency, we'll be using the package manager [Bower](http://bower.io/). To install bower on your machine, simply run:

```bash
$ npm install -g bower
```

Then, in your project root, run

```bash
$ bower init
# answer the various questions y/n
```

This will create a `bower.json` file in your project. Now, to install the `swiss-styleguide` component, you just have to run:

```bash
# if you want to import all files without getting them through your personnal
# task runner (gulp/grunt/other...):
$ bower install swiss-styleguide --save
# or if you plan to compile all the dependencies with your task runner and
# therefore only need to add the component as a development dependency
$ bower install swiss-styleguide --save-dev
```

And you're all set!

### Use the styleguide in your project

To import the styleguide you basically need to import all files placed in the `build/` folder to your project.

Compile these files with a task runner of your choice, or just import them from where they are.
