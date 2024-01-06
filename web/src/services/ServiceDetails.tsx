import { useEffect, useState } from "react";
import { getServiceUri, useService, useServices } from "../utils";
import { type Service } from "types";
import "./ServicesList.css";
import "../components/Button.css";
import { connect } from "http2";

const ServiceDetails = (): JSX.Element => {
  const [data, setData] = useState<Service>();
  const [loading, setLoading] = useState<boolean>(true);
  const serviceName = window.location.pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(serviceName)
        const servicesData = await useService(serviceName);
        setData(servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConnection = async () => {
    const uri = getServiceUri(serviceName);

    if (uri !== undefined) {
      window.location.replace(uri);
    }
  };

  return (
    <section>
      {loading ? (
      <p>Loading services...</p>
      ) : (
          <div>
            <h2 className="title">{data?.name}</h2>
            <button className={"button " + serviceName} onClick={handleConnection}>Connect</button>
            <h3>Actions</h3>
            <ul className="list">
              {data?.actions.map((action) => 
                <li key={action.name} className={"card " + serviceName}>
                  <h2>{action.name}</h2>
                  <p>{action.description}</p>
                </li>  
              )}
            </ul>
            <h3>Reactions</h3>
            <ul className="list">
              {data?.reactions.map((reaction) => 
                <li key={reaction.name} className={"card " + serviceName}>
                  <h2>{reaction.name}</h2>
                  <p>{reaction.description}</p>
                </li>
              )}
            </ul>
          </div>
        )}
        </section>
      );
}

export default ServiceDetails;
