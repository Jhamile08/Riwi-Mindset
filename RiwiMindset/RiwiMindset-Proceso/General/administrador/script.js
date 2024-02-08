let profilePicEstudents = document.getElementById("profilePictureEstudents");
let inputFileEstudents = document.getElementById("inputFileEstudents");
let profilePicTeachers = document.getElementById("profilePictureTeachers");
let inputFileTeachers = document.getElementById("inputFileTeachers")

inputFileEstudents.onchange = function(){
    profilePicEstudents.src = URL.createObjectURL(inputFileEstudents.files[0]);
}

inputFileTeachers.onchange = function(){
    profilePicTeachers.src = URL.createObjectURL(inputFileTeachers.files[0]);
}
