import { useEffect, useState } from "react";
import { useService, useServices } from "../utils";
import { type Service } from "types";
import "./ServicesList.css";

const ServiceDetails = (): JSX.Element => {
  const [data, setData] = useState<Service>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const serviceName = window.location.pathname.split("/")[2];
    const fetchData = async () => {
      try {
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

  return (
    <section>
      {loading ? (
      <p>Loading services...</p>
        ) : (
          <ul className="list">{data?.name}</ul>
        )}
    </section>
  );
}

export default ServiceDetails;
