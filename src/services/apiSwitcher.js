import {allGuest, allUser} from './Queries'

export const getMyQuery = str => {
  console.log(str)
  let query; //🤮
  switch (str) {
    case 'guests':
      query = allGuest;
      break;
    case 'users':
      query = allUser;
      break;
    default:
      query = allGuest; //🤮
      break;
  }
  return query
}