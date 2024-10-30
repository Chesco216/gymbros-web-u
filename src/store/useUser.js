import { create } from 'zustand'

const lc = localStorage.getItem('user')
const initialState = (lc) ? JSON.parse(lc)
	:
	null

export const useUser = create((set) => ({
	user: initialState,
	set_user: (payload) => set({ user: payload }),
	clear_user: () => set({ user: initialState })
}))

