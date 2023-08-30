import Layout from '../../components/layout';
import { Categories } from '../../components/categories';
import Head from 'next/head';
import { getPostData, getCategories } from '../../lib/posts';
import { DEFAULT_POST_IMAGE } from '../../constants';

export async function getServerSideProps({ params }) {
  const postData = await getPostData(params.id);
  const categories = await getCategories();

  return {
    props: {
      postData,
      categories
    },
  };
};

const Post = ({ postData, categories }) => (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article className='w-2/4 h-96 mx-auto'>
      <img
        className='w-full max-w-xs rounded-lg h-48'
        src={postData.imageUrl}
        onError={(e) => e.target.src = DEFAULT_POST_IMAGE}
      />
      <Categories
        categoriesToDisplay={postData.categories}
        allCategories={categories}
      />
      <h1 className='text-base font-bold'>{postData.title}</h1>
      <p>{postData.excerpt}</p>
    </article>
  </Layout>
);

export default Post