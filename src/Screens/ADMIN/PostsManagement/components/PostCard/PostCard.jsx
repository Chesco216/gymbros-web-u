import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../../firebase/firebasse'

export const PostCard = ({ uid, img, description, title, updatePosts }) => {

  const handleDeletePost = async() => {
    console.log('post deleted', uid)
    await setDoc(doc(db, 'posts', uid), { is_Active: false })
    updatePosts()
  }

	return (
		<span className="h-fit overflow-hidden bg-white rounded-lg mx-[30px]">
			<img className='w-[400px] max-h-[300px] oveflow-hidden' src={img} />
			<h3 className='font-bold text-[20px] mx-[20px] my-[10px]'>{title}</h3>
			<p className='font-light mx-[20px]'>{description}</p>
      <div className='w-full flex justify-end'>
        <button
          className='my-[20px] mr-[20px] bg-primary font-semibold text-[18px] text-white py-[8px] px-[10px] rounded'
          onClick={() => handleDeletePost()}
        >
          Eliminar
        </button>
      </div>
		</span>
	)
}
