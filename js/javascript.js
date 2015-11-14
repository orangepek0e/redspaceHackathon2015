
var myDataRef = new Firebase('https://redspace-hackathon.firebaseio.com/');
var userName = '';
var userScore = '';
var authData = myDataRef.getAuth();

console.log("aut:" + authData);
if (authData){
    userId = authData.uid;
    setUserNodeId();
    userName = authData[authData.provider].displayName;
    console.log('user is already logged in');
    //$('#loginScreen').hide();
    //$('#notificationScreen').show();

}

// function authDataCallback(authData) {
//     if (authData) {
//         console.log("User " + authData.uid + " is logged in with " + authData.provider);


//     } else {
//         console.log("User is logged out");
//     }
// }

// myDataRef.onAuth(authDataCallback);

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
                $('#loginScreen').toggle();
                $('#notificationScreen').toggle();
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

function logout() {
    console.log("logging out")
    myDataRef.unauth();
    name = "";
    id = "";
    location.reload();
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

        // display.textContent = minutes + ":" + seconds;

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

function uploadPhoto() {
    var srcData;
    var file = document.getElementById('photoUpload').files[0];
    var filesSelected = document.getElementById("photoUpload").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            srcData = fileLoadedEvent.target.result; // <--- data: base64
            console.log(srcData + "1");
            var newImage = document.createElement('img');
            newImage.src = srcData;

            if(file){
                myDataRef.child('photos').push({photo:srcData});
            }

        }
        fileReader.readAsDataURL(fileToLoad);

    }

}


}