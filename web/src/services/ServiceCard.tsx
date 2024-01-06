import { Service } from "../types";
import google from "../assets/images/GoogleIcon.png";
import discord from "../assets/images/DiscordIcon.png";
import spotify from "../assets/images/SpotifyIcon.png";
import instagram from "../assets/images/InstagramIcon.png";
import "./ServiceCard.css";

const useServiceIcon = (name: string) : string | undefined => {
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
      return (undefined)
  }  
}

interface ServiceCardProps extends React.HTMLAttributes<HTMLLIElement>{
  text: string;
  iconName?: string | undefined;
  serviceName: string;
}

const ServiceCard = ({text, iconName, serviceName, ...props} : ServiceCardProps): JSX.Element => {
  const icon = iconName && useServiceIcon(iconName);

  return (
    <li key={text} className={"card " + serviceName} {...props}>
      {icon && <img src={icon} alt={iconName + " icon"} className="service-icon" />}
      <h2>{text}</h2>
    </li>
  );
};

export default ServiceCard;
