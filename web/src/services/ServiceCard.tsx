import { Service } from "../types";
import google from "../assets/images/GoogleIcon.png";
import discord from "../assets/images/DiscordIcon.png";


const useServiceIcon = (name: string) : string => {
    if (name === "google")
        return (google)
    else if (name === "discord")
        return (discord)
    else
        return ("")
}

const ServiceCard = (service: Service): JSX.Element => {
  const icon = useServiceIcon(service.name);


  return (
    <li key={service.name}>
      <img src={useServiceIcon(service.name)} alt={service.name} />
      <h1>{service.name}</h1>
    </li>
  );
};

export default ServiceCard;
