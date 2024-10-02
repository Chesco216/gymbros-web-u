import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse'

export const getPosts = async () => {

	try {
		const res = await getDocs(collection(db, 'posts'))
		const posts = []
		res.forEach(doc => {
			const data = doc.data()
			const post = {
				id_gym: data.id_gym,
				description: data.description,
				img: data.img
			}

			posts.push(post)
		})

		return posts
	} catch (error) {
		console.error("Perra esta mal", error);

	}

}
