
export const schema = {
    letter: {
      presence: { 
        allowEmpty: false, message: 'is required' 
      },
      length: {
        maximum: 600,
      }
    },    
  };