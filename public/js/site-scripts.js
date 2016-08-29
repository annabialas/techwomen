$(function() {
    $('#send-btn').click(function(e) {
        e.preventDefault();
        $('#contact-form').submit();
    });

    // Modal Logic

    var $overlay = $('#overlay');

    $(".expert-modal").click(function() {
    	$(this).parent().find(".b-modal").addClass("m-active");
        $overlay.addClass('m-active');
    });

    $(".expert-close-modal").click(function() {
        $(".b-modal").removeClass("m-active");
        $overlay.removeClass('m-active');
    });
    
});

