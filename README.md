# Swiss Confederation Web Guidelines

- [About Accessibility](Accessibility.md)
- [How to use the styleguide in your project?](HOWTO.md)


## Summary

- [Installation](#installation)
- [Contribution](#contribution)
- [FAQ](#faq)
- [Known Issues](#known-issues)

The Confederation Web Guidelines define the design specifications for the presentation of the [Swiss Federal Administration](http://www.admin.ch) on the Internet and are binding for all websites within the domain admin.ch. These guidelines specify how the websites of the Federal authorities have to look and how they should behave. At the same time they give the government departments and public offices the necessary flexibility to be able to optimize their online communications to the requirements of their specific business purposes.

These design regulations allow web designers to create up-to-date, user-friendly and universally accessible websites. They define the compulsory corporate design elements as well as the obligatory navigation and content modules. Furthermore, they introduce a series of elements that can be used directly and, if required, expanded upon or further developed. The display presentation has been optimized for web browsers on both desktop computers and laptops as well as on tablets and smartphones.

The Confederation Web Guidelines are aimed at both internal Federal project managers and third party service providers. They offer project managers an overview of the design specifications. Developer teams can use the templates and elements directly. They have been created using standard HTML code (as of 2013) and can be used with CSS and JavaScript style sheets.

The design specifications described for use on the Internet or in intranets can also be used for other digital channels, such as for the creation of apps.

## Installation

*Recommended:* Install with NPM ([more details](HOWTO.md)):

```
$ npm install swiss-styleguide --save-dev
```

Install with Bower:

```
$ bower install swiss-styleguide
```

Use the provided build. Download the [latest release](https://github.com/swiss/styleguide/releases/latest) as an archive.


## Contribution

If you want to contribute, fix a bug or suggest a new feature, please first [create a new issue](https://github.com/swiss/styleguide/issues/new), so we can discuss it. Then, please make a Pull Request to the `dev` branch. This is important, as we use the [Git Flow](https://github.com/swiss/styleguide/issues/new) workflow. We thank you in advance for your collaboration!


### Project setup on OSX/Unix/Windows

We use [Gulp.js](http://gulpjs.com) to run tasks and build our styleguide with [Fabricator](http://fbrctr.github.io/). Those depends on [Node.js](http://nodejs.org), be sure it’s installed before going further.

Install all the required dependencies, build the styleguide and start the server:

```
$ npm start
```

[Browser-sync](http://www.browsersync.io) is automatically set up and will allow you to make changes and see them in real time.

### Build the styleguide

Run the default Gulp task:

```
$ gulp
```

Run Gulp during development process (with `watch` tasks and browser-sync):

```
$ gulp serve
```

## FAQ

### Grid System

The grid system works exactly the same way as [Bootstrap](http://getbootstrap.com/css/#grid), no changes were made. Please refer to their documentation for more details.

### Print classes

You can add print specific classes by using the ones [Bootstrap](http://getbootstrap.com/css/#responsive-utilities-print) made. 

Classes available: `.visible-print-block`, `.visible-print-inline`, `.visible-print-inline-block`, `.hidden-print`.

Please refer to their documentation for more details.

## Known issues

### `@font-face` + Cache-Control/Pragma: 
There is a known issue with Internet Explorer when loading the page over HTTPS with Cache-Control or Pragma headers set. Disable cache control on fonts to fix it (refer to [issue #359](https://github.com/swiss/styleguide/issues/359) for more information):

```
<FilesMatch "\.(eot|otf|woff|ttf)$">
   Header unset Cache-Control
   Header unset Pragma
</FilesMatch>
```
