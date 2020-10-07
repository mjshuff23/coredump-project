document.addEventListener("DOMContentLoaded", (e) => {
    const logoutButton = document
        .querySelector(".logout-button")

    logoutButton.addEventListener('click', (eve) => {
        localStorage.removeItem("COREDUMP_CURRENT_USER_ID");
        localStorage.removeItem("COREDUMP_CURRENT_USER_ID");

        window.location.href = "/login";
        document
            .querySelector(".navbar-logout-text")
            .classList.add(".hidden")

        document
            .querySelector(".navbar-signup-login")
            .classList.remove(".hidden")
    });
});
