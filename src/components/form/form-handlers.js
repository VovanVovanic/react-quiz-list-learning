import is from "is_js";

export function onCreateControls(options, validation) {
    return {
        ...options,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function onInputValid (a, b) {
    if (!b) {
      return true;
    }
    let isValid = true;
    if (b.required) {
      isValid = a.trim() !== "" && isValid;
    }
    if (b.minLength) {
      isValid = a.length >= b.minLength && isValid;
    }
    if (b.email) {
      isValid = is.email(a) && isValid;
    }
    return isValid;
};
  
export function validForm(formControls) {
  let isFormValid = true;
  Object.keys(formControls).forEach((name) => {
    isFormValid = formControls[name].valid && isFormValid;   
  });
  return isFormValid
}      
