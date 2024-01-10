import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';

function getFormInputs(formElement) {
  const formNodeNames = ['INPUT', 'TEXTAREA'];

  return [...formElement.elements].filter(element =>
    formNodeNames.includes(element.nodeName)
  );
}

function validateForm(formElement) {
  const inputs = getFormInputs(formElement);

  return inputs.every(input => !!input.value);
}

function getFormData(formElement) {
  const inputs = getFormInputs(formElement);

  return inputs.reduce(
    (acc, input) => ({ ...acc, [input.name]: input.value }),
    {}
  );
}

function submitForm(form) {
  const formData = getFormData(form);

  form.reset();
  resetFormState();

  console.log('form data', formData);
}

function bindEvents() {
  const form = document.querySelector('.feedback-form');

  if (!form) {
    return;
  }

  setInitialFormData(form);

  form.addEventListener(
    'input',
    throttle(() => {
      const formData = getFormData(form);

      setFormState(formData);
    }, 500)
  );

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (validateForm(form)) {
      submitForm(form);
    } else {
      alert('All fields should be filled in');
    }
  });
}

function setFormState(state) {
  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(state));
}

function getFormState() {
  const state = localStorage.getItem(FORM_STATE_KEY);

  if (!state) {
    return null;
  }

  try {
    return JSON.parse(state);
  } catch (e) {
    return null;
  }
}

function resetFormState() {
  localStorage.removeItem(FORM_STATE_KEY);
}

function setInitialFormData(form) {
  const formData = getFormState();

  if (!formData) {
    return;
  }

  Object.keys(formData).forEach(key => {
    const formElement = form.elements[key];

    if (!formElement) {
      return;
    }

    formElement.value = formData[key];
  });
}

bindEvents();
