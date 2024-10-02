import styles from './PostManagement.module.css'
import { PostGrid } from './components/PostGrid/PostGrid'

export const PostManagement = () => {

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

  return (
    <div className={styles.container}>
      <PostGrid posts={posts}/>
    </div>
  )
}

