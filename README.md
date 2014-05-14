Swiss Admin web guidelines
==========================

> Built with [Hologram](https://github.com/trulia/hologram) using the [Cortana](https://github.com/antistatique/Cortana-Swiss-Admin) template.

The Confederation Web Guidelines define the design specifications for the presentation of the [Swiss Federal Administration](http://www.admin.ch) on the Internet and are binding for all websites within the domain admin.ch. These guidelines specify how the websites of the Federal authorities have to look and how they should behave. At the same time they give the government departments and public offices the necessary flexibility to be able to optimize their online communications to the requirements of their specific business purposes.

These design regulations allow web designers to create up-to-date, user-friendly and universally accessible websites. They define the compulsory corporate design elements as well as the obligatory navigation and content modules. Furthermore, they introduce a series of elements that can be used directly and, if required, expanded upon or further developed. The display presentation has been optimized for web browsers on both desktop computers and laptops as well as on tablets and smartphones.

The Confederation Web Guidelines are aimed at both internal Federal project managers and third party service providers. They offer project managers an overview of the design specifications. Developer teams can use the templates and elements directly. They have been created using standard HTML code (as of 2013) and can be used with CSS and JavaScript style sheets.

The design specifications described for use on the Internet or in intranets can also be used for other digital channels, such as for the creation of apps.


[Live version of the guidelines](http://adminch.antistatique.net/).


## The Swiss Federal Administration on the Internet



## Styleguide

The styleguide is located in the `/styleguide` directory. You can open `/styleguide/index.html` directly in your browser.

## How to use it in your project

There are several ways to get started:

  - Use the provided build. Download the [latest release](https://github.com/antistatique/Swiss-Admin-web-guidelines/archive/master.zip) and include `/build` directory in your project.
  - Clone the repo `git clone https://github.com/antistatique/Swiss-Admin-web-guidelines.git`
  - Install with bower `bower install Swiss-Admin-web-guidelines` (soon)


## Installation (to contribute)

  > We use [Gulp.js](http://gulpjs.com) to run tasks and build our styleguide with [Hologram](https://github.com/trulia/hologram).
  
  Make sure you have [Node.js](http://nodejs.org) installed.
  
  
  Install all the dependencies you need:
  
  ```
  $ npm install
  $ bower install
  ```
  
  Install Hologram from the Gemfile:
  
  ```
  $ bundle
  ```
  
  Run gulp
  
  ```
  $ gulp
  ```
  
  
  [Browser-sync](http://www.browsersync.io) is automatically set up on `localhost` and will allow you to make changes and see them in real time.

## Styleguide Theme


The stylguide theme is in `styleguide-theme`. It's a theme for Trulia's [Hologram](https://github.com/trulia/hologram).
It was based on [Cortana](https://github.com/Yago31/Cortana).

## How it's include?
The `hologram_config.yml` have a referance  to it:

```
source: ./path/to/your/source
destination: ./path/to/output
documentation_assets: ./path/to/theme



## FAQ

### What is the .cortana-* prefix for CSS selector names?

This is not propertly part of the styleguide code. It's used for the theme to avoid conflict with the CSS for styleguide.
We could use iframe, but iframe provide different others bugs. Now than the theme is include directly in this repository,
we will change to a better prefix like ".stylguide-theme-*".

### Why the Styleguide Theme (styleguide-theme) as so many !important?

The theme is their for the presentation. It's not part of the styleguide. To avoid conflict with other style we have

