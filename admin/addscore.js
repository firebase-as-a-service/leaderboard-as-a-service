
var admin = require("firebase-admin");

//var serviceAccount = require("./leaderboard-gcp-1-firebase-adminsdk-wm0mu-12df02a1ed.json");
var serviceAccount = require("./MUST-GET-SECURITY-FILE-FROM-SERVICE-ADMINISTRATOR.json");
// contact ralph@tidalforce.org for more information

admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://leaderboard-gcp-1.firebaseio.com"
});

var db = admin.firestore();  

function getusers(){
db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let user=doc.data();
        user.uid=doc.id;
        addscore(user,10);
        return;
    });
});
}
function addscore(user,value){
    const userDoc = {
                'email' : user.email, 
                'score' : value,
                'timestamp': admin.firestore.FieldValue.serverTimestamp(),
               'displayName' : user.displayName}
    db.collection('scores').doc(user.uid)
        // subcollection for archive
        .collection('list').doc(String(Date.now()))
    .set(userDoc).then(writeResult => {
        console.log('Score Created result:', writeResult);
        return;
    }).catch(err => {
       console.log(err);
       return;
    });
}
getusers();
