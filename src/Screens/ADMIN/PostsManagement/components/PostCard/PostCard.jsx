export const PostCard = ({ img, description, title }) => {
	return (
		<li className="px-2 bg-black">
			<img src={img} />
			<h3>{title}</h3>
			<p>{description}</p>
		</li>
	)
}

