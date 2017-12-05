$(document).ready(function(){
      
    new TypeIt('#tagline', {
         strings: ["Coffee. Innovate. Develop. Repeat."],
         speed: 150,
         breakLines: false,
         autoStart: true,
         loop: false,
          cursor: false
    });

    // hide .navbar first
    $(".navbar-brand").hide();
    $('[data-toggle="tooltip"]').tooltip()

    // fade in .navbar

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.navbar-brand').fadeIn(200);
            $('#return-to-top').fadeIn(200)
        } else {
            $('.navbar-brand').fadeOut(200);
             $('#return-to-top').fadeOut(200);
        }
    });
    
    
   
    $('#return-to-top').click(function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });
    
    function showVideo(){
        $("#myModal").modal("show");
    }
    
    $('div.navbar-nav').find('a').click(function(){
        var $href = $(this).attr('href');
        var $anchor = $('#'+$href).offset();
        window.scrollTo($anchor.left,$anchor.top);
        return false;
    });
});


