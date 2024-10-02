import { create } from 'zustand'

const lc = localStorage.getItem('user')
const initialState = (user) ? 
    JSON.parse(lc)
  :
    {
      id: '',
      name: '',
      email: '',
    }

export const useUser = create((set) => ({
  user: initialState,
  setUser: (payload) => set({ user: payload }),
  clearUser: () => set({ user: initialState })
}))

