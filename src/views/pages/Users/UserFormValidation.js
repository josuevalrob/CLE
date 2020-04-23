
export const schema = {
  firstName: {
    presence: {
      allowEmpty: false, message: 'is required' 
    },
    length: {
      maximum: 32
    }
  },
  // email: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   email: true,
  //   length: {
  //     maximum: 64
  //   }
  // },
  lastName: {
    length: {
      maximum: 32
    }
  },
  phone: {
    length: {
      maximum: 32
    }
  },
  Country: {
    length: {
      maximum: 32
    }
  },
  City: {
    length: {
      maximum: 32
    }
  },
  // birth: {
  //   // date type
  //   datetime: {
  //     dateOnly: true,
  //   }
  // },
  profilePhoto: {
    // check if is url!!
  },
  
};