/**
 * Created by orangepek0e on 15-11-14.
 */
<script>
var dataRef = new Firebase('https://redspace-hackathon.firebaseio.com/');
var userName = '';
var userScore = '';
var authModal = $('#auth-modal').modal({show: false});

function logIn(){
    console.log("you are trying to log in");

    dataRef.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    });
}

</script>