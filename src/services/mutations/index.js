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
export const logoutMutation = gql`mutation logout { logout }`

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

export const requestAccess = gql`
mutation createGuest($input: GuestInput!) {
  createGuest(input: $input) {
    firstName
    id
    email
    letter
  }
}
`

export const deleteGuest = gql`
mutation deleteGuest($id: ID!) {
	deleteGuest(id:$id)
}
`
export const editGuest = gql`
mutation updateGuest($input: GuestInput!) {
  updateGuest(input: $input) {
    id
    firstName
    id
    email
    letter
  }
}
`

export const editUser = gql`
mutation updateUser($input: UserUpdate!) {
  updateUser(input: $input) {
    id
    rol
    firstName
    lastName
    phone
    Country
    City
    birth
    profilePhoto
  }
}
`

export const deleteUser = gql`
mutation deleteUser($id: ID!) {
	deleteUser(id:$id)
}
`