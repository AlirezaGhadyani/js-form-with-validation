import {
  requiredValidator,
  emailValidator,
  complexPasswordValidator,
  passwordMatchValidator,
} from "./utils/validators";
import formValidator from "./utils/formValidator";

// * Form Fields
const formFields = {
  firstName: [
    {
      fn: requiredValidator,
      message: "First name is a required field",
    },
  ],
  lastName: [
    {
      fn: requiredValidator,
      message: "Last name is a required field",
    },
  ],
  email: [
    {
      fn: requiredValidator,
      message: "Email is a required field",
    },
    {
      fn: emailValidator,
      message: "Email is not valid",
    },
  ],

  password: [
    {
      fn: requiredValidator,
      message: "Password is a required field",
    },
    {
      fn: complexPasswordValidator,
      message:
        "Include at least a lowercase, upper case and special characters",
    },
  ],
  passwordConfirm: [
    {
      fn: requiredValidator,
      message: "Password confirm is a required field",
    },
    {
      relatedField: "password",
      fn: passwordMatchValidator,
      message: "Password is not match",
    },
  ],
};

// ? Handle form validation on inputs changes
formValidator(formFields, "input");

// *  Form Element
const formEl = document.getElementById("form");

// * Handle submit form
formEl.addEventListener("submit", (event) => {
  // ? Prevent form default behavior
  event.preventDefault();

  // ? check form has error
  const validationResult = formValidator(formFields, "submit");

  if (validationResult.hasError)
    return Promise.reject("error: form has validation error");

  alert("You have signed up successfully cheers 🍻.");
});
