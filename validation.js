document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const email = document.getElementById("email");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("modal-close");

  // HANDLE SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    const errors = {};

    //   CLEAR ERRORS
    document.querySelectorAll(".error-message").forEach((span) => {
      span.textContent = "";
    });

    //   FORM VALIDATION

    if (data.email.trim() === "") {
      errors.email = "Please enter a valid email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      errors.email = "Error, please check your email";
    }

    //   ERROR HANDLING
    if (Object.keys(errors).length > 0) {
      displayErrors(errors);
      email.setAttribute("aria-invalid", "true");
    } else {
      console.log("Form is Valid!", data);
      email.setAttribute("aria-invalid", "false");
      modal.removeAttribute("hidden");
      closeModalBtn.focus();
    }

    function displayErrors(errors) {
      for (const key in errors) {
        const errorSpan = document.getElementById(`${key}-error`);
        if (errorSpan) {
          errorSpan.textContent = errors[key];
          errorSpan.setAttribute("aria-hidden", "false");
        }
      }
    }
  };

  form.addEventListener("submit", handleSubmit);

  // CLEAR ERRORS ON USER INPUT
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const key = input.id || input.name;

      const errorSpan = document.getElementById(`${key}-error`);
      if (errorSpan) {
        errorSpan.textContent = "";
        errorSpan.setAttribute("aria-hidden", "true");
      }
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.setAttribute("hidden", "");
    form.reset();
    email.setAttribute("aria-invalid", "false");
  });
});
