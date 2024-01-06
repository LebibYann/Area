import { useEffect, useState } from 'react'
import { useLogin, useServices } from '../utils'
import { type AppletArea, type Area, type Service } from 'types'
import './Create.css'
import '../components/Button.css'
import './ServicesList.css'
import ServiceCard from './ServiceCard'

const Create = (): JSX.Element => {
  const isLogged = useLogin()
  const [action, setAction] = useState<AppletArea | undefined>(undefined)
  const [reaction, setReaction] = useState<AppletArea | undefined>(undefined)
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined)
  const [mode, setMode] = useState<'actions' | 'reactions' | undefined>(undefined)
  const [services, setServices] = useState<Service[]>([])

  const updateServices = async () => {
    const promise = await useServices()
    setServices(promise)
  }

  const updateService = (selectedService: Service) => {
    setSelectedService(selectedService)
  }

  const updateArea = (selectedArea: Area) => {
    if (selectedService === undefined) {
      return
    }
    if (mode === 'actions') {
      setAction({ service: selectedService.name, area: selectedArea })
    } else if (mode === 'reactions') {
      setReaction({ service: selectedService.name, area: selectedArea })
    }
    updateDisplay(undefined)
  }

  const updateDisplay = (mode: 'actions' | 'reactions' | undefined) => {
    if (mode === 'actions' && action !== undefined ||
        mode === 'reactions' && reaction !== undefined) {
      return
    }
    if (mode === undefined) {
      setSelectedService(undefined)
    }
    setMode(mode)
  }

  useEffect(() => {
    if (!isLogged) {
      window.location.replace('/login')
    }

    updateServices()
  }, [])

  return (
    <section className="create-container">
      {mode === undefined
        ? <section className="menu-container">
          <h1 className="title">Create</h1>
          {action === undefined
            ? <section onClick={() => { updateDisplay('actions') }} className="area-container">
              <span>If this</span>
            </section>
            : <section className={'area-container border ' + action.service}>
              <span>If {action.area.description}</span>
            </section>
          }
          <div className="separator"></div>
          <div className="separator"></div>
          {reaction === undefined
            ? <section onClick={() => { updateDisplay('reactions') }} className="area-container">
            <span>Then that</span>
          </section>
            : <section className={'area-container border ' + reaction.service}>
              <span>Then {reaction.area.description} </span>
          </section>
          }
          <button className="button black-button"> Create </button>
        </section>
        : <section className="services-container">
          <button onClick={() => { updateDisplay(undefined) }} className="button white-button border">Back</button>
          {selectedService === undefined
            ? <ul className="list">
            {services.map((service) =>
              <ServiceCard text={service.name} iconName={service.name} serviceName={service.name} onClick={() => { updateService(service) }}/>
            )}
          </ul>
            : <ul className="list">
            {selectedService[mode].map((area) =>
              <ServiceCard text={area.description} serviceName={selectedService.name} onClick={() => { updateArea(area) }}/>
            )}
          </ul>
          }
        </section>
      }
    </section>
  )
}

export default Create
