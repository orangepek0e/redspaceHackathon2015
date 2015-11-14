
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

//function logIn(){
//    console.log("you are trying to log in");
//
//    dataRef.authWithOAuthPopup("twitter", function(error, authData) {
//        if (error) {
//            console.log("Login Failed!", error);
//        } else {
//            console.log("Authenticated successfully with payload:", authData);
//        }
//    });
//}

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

