$(document).ready(function () {
    var money = 0;
    var i = 0; //clickArr upgrade tracker
    var j = 0; //perSecArr upgrade tracker
    var audioURL = "sounds/button/";
    var audio = ["button-1.mp3", "button-2.mp3", "button-3.mp3", "button-4.mp3", "button-0.mp3"];
    var defaultMusic = true;
    var songIndex = 1;
    var control;
    var clickArr = [
        [0, 150],
        [1, 700],
        [2, 7500],
        [5, 0],
        ["maxed out", 0]
    ];
    var perSecArr = [
        [0, 100],
        [1, 1500],
        [5, 10000],
        [15, 0],
        ["maxed out", 0]
    ];

    function updateMoney(newMoney) {
        $('.money').text("Money: " + newMoney + "$");
    }

    function updatePerSecond() {
        $('.perSec').text("Per Second: " + perSecArr[j][0] + "$");
    }

    function updatePerClick() {
        $('.bonusPerClick').text("Per Click: " + clickArr[i][0] + "$");
    }

    function perSecond() {
        money += perSecArr[j][0];
        updateMoney(money);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }



    $('.getMoney').click(function (e) {
        e.preventDefault();
        money += 1 + clickArr[i][0];
        updateMoney(money);
        var x = e.clientX;
        var y = e.clientY;
        var spark = document.getElementById("spark");
        spark.style.display = '';
        spark.style.position = 'absolute';
        spark.style.left = x - getRandomInt(300) + 'px';
        spark.style.top = y + getRandomInt(150) + 'px';
        $('#spark').show().fadeOut(100);
        if (defaultMusic == true) {
            new Audio(audioURL + audio[getRandomInt(5)]).play();
        }
    });

    $('.upgrade').click(function (e) {
        e.preventDefault();
        $('.upgrades-menu').fadeToggle(1000);
    });

    $('#x').click(function () {
        $('.upgrades-menu').fadeOut(1000);;
    });

    $('.audio').click(function (e) {
        if (money >= 100) {
            money -= 100;
            updateMoney(money);
            defaultMusic = false;
            if (songIndex > 1) {
                control.pause();
                control.currentTime = 0;
            }
            control = document.createElement('audio');
            control.src = "sounds/song/" + getRandomInt(3) + ".mp3";
            control.volume = 0.1;
            control.play();
            songIndex++;
        } else {
            $('.error').show().fadeOut(3000);
        }
    });

    $('.perClick').click(function (e) {
        e.preventDefault();
        if (money >= clickArr[i][1] && i < 3) {
            money -= clickArr[i][1];
            updateMoney(money);
            i++;
            updatePerClick();
            if (i < 3) {
                $('.perClick').text("Upgrade Per Click => " + clickArr[i][1] + "$ for + " + clickArr[i + 1][0]);
            } else {
                $('.perClick').text("Maxed out");
            }
        } else {
            $('.error').show().fadeOut(3000);
        }
    });

    $('.perSecond').click(function (e) {
        e.preventDefault();
        if (money >= perSecArr[j][1] && j < 3) {
            money -= perSecArr[j][1];
            updateMoney(money);
            j++;
            if (j == 1) setInterval(perSecond, 1000);
            updatePerSecond();
            if (j < 3) {
                $('.perSecond').text("Upgrade Per Second => " + perSecArr[j][1] + "$ for + " + perSecArr[j + 1][0]);
            } else {
                $('.perSecond').text("Maxed out");
            }
        } else {
            $('.error').show().fadeOut(3000);
        }
    });
    $('.disable').click(function () {
        defaultMusic = !(defaultMusic);
        if (songIndex > 1 ) {
            control.pause();
        }
    });
});