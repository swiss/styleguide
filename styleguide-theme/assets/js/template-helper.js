(function($) {
  $(document).ready(function() {
    $('table').not('.codeExample table').addClass('table').addClass('table-bordered').css('margin-top', '20px');

    var codeIndex = 0;
    $('.codeExample').each(function () {
      var $output = $('.exampleOutput'),
          $markup = $('.codeBlock');

      codeIndex += 1;
      $(this).find($output).append('<button type="button" class="show-code" data-toggle="collapse" data-target="#codeBlock-'+codeIndex+'">&lt;/&gt;</button>');
      $(this).find($markup).addClass('collapse').attr('id', 'codeBlock-'+codeIndex);
    });
  });
}) (jQuery_no_conflict);
/*global  jQuery */
