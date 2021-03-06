import gql from "graphql-tag"

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

export const inviteGuest = gql`
mutation sendGuest($email: String!, $letter:String) {
  sendGuest(email:$email,letter:$letter){
    firstName
    id
    status
  }
}
`

export const deleteGuest = gql`
mutation deleteGuest($id: ID!) {
	deleteGuest(id:$id)
}
`
export const updateGuest = gql`
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

export const createGuest = gql`
mutation createGuest($input: GuestInput!) {
  createGuest(input: $input) {
    firstName
    id
    email
    letter
  }
}
`