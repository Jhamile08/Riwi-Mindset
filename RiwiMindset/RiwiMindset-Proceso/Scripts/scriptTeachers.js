document.getElementById('input').addEventListener('change',()=>{
    if(document.body.className.indexOf('dark')===-1){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark')
    }
})

const navbar = document.querySelector('.navbar')

document.getElementById('input').addEventListener('change',()=>{
    if(navbar.className.indexOf('dark')===-1){
        navbar.classList.add('dark');
    }else{
        navbar.classList.remove('dark')
    }
})

// Swipper cards users table registrers

