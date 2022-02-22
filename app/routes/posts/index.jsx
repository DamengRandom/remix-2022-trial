import { Link, Outlet, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    "posts": await db.post.findMany({
      take: 20,
      select: { id: true, title: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
  }
  return data;
};

export default function posts() {
  const { posts } = useLoaderData();

  return (
    <div>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to={'/posts/new'} className="btn">New Post</Link>
      </div>
      <div className="posts-list">
        {posts.map(({ id, title, createdAt }) => <div key={id}>
          <Link to={`/posts/${id}`}>
            <h4>{title}</h4>
            <h5>{new Date(createdAt).toLocaleDateString()}</h5>
          </Link>
        </div>)}
      </div>
      <Outlet />
    </div>
  )
}
