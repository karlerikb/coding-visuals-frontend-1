const database = firebase.database();

const courses = firebase.database().ref('courses/');
const chapters = firebase.database().ref('chapters/');

courses.on('value', snapshot => {
    console.log(snapshot.val());
});

chapters.on('value', snapshot => {
    console.log(snapshot.val());
});
