var global_user;

function scrollto(){
}

function showinfo(){

            const highscoresRef = db.collection('highscores');
            /*
            highscoresRef.get()
                .then(snapshot => {
                    console.log('count snapshot',snapshot);
                    snapshot.forEach(doc => {
                        //console.log('highscores', doc.id, '=>', doc.data());
                        const user = doc.data();
                        document.getElementById('leaderboard').innerHTML='highscore: <div class="highlight">' + user.score + '</div> ' + user.email;

                
                    });
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                    // create
                });
            */
            highscoresRef.onSnapshot(
                snapshot => {
                    console.log('count snapshot',snapshot);
                    snapshot.forEach(doc => {
                        //console.log('highscores', doc.id, '=>', doc.data());
                        const user = doc.data();
                        //document.getElementById('leaderboard').textContent='highscore: ' + user.score + ' ' + user.email;
                        document.getElementById('leaderboard').innerHTML='highscore: <div class="highlight">' + user.score + '</div> ' + user.email;

                
                    });
                },
                err => {
                    console.log('Error getting documents', err);
                    // create
                }
                );

            const scoresRef = db.collection('scores').doc(global_user.uid).collection('list').orderBy('timestamp','desc').limit(10);
            scoresRef.onSnapshot(
                snapshot => {
                    console.log('count snapshot',snapshot);
                    let str='<div class="highlight2">your history: </div>';
                    snapshot.forEach(doc => {
                        //console.log('highscores', doc.id, '=>', doc.data());
                        const user = doc.data();
                        const datetime = new Date(user.timestamp.seconds*1000) ;
                        str += datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString()  + ': <div class="highlight">' + user.score + '</div> | ';
                        //document.getElementById('history').textContent=JSON.stringify( user );

                
                    });
                        document.getElementById('history').innerHTML=str;
                },
                err => {
                    console.log('Error getting documents', err);
                    // create
                }
                );

            const highscoreshistoryRef = db.collection('highscoreshistory').orderBy('timestamp','desc').limit(10);
            highscoreshistoryRef.onSnapshot(
                snapshot => {
                    console.log('count snapshot',snapshot);
                    let str='<div class="highlight2">all time high scores history: </div>';
                    snapshot.forEach(doc => {
                        //console.log('highscores', doc.id, '=>', doc.data());
                        const user = doc.data();
                        const datetime = new Date(user.timestamp.seconds*1000) ;
                        str += user.email + ' ' + datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString()  + ': <div class="highlight">' + user.score + '</div> | ';
                        //document.getElementById('history').textContent=JSON.stringify( user );

                
                    });
                        document.getElementById('alltimehistory').innerHTML=str;
                },
                err => {
                    console.log('Error getting documents', err);
                    // create
                }
                );
}

function toggleSignIn() {
        //console.log('debug', firebase.auth());
        //console.log('debug', firebase.auth().currentUser);
        //if (!firebase.auth().currentUser) {
        firebase.auth().onAuthStateChanged(function(user) {
            global_user=user;
                    if (!user) {
                        // [START createprovider]
                        var provider = new firebase.auth.GoogleAuthProvider();
                        // [END createprovider]
                        // [START addscopes]
                        provider.addScope('https://www.googleapis.com/auth/plus.login');
                        // [END addscopes]
                        // [START signin]
                        firebase.auth().signInWithRedirect(provider)
                            .catch(function(error) {
                                // Handle Errors here.
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                // The email of the user's account used.
                                var email = error.email;
                                // The firebase.auth.AuthCredential type that was used.
                                var credential = error.credential;
                                // ...
                                console.log('issue', error);
                            });
                        // [END signin]
                    } else {
                        // [START signout]
                        //firebase.auth().signOut();
                        // [END signout]
                        document.getElementById('person').textContent=user.email;
                        showinfo();
                    }
                });
                // [START_EXCLUDE]
                //document.getElementById('quickstart-sign-in').disabled = true;
                // [END_EXCLUDE]
            }
            // [END buttoncallback]

window.onload = function() {
    toggleSignIn();
    //alert(document.location.hash);
    scrollto();
};
