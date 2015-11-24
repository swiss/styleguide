/* ==========================================================
 * social.js
 * Social Sharing Privacy
 *
 * Author: Toni Fisler, toni@antistatique.net
 * Date:   2014-05-19 16:47:40
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 =========================================================== */

/*doc
---
title: Social Sharing
name: b-social-sharing
category: Content Modules - Functions
---

<span class="label label-admin">FIX</span>

With the social sharing function, contents can be shared on social networks. In order to protect the privacy of the users, the function contains an activation mechanism. The user first has to activate the service before being able to share contents via his or her social network.

At the moment, Facebook, Twitter, and Google Plus are supported. Just add the correct [Open Graph](http://ogp.me/) meta tags to get the preview images and descriptions.

<br>
<div class="alert alert-warning">
 **2.1.1:**

 - added the `.social-sharing` class to the `#social-sharing` element
 **2.1.7**

 - <span class="label label-danger">DEPRECATED</span> The `<div class="social-sharing" id="social-sharing"></div>` is now deprecated. Please update with the new way to display social links.
</div>

```html_example
<div class="social-sharing">
 <a href="#" aria-label="Facebook"
   onclick="
     window.open(
       'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
       'facebook-share-dialog',
       'width=626,height=436');
     return false;">
    <img src="img/FB-f-Logo__blue_29.png" width="16px" height="16px" alt="Share on Facebook">
 </a>
 <a href="#" aria-label="Twitter"
   onclick="
     window.open(
       'http://twitter.com/share?text=You text here.&url='+encodeURIComponent(location.href),
       'facebook-share-dialog',
       'width=626,height=436');
     return false;">
   <img src="img/Twitter_logo_blue.png" width="16px" height="16px" alt="Share on Twitter">
 </a>
 <a href="#"
    onclick="
      window.open(
        'https://plus.google.com/share?url=encodeURIComponent(location.href)',
        '',
        'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      return false;">
    <img src="https://www.gstatic.com/images/icons/gplus-16.png" alt="Share on Google+"/></a>
</div>
```
*/

// DEPRECATED, to remove in 3.0.0
jQuery(function() {
  'use strict';

  var setme = {
    facebook : {
      'dummy_alt'         : 'Facebook "Like"-Dummy',
      'txt_info'          : 'Two clicks for more privacy: The Facebook Like button will be enabled once you click here. Activating the button already sends data to Facebook.',
      'txt_off'           : 'not connected to Facebook',
      'txt_on'            : 'connected to Facebook'
    },
    twitter : {
      'txt_info'          : 'Two clicks for more privacy: The Tweet this button will be enabled once you click here. Activating the button already sends data to Twitter.',
      'txt_off'           : 'not connected to Twitter',
      'txt_on'            : 'connected to Twitter'
    },
    gplus : {
      'txt_info'          : 'Two clicks for more privacy: The Google+ button will be enabled once you click here. Activating the button already sends data to Google.',
      'txt_off'           : 'not connected to Google+',
      'txt_on'            : 'connected to Google+'
    }
  };

  if(jQuery('#social-sharing').length > 0){
    jQuery('#social-sharing').socialSharePrivacy({
      css_path: '',
      services: setme
    });
  }

});
