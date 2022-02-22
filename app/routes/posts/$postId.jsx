import { Link, redirect, useParams, useLoaderData } from "remix"
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const thePost = await db.post.findUnique({
    where: {
      id: params.postId
    }
  });

  if (!thePost) throw new Error('Post was not found ..');

  const data = { post: thePost };

  return data;
}

export const action = async ({ request, params }) => {
  const form = await request.formData();

  if (form.get('_method') === 'delete') {
    const thePost = await db.post.findUnique({
      where: {
        id: params.postId
      }
    });
  
    if (!thePost) throw new Error('Post was not found ..');

    await db.post.delete({
      where: {
        id: params.postId
      }
    });

    return redirect('/posts');
  }
}

export default function Post() {
  const params = useParams();
  const { post: { title, body } } = useLoaderData();

  return (
    <div>
      <div className="page-header">
        <h3>{ title }</h3>
        <span>Post: {params.postId}</span>
        <Link to="/posts" className="btn btn-reverse">Back</Link>
      </div>
      <div className="page-content">
        <p>{ body }</p>
      </div>
      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">Delete</button>
        </form>
      </div>
    </div>
  )
}
