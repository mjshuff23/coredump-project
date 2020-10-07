const loginForm = document.querySelector(".log-in-form");
// const { query } = require("express");
import { handleErrors } from "./errors.js";

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(loginForm);
	const email = formData.get("email");
	const password = formData.get("password");
	const body = { email, password };

	try {
		const res = await fetch("http://localhost:8080/users/token", {
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

		window.location.href = "http://localhost:8080/";

		document
			.querySelector(".navbar-logout-text")
			.classList.remove(".hidden")

		document
			.querySelector(".navbar-signup-login")
			.classList.add(".hidden")

	}
	catch (err) {
		handleErrors(err);
	}
})
