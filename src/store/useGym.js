import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getDoc, collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase/firebasse';

export const useGym = create(
	devtools(
		persist(
			(set, get) => ({
				gyms: [],
				gym: {}, loading: false,
				error: null,
				filter: 'all',
				searchQuery: '',

				setGyms: (gyms) => set({ gyms }),

				setGym: (gym) => set({ gym }),

				setLoading: (loading) => set({ loading }),

				setError: (error) => set({ error }),

				setFilter: (filter) => set({ filter }),

				setSearchQuery: (query) => set({ searchQuery: query }),

				fetchGyms: async () => {
					set({ loading: true, error: null });
					try {
						const data = await getDocs(collection(db, 'gym'))
						const gyms = []
						data.forEach(doc => {
							const data = doc.data()
							if (data.name != '') gyms.push({
								...data,
								uid: doc.id,
								main_image: (data.images[0]) ? data.images[0] : 'https://lh5.googleusercontent.com/p/AF1QipNXg1AzcQU39ZEZy6rCDF4h8Nyo486qMbya9pbc=w426-h240-k-no'
							})
						})
						set({ gyms, loading: false });
					} catch (error) {
						console.error('Error fetching gyms:', error);
						set({ error: error.message, loading: false });
					}
				},

				fetchGymById: async (id) => {
					set({ loading: true, error: null });
					try {
						const gymDoc = await getDoc(doc(db, 'gyms', id));
						if (gymDoc.exists()) {
							set({ gym: { id: gymDoc.id, ...gymDoc.data() }, loading: false });
						} else {
							throw new Error('Gimnasio no encontrado');
						}
					} catch (error) {
						console.error('Error fetching gym:', error);
						set({ error: error.message, loading: false });
					}
				},

				filteredGyms: () => {
					const { gyms, filter, searchQuery } = get();
					let filtered = [...gyms];

					switch (filter) {
						case 'highest-rated':
							filtered.sort((a, b) => b.stars - a.stars);
							break;
						case 'lowest-price':
							filtered.sort((a, b) => a.suscription_price - b.suscription_price);
							break;
						case 'all':
						default:
							break;
					}

					if (searchQuery) {
						filtered = filtered.filter(gym =>
							gym.name.toLowerCase().includes(searchQuery.toLowerCase())
						);
					}

					return filtered;

				},
			}),
			{
				name: 'gym-storage',
				partialize: (state) => ({ gyms: state.gyms }),
			}
		)
	)
);
