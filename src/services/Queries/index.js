import gql from "graphql-tag"

export const allGuest = gql`
query getGuests($input: GuestSearch, $limit:Int, $offset:Int) {
	getGuests(limit:$limit, offset:$offset, input:$input){
    firstName
    email
    id
    rol
    status
  }
}
`


export const getGuest = gql`
query getGuest($id: ID!) {
	getGuest(id:$id){
    id
    firstName
    email
    id
    rol
    status
  }
}
`
export const getUser = gql`
query getUser($id: ID!) {
	getUser(id:$id) {
    id
    rol
    email
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

export const allUser = gql`
query getUsers($input: UsersSearch, $limit:Int, $offset:Int) {
	getUsers(limit:$limit, offset:$offset, input:$input){
    firstName
    email
    id
    rol
  }
}
`