import { Navbar } from '../../Common/Navbar'
import styles from './PostManagement.module.css'
import { PostForm } from './components/PostForm/PostForm'
import { PostGrid } from './components/PostGrid/PostGrid'
import { UserLayout } from '../../Common/Layouts/UserLayout.jsx'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse.js'
import { useUser } from '../../../store/useUser.js'

export const PostManagement = () => {

  const user = useUser(state => state.user)
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    try {
      const q = query(collection(db, 'posts'), where('is_Active', '==', true))
      getDocs(q).then(docs => {
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

  const updatePosts = () => {
    const q = query(collection(db, 'posts'), where('is_Active', '==', true))
    getDocs(q).then(p => {
      const postArr = []
      p.forEach(docSnap => {
        const data = docSnap.data()
        postArr.push(data)
      })
      setPosts(postArr)
    })
  }

	return (
		<UserLayout>
			<h1 className='font-bold w-screen text-[30px] text-center my-[30px]'>Publicaciones</h1>
      <div className='w-full flex justify-center'>
        <PostGrid posts={posts} setPosts={setPosts} />
      </div>
      <div className='flex align-center justify-center'>
        <PostForm updatePosts={updatePosts}/>
      </div>
		</UserLayout>
	)
}

