export const PostCard = ({img, description, title}) => {
  return (
    <div>
      <img src={img}/>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

