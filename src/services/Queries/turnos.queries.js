import gql from "graphql-tag"

export const TurnosGrid = gql`
query getTurnos($input: TurnoSearch, $limit:Int, $offset:Int) {
	getTurnos(input:$input, limit:$limit, offset:$offset){
    id
    name
    description
    kind
    enrolled
    dates {
      label
      value
    }
  }
}
`