import data from '../posts/data.json';

export const getPostData = async (id) => {
  return data.posts.find(post => `${post.id}` === id);
};

export const getCategories = async () => {
  return data.categories;
};
