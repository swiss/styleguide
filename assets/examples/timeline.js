/* ==========================================================
 * timeline.scss
 * Styles for timeline
 *
 * Author: Simon Perdrisat, simon@antistatique.net
 * Date:   2014-04-28 17:17:40
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 =========================================================== */


/*doc
---
title: Timeline
name: b-timeline
category: Content Components > Widgets
---

The timeline is an interactive module with which the contents can be presented in the form of a chronological timeframe.

It is based on Knight Lab’s timeline.js Library.

Because this element is heavy, it's not loaded by default and you will have to include the library manually.

```html_example
 <div id="timeline-embed"></div>
 <script type="text/javascript">
 var timeline_config = {
 width:              '100%',
 height:             '600',
 css:                '/js/TimelineJS/css/timeline.css',     // PATH TO CSS
 js:                 '/js/TimelineJS/js//timeline-min.js',    // PATH TO JS
 source:             'https://docs.google.com/spreadsheet/pub?key=0AjrEl7i8pmEpdE8zWkliV2pjS2pYYlpqWG9ZcG5nSkE&output=html',
 embed_id:           'timeline-embed',               //OPTIONAL USE A DIFFERENT DIV ID FOR EMBED
 start_at_end:       false,                          //OPTIONAL START AT LATEST DATE
 start_at_slide:     '4',                            //OPTIONAL START AT SPECIFIC SLIDE
 start_zoom_adjust:  '3',                            //OPTIONAL TWEAK THE DEFAULT ZOOM LEVEL
 hash_bookmark:      true,                           //OPTIONAL LOCATION BAR HASHES
 font:               'Bevan-PotanoSans',             //OPTIONAL FONT
 debug:              true,                           //OPTIONAL DEBUG TO CONSOLE
 lang:               'fr',                           //OPTIONAL LANGUAGE
 maptype:            'watercolor'                   //OPTIONAL MAP STYLE

 }
 </script>
 <script type="text/javascript" src="/js/TimelineJS/js/storyjs-embed.js"></script>
```
*/


