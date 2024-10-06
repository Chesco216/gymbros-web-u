import { create } from 'zustand'
import { getUsers } from '../services/getUsers'

const initialState = await getUsers()

export const useUserList = create((set) => ({
	userList: initialState,
	set_user_list: (payload, state) => {
		console.log(payload)
		//WARN: userList is undefined
		const user_to_set = state.userList.filter((item) => item.ci == payload)
			(user_to_set) ? set({ userList: user_to_set }) : set({ userList: initialState })
		// set({ user: payload }),
	},
	reset_user_list: () => set({ userList: payload }),

}))
