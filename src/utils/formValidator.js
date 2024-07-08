import fieldValidator from "./fieldValidator";

const formValidator = (formFields, type) => {
  let result = {};

  Object.keys(formFields).forEach((fieldKey) => {
    const fieldEl = document.getElementById(`${fieldKey}-field`);
    const fieldInputEl = Object.values(fieldEl.children).find(
      (v) => v.role === "input"
    );
    const fieldErrorEl = Object.values(fieldEl.children).find(
      (v) => v.role === "error"
    );

    const validatorHandler = () => {
      const fieldValidationResult = fieldValidator(formFields[fieldKey], {
        field: fieldEl,
        input: fieldInputEl,
        error: fieldErrorEl,
      });

      result = { ...result, [fieldKey]: fieldValidationResult };
    };

    if (type === "input") {
      fieldInputEl.addEventListener("input", validatorHandler);
    } else validatorHandler();
  });

  return {
    // ? A flag for checking hole form validation status
    hasError: Object.values(result).some((v) => v.hasError),
    fields: result,
  };
};

export default formValidator;
