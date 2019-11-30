var db = firebase.firestore();  

function addscore(value){
    const userDoc = {
                'email' : global_user.email, 
                'score' : value,
                'timestamp': firebase.firestore.FieldValue.serverTimestamp(),
               'displayName' : global_user.displayName}
    db.collection('scores').doc(global_user.uid)
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

/*
function getscores(){
    orderBy("score", "desc").limit(5)
    db.collection('scores').doc(global_user.uid)
        .collection('list').doc(String(Date.now()))
    .set(userDoc).then(writeResult => {
        console.log('User Created result:', writeResult);
        return;
    }).catch(err => {
       console.log(err);
       return;
    });
}
*/
