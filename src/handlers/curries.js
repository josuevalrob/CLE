
export const handleVariables = error => variables => (event, graphQlCallback) => {
  event.preventDefault();
  debugger
  graphQlCallback({ variables }).catch(error)
};

export const flatterZero = objHandler => (data) => objHandler(flatter(0)(data))
export const flatter = arrN => data => Object.values(data)[arrN]