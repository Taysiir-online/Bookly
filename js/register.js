const Password = document.getElementById("password");
const Confirm = document.getElementById("Confirm");
const form = document.querySelector("form");  
let P = document.querySelector("p.p"); 
                                                       



//    password check
Password.addEventListener("input", () => {
   let length = Password.value.length;

  if (length < 8) {
    P.textContent = "at least 8 characters";
    P.classList.add("active");
    Password.classList.add("Error");
  } else if (length >= 8){
    P.textContent = "";
    P.classList.remove("active");
    Password.classList.remove("Error");
   }
    
});

//    confirm check
Confirm.addEventListener("input", () => {
  if ( Confirm.value !== Password.value) {
    P.textContent = "Use same password";
    P.classList.add("active");
    Confirm.classList.add("Error");
  } else if (Confirm.value === Password.value){
    P.textContent = "";
    P.classList.remove("active");
    Confirm.classList.remove("Error");
   }
    
});

const logUser = localStorage.getItem("Users");
const Users = JSON.parse(logUser) || [];

// register form handling
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // get form data
    const formData = new FormData(form);
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPass = formData.get("confirmPass");

    // validation
    if (!fullName || !email || !password || !confirmPass) {
         alert("please fill in all required fields");
         return;

    }
        const CurrentUser = {
        fullName: fullName,
        email: email,
        password: password,
        confirmPass: confirmPass,
    };

    
     // check if user already exists
    const checkUser = () => {
        const check = Users.filter((user) => user.email === CurrentUser.email);
       return check.length < 1 ? false : true;
    } 
    if (checkUser() === true) {
       swal("This email is already exists!", "please use a different email!");
        return;
    }

       // get button form
    const bntsubmit = document.querySelector("button.btn");
    bntsubmit.innerHTML = `creating account...`;

    // save user to local storage
    setTimeout(() => {
        Users.push(CurrentUser);
        localStorage.setItem("User", JSON.stringify(CurrentUser));
        localStorage.setItem("Users", JSON.stringify(Users));
        
         swal("Account created successfully, welcome to Bookly!");

         // redirect to Home page after 2 seconds
        window.location.href = "index.html";
    }, 2000);

});

