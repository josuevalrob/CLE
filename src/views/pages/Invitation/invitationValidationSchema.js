// Schema for inputs client side validation.
export const schema = {
  email: {
    presence: { allowEmpty: false, message: 'dato obligatorio' },
    email: true,
    length: {
      maximum: 30
    }
  },
  firstName: {
    presence: { allowEmpty: false, message: 'Necesitamos tu nombre' },
    length: {
      maximum: 20
    }
  },
  letter: {
    presence: { allowEmpty: false, message: 'dato obligatorio' },
    length: {
      maximum: 600
    }
  }
};