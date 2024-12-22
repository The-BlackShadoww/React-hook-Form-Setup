const url = "https://jsonplaceholder.typicode.com/posts";

const getPosts = async () => {
  const data = await fetch(url);
  const posts = await data.json();
  return posts;
};

export { getPosts };
