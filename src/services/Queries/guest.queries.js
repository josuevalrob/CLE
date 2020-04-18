import gql from "graphql-tag"

export const allGuest = gql`
query getGuests($input: GuestSearch, $limit:Int, $offset:Int) {
	getGuests(limit:$limit, offset:$offset, input:$input){
    firstName
    email
    id
    rol
    status
    owner {
      id
      firstName
    }
  }
}
`


export const getGuest = gql`
query getGuest($id: ID!) {
	getGuest(id:$id){
    firstName
    email
    id
    rol
    letter
    status
  }
}
`