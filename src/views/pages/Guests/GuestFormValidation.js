
export const schema = {
    firstName: {
      presence: { 
        allowEmpty: false, message: 'is required' 
      },
      length: {
        maximum: 32
      }
    },
    letter: {
      length: {
        maximum: 600,
      }
    },
    status: {
      inclusion: ['STANDBY','SEND','ACCEPTED','DENIED','DELETED']
    },
  };