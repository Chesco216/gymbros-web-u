import { Navbar } from '../../Common/Navbar'
import styles from './PostManagement.module.css'
import { PostForm } from './components/PostForm/PostForm'
import { PostGrid } from './components/PostGrid/PostGrid'
import { UserLayout } from '../../Common/Layouts/UserLayout.jsx'
import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse.js'
import { useUser } from '../../../store/useUser.js'

export const PostManagement = () => {

  const user = useUser(state => state.user)
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    try {
      getDocs(collection(db, 'posts')).then(docs => {
        const postsArr = []
        docs.forEach(doc => {
          const data = doc.data()
          const post = {
            ...data,
            uid: doc.id
          }
          if(post.id_gym == user.id_gym) postsArr.push(post)
        });
        setPosts(postsArr)
      })
    } catch (error) {
      alert(error.code)
    }
  }, [])

  console.log({posts})

	return (
		<UserLayout>
			<h1 className='font-bold w-screen text-[30px] text-center my-[30px]'>Publicaciones</h1>
      <div className='w-full flex justify-center'>
        <PostGrid posts={posts} />
      </div>
      <div className='flex align-center justify-center'>
        <PostForm />
      </div>
		</UserLayout>
	)
}

