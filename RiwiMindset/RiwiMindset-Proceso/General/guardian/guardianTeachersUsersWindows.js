(()=>{
    const company = localStorage.getItem("teacher");

    if (!company){
        window.location.href = "../../../General/indexLogin.html"
    }
}
)();