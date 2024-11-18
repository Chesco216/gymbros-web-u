import { create } from "zustand"

export const useGymsAdmin = create((set) => ({
  gymsAdmin: [],
  set_gyms_admin: (payload) => set({gymsAdmin: payload})
}))
