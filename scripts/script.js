$(document).ready(function(){
    
    // hide .navbar first
    $(".navbar-brand").hide();
    $('[data-toggle="tooltip"]').tooltip()

    // fade in .navbar

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar-brand').fadeIn(200);
            $('#return-to-top').fadeIn(200)
        } else {
            $('.navbar-brand').fadeOut(200);
             $('#return-to-top').fadeOut(200);
        }
    });
    
    textFit($('.display-3')[0]);
    
   
    $('#return-to-top').click(function() {      // When arrow is clicked
        $('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
    });
    
    function showVideo(){
        $("#myModal").modal("show");
    }
    
    $("#intern").hide();
    
    $("#moreexp").click(function() {        
        $("#moreexp").text($("#intern").is(":visible") ? "Load more experiences" : "Show less");
        $("#intern").slideToggle(500);
    });
    
    $(".navbar-nav a").smoothScroll();
});
