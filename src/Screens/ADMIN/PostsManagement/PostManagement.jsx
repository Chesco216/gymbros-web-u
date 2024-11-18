import { Navbar } from '../../Common/Navbar'
import styles from './PostManagement.module.css'
import { PostForm } from './components/PostForm/PostForm'
import { PostGrid } from './components/PostGrid/PostGrid'
const posts = [
	{
		id: '1',
		title: 'title post',
		description: 'post description here',
		img: 'https://img.freepik.com/free-psd/gym-fitness-social-media-banner-instagram-post-template_106176-3939.jpg'
	},
	{
		id: '2',
		title: 'title post',
		description: 'post description here',
		img: 'https://img.freepik.com/free-psd/gym-fitness-social-media-banner-instagram-post-template_106176-3939.jpg'
	},
	{
		id: '3',
		title: 'title post',
		description: 'post description here',
		img: 'https://img.freepik.com/free-psd/gym-fitness-social-media-banner-instagram-post-template_106176-3939.jpg'
	},
	{
		id: '4',
		title: 'title post',
		description: 'post description here',
		img: 'https://img.freepik.com/free-psd/gym-fitness-social-media-banner-instagram-post-template_106176-3939.jpg'
	},
]

export const PostManagement = () => {

	return (
		<>
			<PostGrid posts={posts} />
			<PostForm />
		</>
	)
}

