
var myDataRef = new Firebase('https://redspace-hackathon.firebaseio.com/');
var userName = '';
var userScore = '';
var authData = myDataRef.getAuth();

if (authData){
    userId = authData.uid;
    setUserNodeId();
    userName = authData[authData.provider].displayName;
    console.log('user is already logged in');
}


function logIn(provider) {
    myDataRef.authWithOAuthPopup(provider, function(error, authData) {
        if (error) {
            console.log("login Failed!", error);
        } else if (authData){
            console.log("Authenticated successfully with payload:", authData);
            userId = authData.uid;
            userName = authData[authData.provider].displayName;
            myDataRef.child('user').child(userId).once("value", function(snapshot) {
                var ifExists = snapshot.exists(); //a firebase function
                if (ifExists) {
                    console.log('user is already in the system');
                    data = snapshot.val();
                    for (key in data) {
                        userNodeId = key;
                        console.log('user node is 1 ' + userNodeId);
                    }
                } else {
                    myDataRef.child('user').child(userId).push({id:userId, name:userName, score:userScore});
                    setUserNodeId();
                }
            });
        }
    });
}

function setUserNodeId() {
    myDataRef.child('user').child(userId).once("value", function(snapshot) {
        data = snapshot.val();
        for (key in data) {
            userNodeId = key;
        }
    });
}

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {

        diff = duration - (((Date.now() - start) / 1000) | 0);


        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {

            start = Date.now() + 1000;
        }
    };

    timer();
    setInterval(timer, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};