import classnames from 'classnames';

export const Categories = ({
    categoriesToDisplay,
    allCategories,
    selectedCategories,
    onClick
  }) => (
  <div className="flex gap-2 my-3">
    {categoriesToDisplay.map(categoryId => (
      <div
        key={categoryId}
        className={
          classnames(
            "p-0.5 shadow font-bold rounded text-xs bg-blue-300",
            { "bg-green-200": selectedCategories?.includes(categoryId) },
            { "cursor-pointer": !!onClick }
          )
        }
        onClick={(e) => {
          e.stopPropagation();
          onClick ? onClick(categoryId) : null;
        }
      }>
        {allCategories.find(categoryData => categoryData.id === categoryId)?.name || 'Unknown category'}
      </div>
    ))}
  </div>
);