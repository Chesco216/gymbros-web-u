import { create } from 'zustand'
import { getUsers } from '../services/getUsers'

const initialState = await getUsers()

export const useUserList = create((set) => ({
	userList: initialState,
	set_user_list: (payload, state) => {
		console.log(payload)
		const user_to_set = state.userList.filter((item) => item.ci == payload)
			(user_to_set) ? set({ userList: user_to_set }) : set({ userList: initialState })
	},
	reset_user_list: () => set({ userList: payload }),

}))
