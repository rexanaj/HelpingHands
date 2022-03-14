require('../../firebase/firebase') // Initialises the database
const firebaseAdmin = require('firebase-admin');

const db = firebaseAdmin.firestore();
const getArticleExample = async (req, res) => {
    const cityRef = await db.collection('articles').doc('article1');
    const doc = await cityRef.get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        res.send(doc.data());
    }
};


module.exports = { getArticleExample };
