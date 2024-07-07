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

    const validator = () => {
      const fieldValue = fieldInputEl.value;
      let fieldValidationResult = {};

      formFields[fieldKey].forEach((validator) => {
        const relatedFieldEl = formFields[validator.relatedField]?.element;

        const isValid = validator.relatedField
          ? validator.fn(fieldValue, relatedFieldEl?.value)
          : validator.fn(fieldValue);

        const hasError = !(fieldValidationResult.hasError && isValid);
        const message = fieldValidationResult.message || validator.message;

        fieldValidationResult = {
          hasError,
          message: !isValid ? message : "",
        };
      });

      fieldErrorEl.innerText = fieldValidationResult.message;

      result = { ...result, [fieldKey]: fieldValidationResult };
    };

    if (type === "input") fieldInputEl.addEventListener("input", validator);
    else validator();
  });

  return result;
};

export default formValidator;
