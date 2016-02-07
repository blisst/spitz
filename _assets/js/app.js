//New stuff
function fitSlider() {
  if (!$('.flexslider').length) {
    return false;
  }
  var windowHeight = $(window).height();
  var flexBottom = $('.flexslider').offset().top+$('.flexslider').height();
  var heightChange = (flexBottom - windowHeight + 11 );
  var newHeight = $('.flexslider').height() - heightChange;
  if (flexBottom > windowHeight) {
    $('.flexslider').height(newHeight);
    $('#mainContent .flexslider .slides img:not(.focusTop)').css('top',-heightChange/2);
  }
  else {
    $('.flexslider').css('height','');
    $('#mainContent .flexslider .slides img:not(.focusTop)').css('top','');
    
  }
  if ($('.col-golden-lg, .col-golden-sm').length) {
    $(window).width() < 959 ? $('.col-golden-lg').insertBefore('.col-golden-sm') : $('.col-golden-sm').insertBefore('.col-golden-lg');
  }

}
 function fitImage() {
    if (!$('.fitImage').length) {
      return false; 
    }
    if (!$(window).width() > 959) {
      return false;
    }
    var image = $('.fitImage');
    var windowHeight = $(window).height();
    var imageBottom = image.offset().top+image.height();
    if (imageBottom > windowHeight) {
      image.height(image.height() - (imageBottom - windowHeight + 20 ));
      image.css('width','100%');
    }
    else {
      image.css('height','');
      image.css('width','');
    }
  }


$(window).load(function() {

  if (!$('.flexslider').length) {
    return false;
  }
  $('.flexslider').flexslider({
      // Options here : https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
      directionNav: false,
      slideshowSpeed: 3000,

      //Lazy load everything but first two images
      touch: true,
      initDelay: 0,
      start: function(slider) { // Fires when the slider loads the first slide
        var slide_count = slider.count - 1;

        $(slider)
          .find('img.lazy:eq(0)')
          .each(function() {
            var src = $(this).attr('data-src');
            $(this).attr('src', src).removeAttr('data-src');
          });
      },
      before: function(slider) { // Fires asynchronously with each slider animation
        var slides     = slider.slides,
            index      = slider.animatingTo,
            $slide     = $(slides[index]),
            $img       = $slide.find('img[data-src]'),
            current    = index,
            nxt_slide  = current + 1,
            prev_slide = current - 1;

        $slide
          .parent()
          .find('img.lazy:eq(' + current + '), img.lazy:eq(' + prev_slide + '), img.lazy:eq(' + nxt_slide + ')')
          .each(function() {
            var src = $(this).attr('data-src');
            $(this).attr('src', src).removeAttr('data-src');
          });
      }
    });
  $('.flexslider-mobile').flexslider({
      // Options here : https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
      directionNav: false,
      slideshowSpeed: 3000,
      controlNav:false,

      //Lazy load everything but first two images
      touch: true,
      initDelay: 0,
      start: function(slider) { // Fires when the slider loads the first slide
        var slide_count = slider.count - 1;

        $(slider)
          .find('img.lazy:eq(0)')
          .each(function() {
            var src = $(this).attr('data-src');
            $(this).attr('src', src).removeAttr('data-src');
          });
      },
      before: function(slider) { // Fires asynchronously with each slider animation
        var slides     = slider.slides,
            index      = slider.animatingTo,
            $slide     = $(slides[index]),
            $img       = $slide.find('img[data-src]'),
            current    = index,
            nxt_slide  = current + 1,
            prev_slide = current - 1;

        $slide
          .parent()
          .find('img.lazy:eq(' + current + '), img.lazy:eq(' + prev_slide + '), img.lazy:eq(' + nxt_slide + ')')
          .each(function() {
            var src = $(this).attr('data-src');
            $(this).attr('src', src).removeAttr('data-src');
          });
      }
    });

 fitSlider();
});
$(window).load(fitImage);
$(window).resize(fitImage);
$(window).resize(fitSlider);


// Opening and closing menus
$(document).ready(function() {


  var openMenu = function(e) {
    e.preventDefault();
    var menu = $(this).siblings('ul');
    if (menu.is(':visible')) {
      menu.removeClass('opened');
    }
    else {
      $('ul li.subMenu ul').removeClass('opened');
      menu.addClass('opened');
    }
  }

  var closeMenus = function(e) {
    var menuParent = $('ul li.subMenu ul.opened').parent();
    var menuChildren = $('ul li.subMenu ul.opened').parent().find('*');
    var menu = menuParent.add(menuChildren);
    if (!menu.has(e.target).length) {
      $('ul li.subMenu ul').removeClass('opened');
    }
  }


  $("ul li.subMenu > a").tap(openMenu);
  $(document).tap(closeMenus);


 



});
