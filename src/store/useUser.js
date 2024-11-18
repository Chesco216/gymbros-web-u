import { create } from 'zustand'

const lc = localStorage.getItem('user')
const initialState = (lc) ? JSON.parse(lc)
	:
	null

export const useUser = create((set) => ({
	user: initialState,
	setUser: (payload) => set({ user: payload }),
	clearUser: () => set({ user: initialState })
}))

