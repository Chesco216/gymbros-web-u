import { create } from 'zustand'


const useGym = create((set) => ({
	gyms: [],
	setGym: () => set((state) => ({})),
}))
