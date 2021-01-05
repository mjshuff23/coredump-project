document.addEventListener("DOMContentLoaded", (e) => {
    const logoutButton = document
        .querySelector(".logout");
    if (!logoutButton) return;
    logoutButton.addEventListener('click', async (eve) => {
        try {
            const res = await fetch("/users/logout", {
                method: "POST",
            });
            if (!res.ok) {
                throw res;
            }

            localStorage.removeItem("COREDUMP_CURRENT_USER_ID");
            localStorage.removeItem("COREDUMP_ACCESS_TOKEN");
            window.location.href = "/login";

        }
        catch (err) {
            // console.log(await err.json());
            // handleErrors(err);
        }

    });
});
