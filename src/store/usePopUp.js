import { create } from "zustand";

export const usePopUp = create((set) => ({
  props: {
    isOpen: false,
    message: '',
    confirmed: false
  },
  setIsOpen: (payload) => set(state => ({props: {...state.props, isOpen: payload}})),
  setMessage: (payload) => set(state => ({props: {...state.props, message: payload}})),
  setConfirmed: (payload) => set(state => ({props: {...state.props, confirmed: payload}})),
}))
