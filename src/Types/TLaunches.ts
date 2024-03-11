import { ROLE_ADMIN, ROLE_GUEST } from "../utils/roles";

export type TRocket = {
    rocket: {
        name: string
        mass: {
            kg: number
        }
    }
};

export type TLaunch = {
    id: string
    mission_name: string
    launch_year: string
    rocket:TRocket
};

export type TLaunches = TLaunch[];

export type TLaunchesQuery = {launches: TLaunches};

export type TRole = typeof ROLE_ADMIN | typeof ROLE_GUEST;

export type TIdToken = {
    'iss': string,
    'sub': string,
    'aud': string,
    'name': string,
    'email': string,
    'exp': number,
    'iat': number,
    roles: TRole[],
};