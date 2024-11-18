import { create } from 'zustand'

export const useGym = create((set) => ({
	gyms: [],
	set_gyms: (payload) => set({ gyms: payload }),
}))
