import { PostCard } from "../PostCard/PostCard"

export const PostGrid = ({ posts }) => {
	return (

		<section>
			<p>Publicaciones</p>
			<ul className="grid grid-cols-1 gap-2">
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
			</ul>
		</section>
	)
}
