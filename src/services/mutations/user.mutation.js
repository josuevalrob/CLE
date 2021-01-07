import gql from "graphql-tag"
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