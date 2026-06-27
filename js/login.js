// get form
const form = document.querySelector("form");


const logUser = localStorage.getItem("Users");
const Users = JSON.parse(logUser) || [];

// login form handling
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // get form data
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    // validation
    if (!email || !password) {
         alert("please fill in all required fields");
         return;

    }

    
     // check if user already exists
    const checkUser = () => {
        const check = Users.filter((user) => user.email === email);
       return check.length < 1 ? false : true;
    } 
    if (checkUser() === false) {
        swal("This email is not exists!", "please use a different email!", "error");
        return;
    }

    // check if password is correct
    const checkPassword = () => {
        const check = Users.filter((user) => user.email === email);
        const User = check[0];
         const UserPassword = (User.password);
          if (UserPassword === password) {
             const btnsubmit = document.querySelector( 'button[type="submit"]' );
              btnsubmit.innerHTML = `log in`;
                swal(
                    "Login successful !",
                    "Welcome back to Bookly website "
                );

                  // save user info
              setTimeout(() => {
              localStorage.setItem( "User", JSON.stringify(User) );
    
                 // redirect to home page
                 window.location.href = "index.html";
              }, 2000);
    
            } else {
                swal("Your password is incorrect");
            }
    
        };
    
        checkPassword();
    });
