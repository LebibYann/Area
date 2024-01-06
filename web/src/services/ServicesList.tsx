import { useEffect, useState } from 'react'
import { useServices } from '../utils'
import ServiceCard from './ServiceCard'
import { type Service } from 'types'
import './ServicesList.css'
import SearchBar from '../components/SearchBar'

const ServicesList = (): JSX.Element => {
  const [services, setServices] = useState<Service[]>([])
  const [searchedServices, setSearchedServices] = useState<Service[]>([])
  const [searchKey, setSearchKey] = useState<string>('')

  const updateServices = async () => {
    const promise = await useServices()
    setServices(promise)
    setSearchedServices(promise)
  }

  useEffect(() => {
    updateServices()
  }, [])

  const updateSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchKey(event.target.value)
    setSearchedServices(services.filter((service) => {
      return service.name.toLowerCase().includes(event.target.value.toLowerCase())
    }))
  }

  return (
    <section className="services-list">
      <SearchBar onChange={(e) => { updateSearch(e) }} value={searchKey} placeholder="Search Services" />
      <ul className="list">
        {searchedServices.map((searchedService) =>
          <ServiceCard text={searchedService.name} iconName={searchedService.name} serviceName={searchedService.name} onClick={() => { window.location.replace(window.location.origin + '/' + searchedService.name) }}/>
        )}
      </ul>
    </section>
  )
}

export default ServicesList
