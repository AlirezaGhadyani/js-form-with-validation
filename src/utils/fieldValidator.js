const fieldTypeValue = (type, input) => {
  switch (type) {
    case "input":
      return input.value;
    case "checkbox":
      return input.checked;
    default:
      return input.value;
  }
};

const fieldValidator = (formField, elements) => {
  const { validators, type = "input" } = formField;

  const fieldValue = fieldTypeValue(type, elements.input);
  let fieldValidationResult = {};

  validators.forEach((validator) => {
    const relatedFieldEl = document.getElementById(
      `${validator.relatedField}-field`
    );

    const relatedFieldInputEl = relatedFieldEl?.children
      ? Object.values(relatedFieldEl.children).find((v) => v.role === "input")
      : null;

    const isValid =
      validator.relatedField && relatedFieldInputEl
        ? validator.fn(fieldValue, relatedFieldInputEl?.value)
        : validator.fn(fieldValue);

    const hasError =
      validators.length > 1
        ? !(fieldValidationResult.hasError && isValid)
        : !isValid;

    const message = fieldValidationResult.message || validator.message;

    fieldValidationResult = {
      hasError,
      message: !isValid ? message : "",
    };
  });

  // ? Set error message into markup
  if (elements?.error) elements.error.innerText = fieldValidationResult.message;

  // ? Set attributes into markup for better access
  elements.field.setAttribute("data-has-error", fieldValidationResult.hasError);
  elements.input.setAttribute("aria-invalid", fieldValidationResult.hasError);

  return fieldValidationResult;
};

export default fieldValidator;
