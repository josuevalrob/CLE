
export const handleVariables = error => variables => (event, graphQlCallback) => {
  event.preventDefault();
  debugger
  graphQlCallback({ variables }).catch(error)
};