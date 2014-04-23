(function($) {
  $(document).ready(function() {
    // Init stick inside nav
    if( $(window).width() > 1280 ) {
      $("#cortana-inside-nav").stick_in_parent()
        .on("sticky_kit:bottom", function() {
          console.log('toggle bottom');
          $(this).addClass("cortana-stick-bottom");
        })
        .on("sticky_kit:unbottom", function() {
          console.log('toggle bottom');
          $(this).removeClass("cortana-stick-bottom");
        });
    }

    // Remove stick feature below 1280px
    $( window ).resize(function() {
      if( $(window).width() > 1280 ) {
        $("#cortana-inside-nav").stick_in_parent()
        .on("sticky_kit:bottom", function() {
          console.log('toggle bottom');
          $(this).addClass("cortana-stick-bottom");
        })
        .on("sticky_kit:unbottom", function() {
          console.log('toggle bottom');
          $(this).removeClass("cortana-stick-bottom");
        });
      }else {
        $("#cortana-inside-nav").trigger("sticky_kit:detach");
        console.log('unstick');
      }
    });

    // Scroll To position
    $('#cortana-inside-nav').find('a').click(function(event){
      event.preventDefault();
      $target = $(this).attr('href');
      $('#cortana-inside-nav').find('a').removeClass('active');
      $(this).addClass('active');
      $('html, body').animate({
          scrollTop: $($target).offset().top - 100
      }, 800);
    });
  });
}) (jQuery);
/*global  jQuery */

(function($) {
  $(document).ready(function() {
    var cortanaSlidebars = new $.slidebars();
    // $(window).load(function () {
    //   cortanaSlidebars.open('left');
    // });
    $('#open-left').on('click', function(event) {
      event.preventDefault();
      cortanaSlidebars.toggle('left');
    });

  });
}) (jQuery);
/*global  jQuery */

(function($) {
  $(document).ready(function() {
    // Add wrapper to all styleguide content
    $("p, h1, h2, h3, h4, h5, h6, table").not(".cortana-header h1, .codeExample p, .codeExample table, .codeExample h1, .codeExample h2, .codeExample h3, .codeExample h4, .codeExample h5, .codeExample h6").wrap('<div class="cortana-content"></div>');
  });
}) (jQuery);
/*global  jQuery */
