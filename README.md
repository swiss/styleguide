Swiss Admin web guidelines
==========================

The Confederation Web Guidelines define the design specifications for the presentation of the [Swiss Federal Administration](http://www.admin.ch) on the Internet and are binding for all websites within the domain admin.ch. These guidelines specify how the websites of the Federal authorities have to look and how they should behave. At the same time they give the government departments and public offices the necessary flexibility to be able to optimize their online communications to the requirements of their specific business purposes.

These design regulations allow web designers to create up-to-date, user-friendly and universally accessible websites. They define the compulsory corporate design elements as well as the obligatory navigation and content modules. Furthermore, they introduce a series of elements that can be used directly and, if required, expanded upon or further developed. The display presentation has been optimized for web browsers on both desktop computers and laptops as well as on tablets and smartphones.

The Confederation Web Guidelines are aimed at both internal Federal project managers and third party service providers. They offer project managers an overview of the design specifications. Developer teams can use the templates and elements directly. They have been created using standard HTML code (as of 2013) and can be used with CSS and JavaScript style sheets.

The design specifications described for use on the Internet or in intranets can also be used for other digital channels, such as for the creation of apps.


The latest release of the styleguide is available here: http://adminch.antistatique.net

If you want to collaborate or review the next release, go to the gh-pages here: http://antistatique.github.io/Swiss-Admin-web-guidelines


## The Swiss Federal Administration on the Internet

### Styleguide

The styleguide is located in the `/styleguide` directory. You can open `/styleguide/index.html` directly in your browser. (If you can't find it, you have to build all the assets).

#### How to use it in your project

There are several ways to get started:

  - Use the provided build. Download the [latest release](https://github.com/antistatique/Swiss-Admin-web-guidelines/releases/latest) and include all the built assets in your project.
  - Use the Github Pages generated styleguide only. Just download the [gh-pages branch](https://github.com/antistatique/Swiss-Admin-web-guidelines/archive/gh-pages.zip).
  - Clone the repo `git clone https://github.com/antistatique/Swiss-Admin-web-guidelines.git`
  - Install with bower `bower install Swiss-Admin-web-guidelines`


#### Installation (development tools)
This is not needed to use the styleguide, only if you want to modify it to fix some bugs and contribute.


#### Installation on OSX/Unix

> We use [Gulp.js](http://gulpjs.com) to run tasks and build our styleguide with [Hologram](https://github.com/trulia/hologram).

Make sure you have [Node.js](http://nodejs.org) installed.


Install all the dependencies you need:

```shell
$ npm install -g gulp
$ npm install
$ bower install
```

Install Hologram from the Gemfile (for version > 1.1.0):

```shell
$ bundle
```

[Browser-sync](http://www.browsersync.io) is automatically set up and will allow you to make changes and see them in real time.

#### Installation on Windows

This is the not the recommended OS. If you have a choice, use OSX.

*Warning: This was tested on the [Windows PowerShell](﻿http://en.wikipedia.org/wiki/Windows_PowerShell) but should work on any shell that support UTF8.*

- Download and Install [Ruby](http://rubyinstaller.org)

- Install DevKit. Follow [those instructions](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit).

- [Install Ruby & DevKit](http://rubyinstaller.org)

- [Configure DevKit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)

- Download and install [Node.js](http://nodejs.org)

- Install [Git for Windows](http://msysgit.github.io/) (recommended) or alternatively [Github for Windows](https://windows.github.com)`

Then install SASS, Hologram & Bundle

```shell
$ gem install sass bundle hologram
```


Go in the project directory and install the dependencies:

```
C:\\projectPath> npm install gulp -g
C:\\projectPath> npm install
C:\\projectPath> node_module\.bin\bower install
```

Finally you will have to rebuild some gems:

````shell
$ gem uninstal yajl-ruby
$ gem install yajl-ruby --version=1.1.0 --platform=ruby
````

### Build the styleguide

First run gulp:

```shell
$ gulp
```

Run gulp during development process: (with `watch` tasks and browser-sync)

```shell
$ gulp serve
```

## Grid System

The grid system works exactly the same way as [Bootstrap](http://getbootstrap.com/css/#grid), no changes were made. Please refer to their documentation for more details.

## Print classes

You can add print specific classes by using the ones [Bootstrap](http://getbootstrap.com/css/#responsive-utilities-print) made. 

Classes available: `.visible-print-block`, `.visible-print-inline`, `.visible-print-inline-block`, `.hidden-print`.

Please refer to their documentation for more details.

## Styleguide Theme

The stylguide theme is in `styleguide-theme`. It's a theme for Trulia's [Hologram](https://github.com/trulia/hologram).
It was based on [Cortana](https://github.com/Yago31/Cortana).

## How is it included?

The `hologram_config.yml` has a reference  to the styleguide theme:

```yaml
source: ./path/to/your/source
destination: ./path/to/output
documentation_assets: ./path/to/theme
```

## Build the Styleguide Theme

The theme has his own gulpfile (for the moment). So you have to do the following command to build the assets to then generate the styleguide with `$ hologram`:

```shell
$ cd styleguide-theme
$ gulp
```

## FAQ

### Why are there a lot of `!important` in the CSS?

The theme is used only to present all the styles. It's not part of the styleguide. All the `!important`s were added to avoid conflict with other styles, for a better presentation.

### When I try to build with gulp I have the following error: `Syntax error: Invalid US-ASCII character "\xC3"`

This bug is caused by Hologram and should be fixed in the next release. The workaround is to force UTF8 by running:

```shell
$ LC_ALL="en_US.UTF-8" gulp
```

Or you can edit your .zshrc file with the following configuration:

````
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
````

