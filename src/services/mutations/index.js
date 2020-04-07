// TODO: this file should be just for import/export
import gql from "graphql-tag"
// userInput: {email:"pepe@user.com", password:"1234"}
export const signInMutation = gql`
mutation login($email: String!, $password:String!) {
  login(email: $email, password:$password) {
    user {
      firstName
      email
      rol
      id
    }
  }
}
`
export const logoutMutation = gql `mutation logout { logout }`

// ! when do we use this?
export const signUpMutation = gql`
mutation signup($input: UserInput){
  signup(input:$input){
    user {
      id
      rol
      email
      password
      firstName
      lastName
      phone
      Country
      City
      birth
      profilePhoto
    }
  }
}
`