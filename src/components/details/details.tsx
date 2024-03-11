import { Card } from "primereact/card";
import { TLaunches } from "../../Types/TLaunches";
import { ScrollPanel } from "primereact/scrollpanel";

const Details = ({ launches }: { launches: TLaunches }) => {
    return (
        <ScrollPanel className="h-full p-1 border-round-sm" style={{ backgroundColor: 'rgba(255,255,255,.6)' }}>
            {
                launches.map(launch => {
                    const { mission_name, launch_year, rocket: rocketSrc, id } = launch;
                    const { rocket } = rocketSrc;

                    return (
                        <Card key={id} title={mission_name} subTitle={`Launched in ${launch_year}`} className="shadow-2 my-2 mx-3">
                            <p className="mb-0"><strong>Rocket</strong> {rocket.name}</p>
                            <p className="mb-0"><strong>Mass</strong> {rocket.mass.kg} Kg</p>
                        </Card>
                    )
                })
            }
        </ScrollPanel>
    );
};

export default Details;
