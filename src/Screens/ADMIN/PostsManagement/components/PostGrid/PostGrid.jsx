import { PostCard } from "../PostCard/PostCard"

export const PostGrid = ({ posts }) => {
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
						/>
					)
				}
			</div>
		</div>
	)
}
