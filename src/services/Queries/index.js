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