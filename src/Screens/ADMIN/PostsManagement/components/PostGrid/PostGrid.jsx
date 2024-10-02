import { PostCard } from "../PostCard/PostCard"

export const PostGrid = ({posts}) => {
  return (
    <div>
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
  )
}
