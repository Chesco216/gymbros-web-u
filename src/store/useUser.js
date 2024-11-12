import { create } from 'zustand'
import { getUserFb } from '../Screens/Profile/services/getUserFb'

const lc = localStorage.getItem('user')
const id = (lc) ? lc.replaceAll('"', '') : null

const initialState = (id) ? getUserFb(id).then()
	:
	null

export const useUser = create((set) => ({
	user: initialState,
	set_user: (payload) => set({ user: payload }),
	clear_user: () => set({ user: initialState })
}))
