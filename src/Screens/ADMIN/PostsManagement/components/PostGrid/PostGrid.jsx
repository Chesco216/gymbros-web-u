import { collection, getDocs, query, where } from "firebase/firestore"
import { PostCard } from "../PostCard/PostCard"
import { db } from "../../../../../firebase/firebasse"

export const PostGrid = ({ posts, setPosts }) => {

  const updatePosts = () => {
    const q = query(collection(db, 'posts'), where('is_Active', '==', true))
    getDocs(q).then(p => {
      const postArr = []
      p.forEach(docSnap => {
        const data = docSnap.data()
        postArr.push({...data, uid: docSnap.id})
      })
      setPosts(postArr)
    })
  }

  console.log({posts})

	return (
		<div className='w-[90%] h-fit mt-[20px] p-[40px] rounded-xl bg-primary'>
			<div className="grid grid-cols-4">
				{
					posts.map((item) =>
						<PostCard
							key={item.uid}
              uid={item.uid}
							img={item.img}
							description={item.description}
							title={item.title}
              updatePosts={updatePosts}
						/>
					)
				}
			</div>
		</div>
	)
}
