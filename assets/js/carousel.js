/* ==========================================================
 * carousel.js
 * Carousel helper
 *
 * Author: Yann, yann@antistatique.net
 * Date:   2014-05-15 13:55:53
 *
 * Copyright 2014 Federal Chancellery of Switzerland
 * Licensed under MIT
 ========================================================== */

(function($) {

  $(window).load(function () {
    carouselInit(jQuery);
  });

  $(window).resize(function () {
    carouselInit(jQuery);
  });

  // slideshow counter
  var slideshow_total = $('.carousel-slideshow .item').length;
  $('#carousel-total').text(slideshow_total);

  $('.carousel-slideshow').on('slid.bs.carousel', function () {

    var carouselData = $(this).data('bs.carousel');
    var currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));
    var total = carouselData.$items.length;

    var text = (currentIndex + 1);

    $('#carousel-index').text(text);
    $('#carousel-total').text(total);
  });

}) (jQuery);

function carouselInit ($) {
  var $carousel = $('.carousel:not(.carousel-slideshow)');
  if($carousel) {
    $carousel.each(function () {
      var biggestHeight = 0,
          titleHeight = $(this).find('h3:first-child').height(),
          imgHeight = $(this).find('.carousel-img').height();

      $(this).find('.carousel-indicators').css('top', titleHeight + imgHeight + 40);
      $(this).find('.carousel-control').css('top', titleHeight + imgHeight + 50);

      $(this).find('.item').each(function () {
        if ($(this).height() >= biggestHeight) {
          biggestHeight = $(this).height();
        }
      });
      $(this).find('.item').height(biggestHeight);
    });
  }
}