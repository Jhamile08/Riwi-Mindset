const btnConfirmar = document.getElementById('btnConfirmar');
const btnConfirmarTeacher = document.getElementById('btnConfirmarTeacher');

btnConfirmar.addEventListener("click", botonConfirmar)
btnConfirmarTeacher.addEventListener("click", botonConfirmarTeacher)

function botonConfirmar(){
    Swal.fire({
       icon: "success",
       type: "success",
       title: "Registrado correctamente"
      });
}

function botonConfirmarTeacher(){
    Swal.fire({
       type: "success",
       title: "Registrado correctamente"
      });
}

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