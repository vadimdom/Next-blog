import data from '../../posts/data.json';
import { PAGE_SIZE } from '../../constants';

const getPosts = (req, res) => {
  const requestMethod = req.method;

  const pageNumber = Math.floor(req.query.page);
  const filterTerm = req.query.filterTerm ? req.query.filterTerm.toLowerCase() : '';
  const categories = req.query.categories;

  switch (requestMethod) {
    case 'GET':
      let postsToReturn = data.posts;

      if (filterTerm) {
        postsToReturn = postsToReturn.filter(post => post.title.toLowerCase().includes(filterTerm));
      }

      if (categories?.length) {
        postsToReturn = postsToReturn.filter(post => !!post.categories.filter(postCategory => categories.includes(postCategory)).length);
      }

      res.status(200).json({
        posts: postsToReturn
          .slice(pageNumber * PAGE_SIZE, pageNumber * PAGE_SIZE + PAGE_SIZE),
        isLastPage: pageNumber * PAGE_SIZE + PAGE_SIZE >= postsToReturn.length
      });
      break;
      
    default:
      res.status(200).json({ message: 'Welcome to posts API!'})
  }
};

export default getPosts;
