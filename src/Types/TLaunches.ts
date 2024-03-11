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