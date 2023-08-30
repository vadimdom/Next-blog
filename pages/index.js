import Head from 'next/head';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import Layout from '../components/layout';
import { PostCard } from '../components/postCard';
import { getCategories } from '../lib/posts';
import { Paginator } from '../components/paginator';
import { CategoriesContainer } from '../components/categoriesContainer';
import { SearchContainer } from '../components/searchContainer';

export async function getStaticProps() {
  const categories = await getCategories();

  return {
    props: {
      categories,
    }
  };
};

const Home = ({ categories }) => {
  const router = useRouter()
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);

  // Request posts on page, filterTerm or selectedCategories change
  useEffect(() => {
    const termQuery = filterTerm ? `&filterTerm=${filterTerm}` : '';
    const categoriesQuery = selectedCategories.length ? `&categories=${JSON.stringify(selectedCategories.map(categoryId => categoryId))}` : '';
    const getPosts = async () => {
      const response = await fetch(`/api/posts?page=${page}${termQuery}${categoriesQuery}`);
      return response.json();
    };
    getPosts().then((data) => {
      setPosts(data.posts);
      setIsLastPage(data.isLastPage);
    });
  }, [page, filterTerm, selectedCategories]);
  
  const handleCategorySelect = (categoryId) => {
    setPage(0);
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories(prevSelectedCategories => [...prevSelectedCategories, categoryId]);
    } else {
      setSelectedCategories(prevSelectedCategories => prevSelectedCategories.filter(selectedCategory => selectedCategory !== categoryId));
    }
  };

  return (
    <Layout home>
      <Head>
        <title>Blog</title>
      </Head>
      <section className='container flex flex-col'>
        <Paginator page={page} isLastPage={isLastPage} onPrev={() => setPage(p => p - 1)} onNext={() => setPage(p => p + 1)}/>
        <CategoriesContainer
          categoriesToDisplay={categories.map(category => category.id)}
          allCategories={categories}
          selectedCategories={selectedCategories}
          onClick={handleCategorySelect}
          onClear={() => {
            setPage(0);
            setSelectedCategories([]);
          }}
        />
        <SearchContainer
          filterTerm={filterTerm}
          onChange={e => {
            setPage(0);
            setFilterTerm(e.target.value);
          }}
          onClear={() => {
            setPage(0);
            setFilterTerm('');
          }}
        />
      </section>
      <section>
        <>
          {posts.length ? (
            <div className='container grid grid-cols-3 gap-x-2 gap-y-2'>
              {posts.map((postData) => (
                <PostCard
                  key={postData.id}
                  {...postData}
                  onClick={() => router.push(`/posts/${postData.id}`)}
                  allCategories={categories}
                  handleCategorySelect={handleCategorySelect}
                  selectedCategories={selectedCategories}
                />
              ))}
            </div>
          ) : <div className="my-3">No available posts</div>}
        </>
      </section>
      <Paginator page={page} isLastPage={isLastPage} onPrev={() => setPage(p => p - 1)} onNext={() => setPage(p => p + 1)}/>
    </Layout>
  );
};

export default Home;