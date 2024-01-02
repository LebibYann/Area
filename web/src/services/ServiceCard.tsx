import { Service } from "../types";
import google from "../assets/images/GoogleIcon.png";
import discord from "../assets/images/DiscordIcon.png";
import spotify from "../assets/images/SpotifyIcon.png";
import instagram from "../assets/images/InstagramIcon.png";
import "./ServiceCard.css";

const useServiceIcon = (name: string) : string => {
  switch (name) {
    case "google":
      return (google)
    case "discord":
      return (discord)
    case "spotify":
      return (spotify)
    case "instagram":
      return (instagram)
    default:
      return ("")
  }  
}

interface ServiceCardProps extends React.HTMLAttributes<HTMLLIElement>{
  service: Service;
}

const ServiceCard = ({service, ...props} : ServiceCardProps): JSX.Element => {
  const icon = useServiceIcon(service.name);

  return (
    <li key={service.name} className={"card " + service.name} {...props}>
      <img src={useServiceIcon(service.name)} alt={service.name} className="service-icon" />
      <h1>{service.name}</h1>
    </li>
  );
};

export default ServiceCard;
