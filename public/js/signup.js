const signUpForm = document.querySelector(".sign-up-form");
// import { handleErrors } from "./errors.js";

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  const userName = formData.get("userName");
  const email = formData.get("email");
  const password = formData.get("password");
  const avatar = formData.get("avatar");

  const body = { email, password, userName };
  try {
    const res = await fetch("http://localhost:8080/users", {
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
    // storage access_token in localStorage:
    localStorage.setItem("COREDUMP_ACCESS_TOKEN", token);
    localStorage.setItem("COREDUMP_CURRENT_USER_ID", id);
    window.location.href = "/";
  } catch (err) {
    handleErrors(err);
  }
});
