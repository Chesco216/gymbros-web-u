import { PostCard } from "../PostCard/PostCard"

export const PostGrid = ({ posts }) => {
	return (
		<div>
			<p className='font-bold w-screen text-[30px] text-center my-[30px]'>Publicaciones</p>
			<div className="grid grid-cols-4">
				{
					posts.map((item) =>
						<PostCard
							key={item.id}
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
