jQuery(document).ready(function(){	
onloadmethod();	


    jQuery('[data-fancybox="client_gallery"]').fancybox({
        buttons: [
        "slideShow",
        "thumbs",
        "zoom",
        "fullScreen",
        "share",
        "close"
        ],
        loop: false,
        protect: true
    });

    jQuery(".homepage-banner-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 7000,
        items: 1,
    });

        



    jQuery(".match-carousel").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{ items:1, nav: false, },
            600:{ items:2 , nav: true,},
            1000:{ items:3 },
            1200:{ items:4 }
        }
    });

    
    jQuery(".match-highlights-carousel").owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{ items:1, nav: false, },
            600:{ items:2 , nav: true,},
            1000:{ items:3 }
        }
    });


    jQuery(".sponsors-carousel").owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{ items:2 },
            600:{ items:3 },
            1000:{ items:4 },
            1200:{ items:5 }
        }
    });



    jQuery(".testimonial-carousel").owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{ items:1, nav: false, },
            600:{ items:1 , nav: true,},
            1000:{ items:2 },
            1200:{ items:3 }
        }
    });


    
    jQuery(".state-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive:{
            0:{ items:2, nav: false, },
            600:{ items:3 , nav: true,},
            1000:{ items:4 },
            1200:{ items:5 }
        }
    });





    jQuery('#pills-tab button[data-bs-toggle="pill"]').on('shown.bs.tab', function () {
        jQuery(".match-carousel").trigger('refresh.owl.carousel');
    });

    jQuery("#new-prev").click(function () {
        jQuery(".match-carousel").trigger("prev.owl.carousel");
    });

    jQuery("#new-next").click(function () {
        jQuery(".match-carousel").trigger("next.owl.carousel");
    });


    
    jQuery("#mh-prev").click(function () {
        jQuery(".match-highlights-carousel").trigger("prev.owl.carousel");
    });

    jQuery("#mh-next").click(function () {
        jQuery(".match-highlights-carousel").trigger("next.owl.carousel");
    });



});



jQuery(window).resize(function(){	
	onloadmethod();	  
});

function onloadmethod(){	
	var fullwidth = jQuery('.fullwidth').width();
	jQuery('.fullwidth').css('left', -fullwidth/2)
}


AOS.init();




