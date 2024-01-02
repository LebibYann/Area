import { useEffect, useState } from "react";
import { useServices } from "../utils";
import ServiceCard from "./ServiceCard";
import { Service } from "types";
import "./ServicesList.css";
import SearchBar from "../components/SearchBar";

const ServicesList = (): JSX.Element => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchedServices, setSearchedServices] = useState<Service[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");

  const updateServices = async () => {
    const promise = await useServices();
    setServices(promise);
    setSearchedServices(promise);
  }

  useEffect(() => {
    updateServices();
  }, []);

  const updateSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchKey(event.target.value);
    setSearchedServices(services.filter((service) => {
      return service.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
    }));
  };

  return (
    <section className="services-list">
      <SearchBar onChange={(e) => updateSearch(e)} value={searchKey} placeholder="Search Services" />
      <ul className="list">
        {searchedServices.map((searchedService) =>
          <ServiceCard service={searchedService} onClick={() => window.location.replace(window.location.origin + "/" + searchedService.name)}/>
        )}
      </ul>
    </section>
  );
};


export default ServicesList;
