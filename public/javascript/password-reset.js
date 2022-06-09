const error = document.querySelector(".errorText");

async function passwordFormHandler(event) {
  event.preventDefault();
  error.classList.add("hidden");

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/reset", {
      method: "PUT",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  } else {
    error.classList.remove("hidden");
  }
}

document
  .querySelector(".password-reset-form")
  .addEventListener("submit", passwordFormHandler);
