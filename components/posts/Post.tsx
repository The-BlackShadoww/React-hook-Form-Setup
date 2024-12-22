"use client";

import { use } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

//! fetching data from an API in server component (Without the hook 'use')
// interface props {
//   post: Post[];
// }
// const Posts = ({ post }: props) => {
//   // const allPosts = use(post);

//   return (
//     <article>
//       <div className="size-full flex justify-center items-center p-20">
//         <ul className="flex flex-col items-center space-y-4">
//           {post?.map((p: Post) => (
//             <li key={p.id}>{p.title}</li>
//           ))}
//         </ul>
//       </div>
//     </article>
//   );
// };

// export default Posts;


//! fetching data from an API in server component (With the hook 'use')
interface props {
  // post: Post[];
  post: Promise<Post[]>;
}
const Posts = ({ post }: props) => {
  const allPosts = use(post);
  console.log(allPosts);

  return (
    <article>
      <div className="size-full flex justify-center items-center p-20">
        <ul className="flex flex-col items-center space-y-4">
          {allPosts?.map((p: Post) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default Posts;
