$(document).ready(function() {
 /*   AppRate.preferences.storeAppURL.ios = 'com.phonegap.wintally';
    AppRate.preferences.storeAppURL.android = 'market://details?id=com.phonegap.wintally';
    AppRate.preferences.openStoreInApp = true;
    AppRate.preferences.displayAppName = 'Win Tally';
    AppRate.preferences.usesUntilPrompt = 5;
    AppRate.preferences.promptAgainForEachNewVersion = false;

    var customLocale = {en};
    customLocale.title = "Rate %@";
    customLocale.message = "If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!";
    customLocale.cancelButtonLabel = "No, Thanks";
    customLocale.laterButtonLabel = "Remind Me Later";
    customLocale.rateButtonLabel = "Rate It Now";
    AppRate.preferences.customLocale = customLocale; */

    var admobid = {};
        if( /(android)/i.test(navigator.userAgent) ) { 
            admobid = { // for Android
            banner: 'ca-app-pub-6258452148410362/7278630085',
            interstitial: 'ca-app-pub-6258452148410362/1995649287'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
            banner: 'ca-app-pub-6258452148410362/5603420483',
            interstitial: 'ca-app-pub-6258452148410362/9518916082'
            };
        } else {
            admobid = { // for Windows Phone
            banner: 'ca-app-pub-6258452148410362/8556886889',
            interstitial: 'ca-app-pub-6258452148410362/3472382483'
        };
    }   

function initApp() {
    if (AdMob) {
        AdMob.createBanner({
            adId : admobid.banner,
            position : AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow : true
        });
    }
}

document.addEventListener('deviceready', initApp, false);
    //document.addEventListener('deviceready', onDeviceReady, false);

    // Validation check for normal page
    $('#validate1').click(function (e) {
            var isValid = true;
            $('#gamer1,#gamer2,#gameName').each(function () {
                if ($.trim($(this).val()) == '') {
                    isValid = false;
                    $(this).css({
                        "border": "1px solid red",
                        "background": "#FFCECE"
                    });
                }
                else {
                    $(this).css({
                        "border": "",
                        "background": ""
                    });
                }
            });
            if (isValid == false)
                e.preventDefault();
        });

    // Validation check for fighting game page
    $('#validate2').click(function (e) {
            var isValid = true;
            $('#gamer1fgc,#gamer2fgc,#gameNamefgc,#char1,#char2').each(function () {
                if ($.trim($(this).val()) == '') {
                    isValid = false;
                    $(this).css({
                        "border": "1px solid red",
                        "background": "#FFCECE"
                    });
                }
                else {
                    $(this).css({
                        "border": "",
                        "background": ""
                    });
                }
            });
            if (isValid == false)
                e.preventDefault();
        }); 
});

function onDeviceReady() {
    
}

//All my global variables//
var youWin = 0;
var youLose = 0;
var totalGames = 0;
var winRatio1 = 0;
var winRatio2 = 0;
var myStreak = 0;
var opStreak = 0;
var myName = "";
var opName = "";
var nameOfGame = "";
var lsdb = JSON.parse(localStorage.getItem("sessionResults") || '{"sets":[]}');

// This function is called when you select the ' begin ' button //
function playing() {
    var x = document.getElementsByClassName("topMessage");
    x[0].innerHTML = "good";
    var y = document.getElementsByClassName("results");
    y[0].innerHTML = "--";
    var z = document.getElementsByClassName("lowMessage");
    z[0].innerHTML = "luck";
    document.getElementById("streak").innerHTML = ("winning streak: 0");
    document.getElementById("loss").innerHTML = ("losing streak: 0");
    document.getElementById("totalGames").innerHTML = ("Games Played: 0");
    document.getElementById("winLoss").innerHTML = ("Win: 0 - Loss: 0");
    document.getElementById("percentage").innerHTML = ("win ratio: ");
    document.getElementById("playing").innerHTML = "playing: " + gameName.value;
    myName = gamer1.value;
    opName = gamer2.value;
    nameOfGame = gameName.value;
    resetscore();
}

function playing2() {
    var x = document.getElementsByClassName("topMessage");
    x[0].innerHTML = "good";
    var y = document.getElementsByClassName("results");
    y[0].innerHTML = "--";
    var z = document.getElementsByClassName("lowMessage");
    z[0].innerHTML = "luck";
    document.getElementById("streak").innerHTML = ("winning streak: 0");
    document.getElementById("loss").innerHTML = ("losing streak: 0");
    document.getElementById("totalGames").innerHTML = ("Games Played: 0");
    document.getElementById("winLoss").innerHTML = ("Win: 0 - Loss: 0");
    document.getElementById("percentage").innerHTML = ("win ratio: ");
    document.getElementById("playing").innerHTML = "playing: " + gameNamefgc.value + " (" + char1.value + " vs " + char2.value + ") ";
    myName = gamer1fgc.value;
    opName = gamer2fgc.value;
    nameOfGame = gameNamefgc.value;
    resetscore();
}

//This function is called when either of the text input fields is selected//
function resetscore() {
    if (totalGames > 0) {
        saveSet();
    }
}

function saveSet(n1, ch1, w1, n2, ch2, w2, tg, gn, dt) {
        var setData = {};
        setData.n1 = myName;
        setData.ch1 = document.getElementById("char1").value
        setData.w1 = winRatio1;
        setData.n2 = opName;
        setData.ch2 = document.getElementById("char2").value
        setData.w2 = winRatio2;
        setData.tg = totalGames;
        setData.gn = nameOfGame;
        setData.dt = new Date().toLocaleDateString('en-US');
        lsdb.sets.push(setData);
        localStorage.setItem("sessionResults", JSON.stringify(lsdb));
        clearFields();
}
function clearFields() {
    youWin = 0;
    youLose = 0;
    totalGames = 0;
    winRatio1 = 0;
    winRatio2 = 0;
    myStreak = 0;
    opStreak = 0;
    document.getElementById("gamer1").value = "";
    document.getElementById("gamer2").value = "";
    document.getElementById("gameName").value = "";
    document.getElementById("gamer1fgc").value = "";
    document.getElementById("char1").value = "";
    document.getElementById("gamer2fgc").value = "";
    document.getElementById("char2").value = "";
    document.getElementById("gameNamefgc").value = "";
    //AppRate.promptForRating();
}

//This function is called when you select the winner button//
function winner() {
    youWin += 1;
    youLose = 0;
    totalGames += 1;
    winRatio1 += 1;
    var x = document.getElementsByClassName("topMessage");
    var y = document.getElementsByClassName("results");
    var z = document.getElementsByClassName("lowMessage");
    if (youWin == 1) {
    	x[0].innerHTML = myName;
    	y[0].innerHTML = youWin;
    	z[0].innerHTML = "WIN";
        document.getElementById("totalGames").innerHTML = " Games Played: " + totalGames;
        calculate();
    } else {
    	x[0].innerHTML = myName;
    	y[0].innerHTML = youWin;
    	z[0].innerHTML = "WINS";
        document.getElementById("totalGames").innerHTML = " Games Played: " + totalGames;
        calculate();
    }
}

//This function is called when you select the lose button//
function loser() {
    youLose += 1;
    youWin = 0;
    totalGames += 1;
    winRatio2 += 1;
    var x = document.getElementsByClassName("topMessage");
    var y = document.getElementsByClassName("results");
    var z = document.getElementsByClassName("lowMessage");
    if (youLose == 1) {
    	x[0].innerHTML = opName;
    	y[0].innerHTML = youLose;
   		z[0].innerHTML = "WIN";
        document.getElementById("totalGames").innerHTML = " Games Played: " + totalGames;
        calculate();
    } else {
    	x[0].innerHTML = opName;
    	y[0].innerHTML = youLose;
    	z[0].innerHTML = "WINS";
        document.getElementById("totalGames").innerHTML = " Games Played: " + totalGames;
        calculate();
    }
}

//This function is called when either winner button being pressed//
function calculate() {
    /* These variable were used to display win / loss ratio percentages
    var winsP1 = winRatio1 / totalGames * (100);
    var winsP2 = winRatio2 / totalGames * (100);*/
    var winsP1 = winRatio1 / totalGames * (100);
    var x = myStreak;
    var y = opStreak;
    document.getElementById("winLoss").innerHTML = ("Win: " + winRatio1 + " - Loss: " + winRatio2);
    document.getElementById("percentage").innerHTML = ("win ratio: " + winsP1.toFixed(0) + "%");
    if (youWin >= x) {
        myStreak = youWin;
        document.getElementById("streak").innerHTML = ("winning streak: " + myStreak);

    } else {
        document.getElementById("streak").innerHTML = ("winning streak: " + x);
    }
    calculate2();
}

//This function is called when either winner button being pressed//
function calculate2() {
    var y = opStreak;
    if (youLose >= y) {
        opStreak = youLose;
        document.getElementById("loss").innerHTML = ("losing streak: " + opStreak);

    } else {
        document.getElementById("loss").innerHTML = ("losing streak: " + y);
    }
    sumItUp();
}

//This function checks to see if a FT has been selected and then declares a winner//
function sumItUp() {
	var x = document.getElementsByClassName("topMessage");
	var p1 = myName;
	var p2 = opName;
    var e = document.getElementById("first_two");
    var compare = e.options[e.selectedIndex].value;
    if (compare > 0) {
        if (totalGames >= compare && winRatio1 > winRatio2) {
            $('#popupDialog').popup("open");
            document.getElementById("setnumber").innerHTML = ("best of " + e.value);
            document.getElementById("whowon").innerHTML = (p1 + " IS THE WINNER");
            resetscore();
        }
        if (totalGames >= compare && winRatio1 < winRatio2) {
            $('#popupDialog').popup("open");
            document.getElementById("setnumber").innerHTML = ("best of " + e.value);
            document.getElementById("whowon").innerHTML = (p2 + " IS THE WINNER");
            resetscore();
        }
    }
}

function showSet() {
        var setData;
        var data = lsdb.sets.reverse();
        var txt = "";
        for (var i = 0, len = data.length; i < len; i++) {
            setData = data[i];
            txt += "<tr><th>"+"YOU"+"</th>"+"<th>"+"OPPONENT"+"</th>"+"<th>"+"WIN"+"</th>"+"<th>"+"LOSS"+"</th>"+"<th>"+"T. GAMES"+"</th>"+"<th>"+"RATIO"+"</th>"+"<th>"+"GAME PLAYED"+"</th>"+"<tr><td>"+setData.n1+"<br />"+setData.ch1+"</td>"+"<td>"+setData.n2+"<br />"+setData.ch2+"</td>"+"<td>"+setData.w1+"</td>"+"<td>"+setData.w2+"</td>"+"<td>"+setData.tg+"</td>"+"<td>"+(setData.w1 / setData.tg * (100)).toFixed(0)+"%"+"</td>"+"<td>"+setData.gn+"</td>";
        }
        document.getElementById("mystats").innerHTML = txt;
}

function clearstats() {
    localStorage.clear("sessionResults");
}