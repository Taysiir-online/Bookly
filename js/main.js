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

// logout function
const logout = (logoutElement) => {
  if (islogin().login === true) {
    logoutElement.addEventListener("click", () => {
      localStorage.removeItem("User");
      window.location.href = "login.html";
    });
  } else {
    logoutElement.style.display = "none";
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
export { islogin, logout, handleSearch };
