import { LAUNCHES_QUERY, LAUNCHES_QUERY_GUEST } from "../queries/launches";
import { ROLE_ADMIN, ROLE_GUEST } from "./roles";

export const queries = {
    [ROLE_ADMIN]: LAUNCHES_QUERY,
    [ROLE_GUEST]: LAUNCHES_QUERY_GUEST,
}