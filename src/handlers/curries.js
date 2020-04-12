
export const handleVariables = error => variables => (event, graphQlCallback) => {
  event.preventDefault();
  graphQlCallback({ variables }).catch(error)
};