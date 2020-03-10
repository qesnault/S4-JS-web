$(document).ready(function () {
    $('.title').css("color", "#203253");
    $('#sidebar h2').css("padding", "0");
    $("a:contains('Jack')").css("color", "orange");
    $('a:contains("Lire l\'article au complet")').css({
        "position": "absolute",
        "right": "10px",
    });
    $(':checkbox').prop("checked", true);
    $('#menu').find("ul").append("<li><a href=\"https://jquery.com\">JQUERY</a></li>");
    $('#sidebar').find("ul").append("<li><h2>JQuery</h2><p>jQuery is a fast javaScript Library</p></li>");
    $('#sidebar').find("ul").find("li:eq(1)").remove();
    $('#menu').find("ul").find("li").first().find("a").addClass("red");
    $('a:contains("Lire l\'article au complet")').text("Lire la suite...");
    var n = $('.post').length;
    for (var i = 0; i < n; i++) {
        $('.post:eq(' + i + ')').append(i + 1);
    }

    $('#sidebar ul li h2').click(function () {
        $(this).toggleClass('orange');
    });

    $('#menu ul li a').hover(function () {
        $(this).css("color", "green");
    }, function () {
        $(this).css("color", "white");
    });

    $('form').submit(function () {
        var emptyTextBoxes = $('input:text').filter(function () { return this.value == ""; });
        emptyTextBoxes.each(function () {
            $(this).addClass('error');
        });
    });
    
    $('.title').click(function(){
        $(this).nextAll().toggle("slow");
    });
});