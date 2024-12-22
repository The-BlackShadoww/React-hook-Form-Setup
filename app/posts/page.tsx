import Posts from "@/components/posts/Post";
import { getPosts } from "@/utils/getPosts";
import { Suspense } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

//! fetching data from an API in server component
// const url = "https://jsonplaceholder.typicode.com/posts";

// const page = async () => {
//   const data = await fetch(url);
//   const posts = await data.json();
//   console.log(posts);

//   return (
//     <article>
//       <div className="size-full flex justify-center items-center p-20">
//         <ul className="flex flex-col items-center space-y-4">
//           {posts?.map((p: Post) => (
//             <li key={p.id}>{p.title}</li>
//           ))}
//         </ul>
//       </div>
//     </article>
//   );
// };

// export default page;

//! fetching data from an API in server component using getPosts function
const PostPage = () => {
  const posts = getPosts();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts post={posts} />;
    </Suspense>
  );
};

export default PostPage;
