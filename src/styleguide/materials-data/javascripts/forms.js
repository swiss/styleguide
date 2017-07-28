// Code duplicated in footer to make the datepicker work in the styleguide
// Load Pikaday on date fields
if ($(window).width() > 767) {

  $('[type=date]').each(function(){
    // We need to change to type text to be able to write in another format
    // Just uncomment the following line:
    // $(this).prop('type', 'text');

    var picker = new Pikaday({
      field: $(this)[0],
      format: 'YYYY-MM-DD', // must be a input[type=text] to change this, see above
      firstDay: 1, // sets monday as first day
      theme: 'admin-theme',
      i18n: {
        previousMonth : 'Previous Month',
        nextMonth     : 'Next Month',
        months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
        weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
      }
    });
  });

}
