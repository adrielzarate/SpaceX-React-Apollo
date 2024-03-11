import { TypedDocumentNode, gql } from "@apollo/client";
import { TLaunchesQuery } from "../Types/TLaunches";

export const LAUNCHES_QUERY: TypedDocumentNode<TLaunchesQuery> = gql`
  query Launches($limit: Int!) {
    launches(limit: $limit) {
      id
      mission_name
      launch_year
      rocket {
        rocket {
          name
          mass {
            kg
          }
        }
      }
    }
  }
`;

export const LAUNCHES_QUERY_GUEST: TypedDocumentNode<TLaunchesQuery> = gql`
query LaunchesGuest {
  launches(limit: 50) {
    id
    mission_name
    launch_year
    rocket {
      rocket {
        name
        mass {
          kg
        }
      }
    }
  }
}
`;
