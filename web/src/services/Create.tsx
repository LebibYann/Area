import { useEffect, useState } from 'react'
import { useLogin, useServices } from '../utils'
import { type AppletArea, type Area, type Service } from 'types'
import './Create.css'
import '../components/Button.css'
import './ServicesList.css'
import ServiceCard from './ServiceCard'

interface paramsForm {
  param1: string,
  param2: string,
  param3: string,
  param4: string
}

const Create = (): JSX.Element => {
  const token = useLogin()
  const [action, setAction] = useState<AppletArea | undefined>(undefined)
  const [reaction, setReaction] = useState<AppletArea | undefined>(undefined)
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined)
  const [mode, setMode] = useState<'actions' | 'reactions' | undefined>(undefined)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [form, setForm] = useState<paramsForm>({param1: '', param2: '', param3: '', param4: ''})
  const [services, setServices] = useState<Service[]>([])

  const updateServices = async () => {
    const promise = await useServices()
    console.log(promise)
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
    setShowForm(true)
  }

  const updateForm = () => {
    if (selectedService === undefined) {
      return
    }
    if (mode === 'actions' && action !== undefined) {
      
      fetch(`http://localhost:8080/triggers/${selectedService.id}/${action.area.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          action: action?.area.id,
        })
      }).then((response) => response.json()).then((data) => {
        console.log(data)
        setAction({ service: selectedService.name, area: { ...action?.area, ...form, id: data.eventId} })
      }).catch((error) => {
        console.log(error)
      })
    } else if (mode === 'reactions' && reaction !== undefined) {
      fetch(`http://localhost:8080/actions/${selectedService.id}/${reaction.area.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          action: action?.area.id,
        })
      }).then((response) => response.json()).then((data) => {
        console.log(data)
        setReaction({ service: selectedService.name, area: { ...reaction?.area, ...form }, id: data.eventId })
      }).catch((error) => {
        console.log(error)
      })
    }
    updateDisplay(undefined)
  }

  const updateDisplay = (mode: 'actions' | 'reactions' | undefined) => {
    if (mode === 'actions' && action !== undefined ||
        mode === 'reactions' && reaction !== undefined) {
      return
    }
    if (mode === undefined) {
      setShowForm(false)
      setForm({param1: '', param2: '', param3: '', param4: ''})
      setSelectedService(undefined)
    }
    setMode(mode)
  }

  const createArea = () => {
    fetch('http://localhost:8080/area', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        action: action?.id,
        reaction: reaction?.id
      })
    }).then((response) => response.json()).then((data) => {
      console.log(data)
    })
  }

  const handleChange = (
    key: string, 
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
      setForm({...form, [key]: event.target.value});
  }

  useEffect(() => {
    if (!token) {
      window.location.replace('/login')
    }

    fetch('http://localhost:8080/oauth2/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json()).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.error(error)
    })

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
          {action !== undefined && reaction !== undefined &&
            <button className="button black-button" onClick={() => { createArea() }}> Create </button>
          }
        </section>
        : <section className="services-container">
          <button onClick={() => { updateDisplay(undefined) }} className="button white-button border">Back</button>
          {selectedService === undefined
            ? <ul className="list">
              {services.map((service, index) =>
                <ServiceCard key={index} text={service.name} iconName={service.name} serviceName={service.name} onClick={() => { updateService(service) }} />
              )}
            </ul>
            : !showForm ? <ul className="list">
              {selectedService[mode].map((area, index) =>
                <ServiceCard key={index} text={area.description} serviceName={selectedService.name} onClick={() => { updateArea(area) }} />
              )}
              </ul>
            :
              <div>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("param1", e)} value={form.param1} type="text" placeholder='First Parameter'/>
                </div>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("param2", e)} value={form.param2} type="text" placeholder='Second Parameter'/>
                </div>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("param3", e)} value={form.param3} type="text" placeholder='Third Parameter'/>
                </div>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("param4", e)} value={form.param4} type="text" placeholder='Fourth Parameter'/>
                </div>
                <div className='form-submit'>
                    <input type='button' value={"Create " + mode.slice(0, -1)} onClick={() => {updateForm()}}/>
                </div>
              </div>
            }
        </section>
      }
    </section>
  )
}

export default Create
