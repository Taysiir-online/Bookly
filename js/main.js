// check if user is login or not.
const islogin = () => {
    const User = JSON.parse(localStorage.getItem("User"));
    if (User) {
        return {
            login: true,
        }
    } else {
        return {
            login: false,
        }
    }
}


// logout function
const logout = (logout) => {
    if(islogin().login === true){
        logout.addEventListener("click", () =>{
            localStorage.removeItem("User");
            window.location.href = "login.html";
        });
    }else {
        logout.style.display = "none";
    }
       
    
}


// Exports
export { islogin, logout };