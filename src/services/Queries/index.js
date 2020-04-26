import gql from "graphql-tag"
export * from './guest.queries'
export * from './turnos.queries'

export const getUser = gql`
query getUser($id: ID!) {
	getUser(id:$id) {
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

export const allUser = gql`
query getUsers($input: UsersSearch, $limit:Int, $offset:Int) {
	getUsers(limit:$limit, offset:$offset, input:$input){
    firstName
    lastName
    email
    id
    rol
  }
}
`