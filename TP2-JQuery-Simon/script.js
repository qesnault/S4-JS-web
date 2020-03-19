$(document).ready(function () {
    //Jeu
    $('.back').css("width", "500");
    $('.back').css("height", "500");
    $('.back').css("border", "10px solid #333");
    $('.back').css("border-radius", "50%");
    $('.back').css("position", "relative");
    $('.back').css("background-color", "black");

    //Rond central
    $('.circle').css("height", "200");
    $('.circle').css("width", "200");
    $('.circle').css("background-color", "black");
    $('.circle').css("border-radius", "50%");
    $('.circle').css("z-index", "100");
    $('.circle').css("position", "absolute");
    $('.circle').css("cursor", "pointer");
    $('.circle').css("top", "150px");
    $('.circle').css("left", "150px");
    $('.circle').css("color", "white");
    $('.level').css("text-align", "center");
    $('.level').css("margin-top", "90px");
    $('.level').css("font-size", "20px");

    //carre de jeu
    $('.pad').css("width", "245px");
    $('.pad').css("height", "245px");
    $('.pad').css("float", "left");
    $('.pad').css("opacity", "0.6");

    //vert en haut à gauche
    $('.shape1').css("background-color", "green");
    $('.shape1').css("border-radius", "100% 0 0 0");

    //jaune en haut à droite
    $('.shape2').css("background-color", "yellow");
    $('.shape2').css("border-radius", "0 100% 0 0");
    $('.shape2').css("margin-left", "10px");

    //rouge en bas à gauche
    $('.shape3').css("background-color", "red");
    $('.shape3').css("border-radius", "0 0 0 100%");
    $('.shape3').css("margin-top", "10px");

    //bleu en bas à droite
    $('.shape4').css("background-color", "blue");
    $('.shape4').css("border-radius", "0 0 100% 0");
    $('.shape4').css("margin-top", "10px");
    $('.shape4').css("margin-left", "10px");

    //Quand on lance le jeu
    $('.circle').click(function () {
        startGame();
        $('.pad').css("cursor", "pointer");
        $('.shape1').click(function () {
            played(1);
        });
        $('.shape2').click(function () {
            played(2);
        });
        $('.shape3').click(function () {
            played(3);
        });
        $('.shape4').click(function () {
            played(4);
        });
    })
});

var level = 0;
var delay = 700;
var pattern = [];
var playedPattern = [];
var numberPlayed = 0;

function startGame() {
    $('.level').text("Level " + level);
    fillPattern();
    for (var i = 0; i < pattern.length; i++) {
        window.setTimeout("play(pattern[" + i + "])", 200 + i * delay);
    }
}

function fillPattern() {
    for (var i = 0; i < (level + 3); i++) {
        var randomInt = getRandomInt(4) + 1;
        pattern[i] = randomInt;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function setDelais() {
    for (var i = 0; i < pattern.length; i++) {
        play(pattern[i]);
    }
}

var play = function (clip) {
    $(".shape" + clip).stop().animate({
        opacity: "1"
    }, delay / 2, function () {
        $(".shape" + clip).stop().animate({
            opacity: "0.6"
        }, delay / 2, function () {});
        $('audio.sound' + clip)[0].play();
    });
};

function played(number) {
    playedPattern[numberPlayed] = number;
    play(number);
    if (playedPattern.length == pattern.length) {
        if (JSON.stringify(pattern) == JSON.stringify(playedPattern)) {
            level++;
            pattern = [];
            playedPattern = [];
            numberPlayed = 0;
            startGame();
            return;
        } else {
            for (var i = 1; i <= 4; i++) {
                play(i);
            }
            window.setTimeout(function () {
                level = 0;
                pattern = [];
                playedPattern = [];
                numberPlayed = 0;
                startGame();
                return;
            }, 1000);
        }
    }
    numberPlayed++;
}