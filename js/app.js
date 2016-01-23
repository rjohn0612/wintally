$(document).ready(function() {
    document.addEventListener('deviceready', onDeviceReady, false);

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
    alert("Working!");
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
            alert(x[0].innerHTML = p1.toUpperCase() + " IS THE WINNER");
            resetscore();
        }
        if (totalGames >= compare && winRatio1 < winRatio2) {
            alert(x[0].innerHTML = p2.toUpperCase() + " IS THE WINNER");
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