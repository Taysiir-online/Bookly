// check if user is login or not.
const islogin = () => {
  const User = JSON.parse(localStorage.getItem("User"));
  if (User) {
    return {
      login: true,
      name: User.fullName,
    };
  } else {
    return {
      login: false,
    };
  }
};

// Authotication function
const setupAuthNav = (loginElement, logoutElement) => {
  const userStatus = islogin();

  if (userStatus.login === false) {
    if (loginElement) loginElement.style.display = "block";
    if (logoutElement) logoutElement.style.display = "none";
  } else {
    if (userStatus.login === true) {
      if (loginElement) loginElement.style.display = "none";
      if (logoutElement) logoutElement.style.display = "block";

      if (logoutElement) {
        logoutElement.addEventListener("click", () => {
          localStorage.removeItem("User");
          window.location.href = "login.html";
        });
      }
    }
  }
};

//  search input function
const handleSearch = (searchInput) => {
  if (!searchInput) return;
  const searchValue = searchInput.value.trim();
  if (searchValue == "") {
    swal("please enter a search term.");
    return;
  }
  window.location.href = `search.html?q=${searchValue}`;
};

// Exports
export { islogin, setupAuthNav, handleSearch };
