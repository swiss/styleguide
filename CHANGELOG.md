CHANGELOG
=========

This changelog references the relevant changes and bug fixes.

* 3.0.0 (2016-02-24)
 * New documentation translated in german and french
 * #407 Fix icon of emergency component on IE11
 * #400 Fix an issue with Process navigation when first/last item was active
 * #421 Do not hide print icon on small screens
 * Fix an issue which was misplacing the controls of carousels
 * Focus component overall accessibility has been improved, now with a play/pause button
 * #138 Change various font sizes to relative units
 * Introduced high-contrast outline around focused element while browsing with the keyboard
 * #208 Remove custom styling of checkboxes/radio buttons for better accessibility (required markup has changed)
 * Language switcher gets more acccessible with extra attributes to describe languages
 * Move "Admin Icons" code points to [PUA Area](https://en.wikipedia.org/wiki/Private_Use_Areas)
 * #246 Remove deprecated social sharing buttons
 * #219 Fix accessibility on tables

* 2.5.4 (2015-08-31)
 * #376 Fix controls spacing in slideshow element
 * #385 Change Deutschland to Germany in language select

* 2.5.4 (2015-08-19)
 * #357 Missing print function in contact box fix IE9 bug

* 2.5.3 (2015-08-17)
 * #375 add .clearfix class to the infobox element to avoid overflowing elements when floated !markup
 * #374 remove clearing of search-field when clicking on body element, enhance its clear button
 * #371 remove the p key shortcut to show the print view
 * #381 add .hidden-print class to content-sidebar anchors
 * #372 #370 fix print styles
 * #357 add optional parameter to the printPreview() function !markup -> see doc
 * #373 fix nav-page-list element to behave correctly on mobile
 * #381 set .clearfix class to collapse element to avoid issues with first-child heading
 * #381 change max-width of nav-main element from 140px to 110px
 * #376 fix slideshow carousel-controls element to make it work with bigger numbers !markup
 * #368 fix missing print function on publications page
 * #380 add info about favicons in the CDelements page
 * #367 #344 fix markup change in js for the focus and tabs elements
 * #381 fix various visual issues with tabs (background-color, padding, focus state)

* 2.5.2 (2015-02-26)
 * #356 fix error with active state of `.list-emphasis` as list parent
 * #358 fix `.table-striped` error due to new Bootstrap version

* 2.5.1 (2015-02-10)
 * #353 Improve print styles
 * #348 #347 Fix errors with image flow in Publications
 * #339 Fix error with buttons in main navbar
 * #271 Change alt text of main logo
 * #333 Slideshow

* 2.5.0 (2015-01-20)
 * #325 [CONTRAST] fix contrast in carets
 * #279 [CONTRAST] fix input placeholders color
 * #324 [CONTRAST] fix tabs background contrast
 * #280 [CONTRAST] fix badge color bin nav-page-list
 * #321 [CONTRAST] fix color and weight in active link from main navbar
 * #241 Update Bootstrap to 3.3.1
 * #235 Fix `bower.json`
 * #266 Fix headings `font-size` on small devices
 * #268 Display version number on homepage of styleguide
 * #287 Implement better collapsibles examples
 * #322 Fix the font-face mess (faux-bold when setting `font-weight`, etc..)
 * #288 Remove link on active link in nav-page-list
 * #297 Treecrumb uses nested lists now
 * #299 Fix collapsible row in table
 * #323 Update README file
 * #340 #301 #275 #274 #276 Update loads of aria-tags
 * #302 Fix Nav page list with nested lists
 * #337 Fix global navigation error in some examples
 * Switch all template examples to `.twig` files
 * #350 Add rows in footer to avoid wrong behavior
 * Update README with info for Windows contribution config

* 2.4.1 (2015-01-16)
 * #327 responsive adjustment
 * #264 add comment about carousel accessibility
 * #342 remove useless watch in gulp file set smaller max-width on title on screen-sm to avoid bug seen in #327

* 2.4.0 (2015-01-05)
 * #327 Anchor link for context information when placed at the bottom
 * #319 [icons] Icon in download list are shown twice.
 * #318 Distance in between checkboxes and text is wrong in search results.
 * #307 Social Sharing layout is moving on browser zoom
 * #306 Resetting of search value doesn't work.
 * #305 Search input field will only be initialised when typeahead values are available.
 * #295 Language navigation covers name of the organizational unit
 * #292 Invalid HTML in footer links.
 * #291 Invalid HTML in breadcrumb.
 * #290 Missing preset number at one-line order form.
 * #289 Global Navigation slipped down when scrolling.
 * #283 Single images will not be scaled and overlays their boxes.

* 2.2.0 (2014-10-08)
 * #243  Heading not in a logical sequence bug
 * #215 Page navigation list element accessibility waiting for answer
 * #216 Process navigation - active state should be more visible accessibility
 * #247 Visited links enhancement invalid
 * #249 Alternative text of icons accessibility
 * #248 Alternative text of the Confederation logo accessibility
 * #254 keyboard focus not visible well enough accessibility duplicate
 * #259 faceted page navigation - add visually hidden texts accessibility
 * #258 collapsible elements not working correctly with screenreaders accessibility
 * #255 error messages are not accessible accessibility
 * #250 Hierarchy of titles accessibility duplicate
 * #252 Title of the website without <br> accessibility
 * #256 dropdown lists are not accessible accessibility duplicate
 * #69 News feed should not be scrollable on mobile duplicate UX
 * #146 Accessibility - WCAG 2.4.7 Focus visible, skip links not visible accessibility
 * #143 Accessibility - WCAG 2.4.1.Bypass Blocks, skiplinks missing accessibility

* 2.1.9 (2014-09-24)
 * #244 Create page about accessibility
 * #242 Fix navigation lists accessibility
 * #240 #223 Set first item of Treecrumb list to be a link and improvements
 * #239 Improve global navigation on mobile
 * #238 #220 Fix tables accessibility
 * #212 fix lightbox issues
 * #162 fix keyboard navigation with sub-navigation
 * #142 add fieldset around checkboxes and radios
 * #181 #180 Alignements page title and copyright

* 2.1.8
 * #233 Improve README file enhancement Styleguide
 * #225 Add text indication for selected links on screen readers
 * #222 Social buttons are not accessible
 * #221 General Contrast issues
 * #218 Check ids and headers of Cycle Table
 * #217 Timeline Color contrast accessibility
 * #215 Page navigation list element accessibility
 * #211 Enhance Breadcrumb accessibility
 * #210 Use an HTML5 accessible player in timeline.js
 * #185 Page Navigation List - Wrong behavior
 * #224 Indicate open status

* 2.1.7 HOTFIX (2014-09-10)
 * Update Gemfile and gulp-hologram

* 2.1.6 (2014-09-10)
 * #229 remove build files from repo
 * #230 remove TimelineJS from project
 * #216 process navigation - active state should be more visible accessibility
 * #231 Cleanup branches
 * #228 Focus Element does not change automatically enhancement
 * #219 Check accessibility of data-table accessibility
 * #213 Carousel navigation accessibiltiy accessibility
 * #209 Remove <br> in global nav links accessibility
 * #207 Add accesskeys accessibility
 * #206 Input number too small (browser issue) Not valid ? accessibility
 * #189 Text about browser compatibility should be updated enhancement
 * #187 Shouldn't the magnifying glass initiate a search? Function is missing bug
 * #177 Carousel wrong styling
 * #172 Alignement of titles

* 2.1.5 (2014-09-01)
 * #182 Fix print stuff
 * #198 Add title to brand link for accessibility
 * #199 Add title to empty link
 * #200 Add button insted of meanless span for site search field
 * #202 add `<fieldset>` and `<legend class="hidden">` around `.form-group`
 * #203 add ARIA roles on form error
 * #204 review form accessibility with label and help text
 * #207 add access nav with accesskeys
 * #209 remove useless br tag
 * #211 Fix breadcrumb accessibility
 * #219 tables fit to accessbility standards
 * #224 add Paypal access plugin and fix all collapse elements
 * #225 add `aria-selected="true"`for active navigation`
 * #183 navigation list text overflow fix demonstrate in exemple page

* 2.1.4 (2014-07-24)
 * #190 Fix IE8 compatibility
 * #175 add site-map toggle for collapse on tablet fix
 * #186 add search box to page without navigation fix
 * #183 navigation list text overflow fix
 * #188 Focus teaser - missing lines in tablet/smartphone format

* 2.1.3 (2014-06-19)
 * #158 Search bar on XS - width should be less
 * #160 fix responsive navigation paradigm
 * #167 fix typo in main navigation mobile
 * #168 removed vertical scrollbar
 * #164 #163 #165 fix detail page
 * #150 fix links in footer mobile
 * #126 add favicons
 * #161 fix links hover to underline
 * #174 Tab caroussel text too long in the caption

* 2.1.2 (2014-06-17)
 * #109 Several Examples Checkboxes and radiobuttons missing
 * #125 add highlight on current menu item [**! Markup changes**](http://adminch.antistatique.net/navigation_modules_-_hierarchical_navigation.html#a-globalnavigation)
 * #134 Accessibility - WCAG 1.3.1 Heading, there are no invisible headings anymore
 * #127 Hover changes the "inlining" of the text bug
 * #107 General Issue Resposiveness Phone-Landscape/Portrait does not work as original enhancement
 * #106 Navigation bar to high enhancement
 * #105 Select (List) examples missing enhancement Styleguide
 * #145 Accessibility WCAG 2.4.7 Focus in elements is not visible
 * #107 Revert small font size on mobile see ticket for more informations
 * #140 add lang="en" to html tag
 * #141 add missing alt tags in some img
 * #144 add missing labels to selects and inputs for screen readers
 * #126 add favicon
 * #124 fix social plugin
 * #101 #102 fix tabbing issues
 * #155 fix pagination and breadcrumb on page results
 * #154 fix search box button size on mobile
 * #114 change look of phone link on mobile
 * #152 fix emergency banner red band width
 * #153 fix typo weight on news feed elements and other elements
 * #148 fix logo size on mobile on navbar
 * #158 remove .pull-left class from search form
 * #159 fix container not closed on forms.html
 * #150 fix footer mobile
 * #107 fix font sizes

* 2.1.1 (2014-06-06)
 * #70 add german LICENSE file to fonts folder
 * wrapped `.well` element  `.bordered-well` div [**! Markup changes**](http://adminch.antistatique.net/content_modules_-_teaser.html#f-person-teaser)
 * #98 fixed some responsive columns size in example page
 * #72 remove lang selection via dropdown list
 * #73 replace text in language selection list
 * #70 add LICENSE file to fonts folder
 * #93 remove gradient on global nav IE9
 * #93 fix treecrumb border
 * #97 add drilldown plugin to all sub-pages-lists
 * update Timeline.js
 * fix general responsive issues
 * #69 remove overlay on navigation
 * #104 fix logo size
 * remove print button on mobile
 * #111 rename dropdown-box to collapsible-panel
 * #113 remove page name from footer on mobile
 * #120 fix padding on top of images homepage
 * #119 remove margin below images in focus element
 * #110 add background example to styleguide
 * #106 fix main navigation height


* 2.1.0 (2014-06-03)
 * #52 fix side navigation
 * #52 fix breadcrumb
 * #52 #37 fix nav-lang and nav-services
 * #52 #49 revert fonts to original files
 * #55 add more list-items to news-feed
 * #52 fix focus element
 * #52 fix footer sitemap links [**! Markup changes**](http://adminch.antistatique.net/navigation_modules_-_footer.html#a-site-map)
 * #44 fix search field label vertical alignment
 * #45 fix search field and themes select position
 * #54 fix overlay not showing in example pages
 * #48 fix services navigation responsive placement
 * #48 update header to make it responsive until xs size
 * fix global navigation to display more elements without problems
 * #53 update global navigation to support mobile view [**! Markup changes**](http://adminch.antistatique.net/navigation_modules_-_hierarchical_navigation.html#a-globalnavigation)
 * add `.list-emphasis` class to `.nav-page-list`
 * add drilldown plugin to handle `.nav-page-list` sub-navigation animations [**! Markup changes**](http://adminch.antistatique.net/navigation_modules_-_hierarchical_navigation.html#a-globalnavigation)
 * fix viewport issue on Windows Phone
 * fix svg fallbacks and svg issues on IE
 * fix social links in footer on mobile [**! Markup changes**](http://adminch.antistatique.net/navigation_modules_-_footer.html#b-social-media)
 * #80 #81 #82 #83 #84 fix accessibility issues with colors
 * #85 fix issue with checkbox alignment in inline forms
 * #26 remove all cortana prefixes
 * #53 fix mobile tables scroll
 * #86 fix focus element with nopadding on medium size
 * #87 fix global navigation behaviour
 * #88 fix SVG issues in logo
 * #89 fix languages menu on mobile


* 2.0.1 (2014-05-21)
 * Update README.md file
 * #35 update README with feedback for windows 7 installation
 * #57 add link to download file in styleguide header
 * #36 provide non-minified CSS assets and add `.min` suffix on minified ones
 * #32 fix News Feed paddings and border. [**! Markup changes**](http://adminch.antistatique.net/content_modules_-_teaser.html#b-news)


* 2.0.0 (2014-05-20)
 * #50 Main navigation working on IE9
 * #43 Admin logo cut off
 * #42 Social button
 * #40 Missing exemple page
