Swiss Admin web guidelines
==========================

> Styleguide for the Swiss Admin. Built with [Hologram](https://github.com/trulia/hologram) with the template [Cortana](https://github.com/antistatique/Cortana-Swiss-Admin).

Check the [styleguide](#). (soon)

## The Swiss Federal Administration on the Internet

The Confederation Web Guidelines define the design specifications for the presentation of the Swiss Federal Administration on the Internet and are binding for all websites within the domain admin.ch. These guidelines specify how the websites of the Federal authorities have to look and how they should behave. At the same time they give the government departments and public offices the necessary flexibility to be able to optimize their online communications to the requirements of their specific business purposes.

These design regulations allow web designers to create up-to-date, user-friendly and universally accessible websites. They define the compulsory corporate design elements as well as the obligatory navigation and content modules. Furthermore, they introduce a series of elements that can be used directly and, if required, expanded upon or further developed. The display presentation has been optimized for web browsers on both desktop computers and laptops as well as on tablets and smartphones.

The Confederation Web Guidelines are aimed at both internal Federal project managers and third party service providers. They offer project managers an overview of the design specifications. Developer teams can use the templates and elements directly. They have been created using standard HTML code (as of 2013) and can be used with CSS and JavaScript style sheets.

The design specifications described for use on the Internet or in intranets can also be used for other digital channels, such as for the creation of apps.

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
  
  Install Hologram:
  
  ```
  $ gem install hologram
  ```
  
  Run gulp
  
  ```
  $ gulp
  ```
  
  
  [Browser-sync](http://www.browsersync.io) is automatically set up on `localhost` and will allow you to make changes and see them in real time.
