export const PostCard = ({ img, description, title }) => {
	return (
		<span className="py-5 px-5 border-4 border-black rounded-lg mx-[30px]">
			<img className='w-[400px]' src={img} />
			<h3>{title}</h3>
			<p>{description}</p>
		</span>
	)
}

