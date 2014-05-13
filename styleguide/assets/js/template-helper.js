(function($) {
  $(document).ready(function() {
    // Add wrapper to all styleguide content
    // $("p, h1, h2, h3, h4, h5, h6, table, ul, ol, dl, blockquote, q").not(".cortana-header h1, .codeExample p, .codeExample table, .codeExample h1, .codeExample h2, .codeExample h3, .codeExample h4, .codeExample h5, .codeExample h6, .codeExample ul, .codeExample dl, .codeExample ol, .codeExample blockquote, .codeExample q, blockquote p, q p").wrap('<div class="cortana-content"></div>');
    $('table').not('.codeExample table').addClass('table').addClass('table-bordered').css('margin-top', '20px');
  });
}) (jQuery_no_conflict);
/*global  jQuery */
