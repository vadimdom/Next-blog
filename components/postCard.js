import { Categories } from "./categories";
import { DEFAULT_POST_IMAGE } from '../constants';

export const PostCard = ({
    title,
    excerpt,
    imageUrl,
    categories,
    onClick,
    handleCategorySelect,
    allCategories,
    selectedCategories,
  }) => (
    <div
      className='cursor-pointer shadow hover:opacity-90 hover:shadow-lg hover:translate-y-px max-w-xs h-96 rounded-lg'
      onClick={onClick}
    >
    <img
      className='w-full rounded-t-lg h-48'
      src={imageUrl}
      onError={(e) => e.target.src = DEFAULT_POST_IMAGE}
    />
    <div className='p-3'>
      <Categories
        categoriesToDisplay={categories}
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        onClick={handleCategorySelect}
      />
      <p className='text-base font-bold'>{title}</p>
      <span className='text-xs'>{excerpt}</span>
    </div>
  </div>
);