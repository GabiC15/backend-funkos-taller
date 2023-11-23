import gql from "graphql-tag";

export default gql`
  type Date {
    year: Int
    month: Int
    day: Int
  }
`;