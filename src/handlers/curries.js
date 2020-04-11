
export const handleVariables = error => variables => async (event, graphQlCallback) => {
  event.preventDefault();
  try {
    await graphQlCallback({ variables })
  } catch (event) {
    error()
  }
};