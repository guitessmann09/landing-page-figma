const form = document.querySelector(".form");
const signUpButton = document.querySelector(".navbar-button");
const signUpContainer = document.querySelector(".sign-up-container");
const cancelButton = document.querySelector("#cancel-button");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");
const formControls = document.querySelectorAll(".form-control");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
  isValid();
});

const checkInputs = () => {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmationValue = passwordConfirmation.value;
  let validation = true;

  if (usernameValue === "") {
    setErrorFor(username, "Username is required!");
    validation = false;
  } else {
    setSuccesFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "Email is required!");
    validation = false;
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Enter a valid email address!");
    validation = false;
  } else {
    setSuccesFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "Password is required");
    validation = false;
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "Password must be 7 characters or more!");
    validation = false;
  } else {
    setSuccesFor(password);
  }

  if (passwordConfirmationValue === "") {
    setErrorFor(passwordConfirmation, "Password confirmation is required");
    validation = false;
  } else if (passwordConfirmationValue !== passwordValue) {
    setErrorFor(passwordConfirmation, "The passwords do not match!");
    validation = false;
  } else if (passwordValue.length < 7) {
    setErrorFor(passwordConfirmation, "Please fill in the password correctly!");
    validation = false;
  } else {
    setSuccesFor(passwordConfirmation);
  }

  return isValid(validation);
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;
  formControl.classList = "form-control error";
};

const setSuccesFor = (input) => {
  const formControl = input.parentElement;
  formControl.classList = "form-control success";
};

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

const isValid = (validation) => {
  if (validation == true) {
    alert("User sign up succefull");
    signUpButton.innerHTML = `Sign Out`;
    cleanInputs();
    showForm();
  } else {
    return;
  }
};

const cleanInputs = () => {
  username.value = "";
  email.value = "";
  password.value = "";
  passwordConfirmation.value = "";
  for (const formControl of formControls) {
    formControl.classList.remove("error", "success");
  }
};

const showForm = () => {
  signUpContainer.classList.toggle("hidden");
};

signUpButton.addEventListener("click", () => {
  if (signUpButton.innerText === "Sign Out") {
    alert("Sign Out Successful");
    signUpButton.innerText = "Sign In";
    return;
  } else {
    showForm();
  }
});
cancelButton.addEventListener("click", () => {
  showForm();
});
