import { create } from "zustand"
import { getGymsAdmin } from "../services/getGymsAdmin"

const gyms = getGymsAdmin()

const initialstate = (gyms) ? gyms :
  [
    {
      equipement: {
        arms: [],
        back: [],
        chest: [],
        dumbells: [],
        legs: []
      },
      extra_services: [],
      images: [],
      location: {
        chords: '',
        text: ''
      },
      name: '',
      phone_number: [],
      reeviews: 0,
      schedule: '',
      stars: 0,
      suscription_price: 0,
      trainers: [
        {
          activity: '',
          name: '',
          schedule: ''
        }
      ]
    }
  ]

export const useGymsAdmin = create((set) => ({
  gymsAdmin: initialstate,
  // TODO: make functions to set state
  // set_gyms_admin: (set, payload) => {
  // }
}))
