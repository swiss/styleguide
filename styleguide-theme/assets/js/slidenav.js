(function($) {
  $(window).load(function() {
    var cortanaSlidebars = new $.slidebars();
    // $(window).load(function () {
    //   cortanaSlidebars.open('left');
    // });
    $('#open-left').on('click', function(event) {
      event.preventDefault();
      cortanaSlidebars.toggle('left');
    });

  });
}) (jQuery_no_conflict);
