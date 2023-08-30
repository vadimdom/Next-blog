import classnames from 'classnames';
import { Categories } from './categories';

export const CategoriesContainer = ({ onClear, selectedCategories, ...props }) => (
  <div className="flex gap-24">
    <Categories selectedCategories={selectedCategories} {...props} />
    <button
      className={classnames("cursor-pointer text-xs bg-rose-300 rounded p-0.5 my-3 shadow", { "invisible": !selectedCategories.length })}
      onClick={onClear}
    >
      Deselect all
    </button>
  </div>
);
