import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post,deleteMutation }) {
  // replace with useQuery
  const {data,isLoading, isError,error} = useQuery({
    queryKey : ['exist-post',post.id],
    queryFn : () => fetchComments(post.id)
  });

  if(isLoading){
    return(
      <div>Loading ....</div>
    )
  }

  if(isError){
    return(
      <div>{error.toString()}</div>
    )
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)} >Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
