import { useEffect, useState } from 'react'
import { readRequestStatus, useLogin, useServices } from '../utils'
import { type AppletArea, type Area, type Service } from 'types'
import './Create.css'
import '../components/Button.css'
import './ServicesList.css'
import ServiceCard from './ServiceCard'

interface paramsForm {
  param1: string | undefined,
  param2: string | undefined,
  param3: string | undefined,
  param4: string | undefined
}

const Create = (): JSX.Element => {
  const token = useLogin()
  const [action, setAction] = useState<AppletArea | undefined>(undefined)
  const [reaction, setReaction] = useState<AppletArea | undefined>(undefined)
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined)
  const [mode, setMode] = useState<'actions' | 'reactions' | undefined>(undefined)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [formHolder, setFormHolder] = useState<paramsForm>({param1: undefined, param2: undefined, param3: undefined, param4: undefined})
  const [form, setForm] = useState<paramsForm>({param1: undefined, param2: undefined, param3: undefined, param4: undefined})
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
    setFormHolder({param1: selectedArea.param1, param2: selectedArea.param2, param3: selectedArea.param3, param4: selectedArea.param4})
    if (mode === 'actions') {
      setAction({ service: selectedService.name, area: selectedArea })
    } else if (mode === 'reactions') {
      setReaction({ service: selectedService.name, area: selectedArea })
    }
    if (selectedArea.param1 === undefined && selectedArea.param2 === undefined && selectedArea.param3 === undefined && selectedArea.param4 === undefined)
      updateForm()
    else
      setShowForm(true)
  }

  const updateForm = async () => {
    if (selectedService === undefined)
      return
    if (mode === 'actions' && action !== undefined) {
      try {
        const response = await fetch(`http://localhost:8080/triggers/${selectedService.id}/${action.area.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            param1: form.param1,
            param2: form.param2,
            param3: form.param3,
            param4: form.param4
          })
        })
        const data = await response.json();
        if (readRequestStatus(response.status, data.message)) {
          console.log(data)
          setAction({ service: selectedService.name, area: { ...action?.area, ...form }, id: data.id })
        }
      } catch (error) {
        console.log(error)
      }
    } else if (mode === 'reactions' && reaction !== undefined) {
      try {
        const response = await fetch(`http://localhost:8080/actions/${selectedService.id}/${reaction.area.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
          body: JSON.stringify({
            param1: form.param1,
            param2: form.param2,
            param3: form.param3,
            param4: form.param4
          
        })
      })
        const data = await response.json()
        if (readRequestStatus(response.status, data.message)) {
          console.log(data)
          setReaction({ service: selectedService.name, area: { ...reaction?.area, ...form }, id: data.id })
        }
      } catch (error) {
        console.log(error)
      }
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
      setForm({ param1: undefined, param2: undefined, param3: undefined, param4: undefined})
      setFormHolder({param1: undefined, param2: undefined, param3: undefined, param4: undefined})
      setSelectedService(undefined)
    }
    setMode(mode)
  }

  const createArea = async () => {
    console.log(action)
    console.log(reaction)
    try {
      const response = await fetch('http://localhost:8080/area', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          action: action?.id,
          reaction: reaction?.id
        })
    })
      const data = await response.json()
      if (readRequestStatus(response.status, data.message)) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
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
                {formHolder.param1 !== undefined &&
                  <div className='form-input'>
                    <input onChange={(e): void => handleChange("param1", e)} value={form.param1} type="text" placeholder={formHolder.param1} />
                  </div>
                }
                {formHolder.param2 !== undefined &&
                  <div className='form-input'>
                    <input onChange={(e): void => handleChange("param2", e)} value={form.param2} type="text" placeholder={formHolder.param2} />
                  </div>
                }
                {formHolder.param3 !== undefined &&
                  <div className='form-input'>
                    <input onChange={(e): void => handleChange("param3", e)} value={form.param3} type="text" placeholder={formHolder.param3} />
                  </div>}
                {formHolder.param4 !== undefined &&
                  <div className='form-input'>
                    <input onChange={(e): void => handleChange("param4", e)} value={form.param4} type="text" placeholder={formHolder.param4} />
                  </div>
                }
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
