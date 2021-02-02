const loginForm = document.querySelector(".log-in-form");
import { handleErrors } from "./errors.js";

loginForm.addEventListener("submit_demo", async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const email = "demo@aa.io";
  const password = "password";
  const body = { email, password };

  try {
    const res = await fetch("/users/token", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id },
    } = await res.json();

    localStorage.setItem("COREDUMP_ACCESS_TOKEN", token);
    localStorage.setItem("COREDUMP_CURRENT_USER_ID", id);

    window.location.href = "/main";
    // let login = document.querySelector("login");
    // let signup = document.querySelector("signup");
    // let welcome = document.querySelector("navbar-text");
    // let logout = document.querySelector("logout");

    // if (login && signup) {
    // 	login.classList.add("hidden")
    // 	signup.classList.add("hidden")
    // }
    // if (logout) {
    // 	logout.classList.remove("hidden")
    // 	welcome.classList.remove("hidden")
    // }
  } catch (err) {
    handleErrors(err);
  }
});
