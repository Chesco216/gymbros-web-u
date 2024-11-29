import { create } from "zustand";

export const usePopUp = create((set) => ({
  props: {
    isOpen: false,
    message: ''
  },
  setIsOpen: (payload, state) => set({...state, isOpen: payload}),
  setMessage: (payload, state) => set({...state, message: payload})
}))
