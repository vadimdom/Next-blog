import classnames from 'classnames';

export const SearchContainer = ({ filterTerm, onChange, onClear }) => (
  <div className="flex gap-24 items-center my-3">
    <input
      className="h-6 rounded p-0.5 shadow border"
      placeholder="Search by title"
      value={filterTerm}
      onChange={onChange}
    />
    <button
      className={classnames("cursor-pointer text-xs bg-rose-300 rounded p-0.5 shadow", { "invisible": !filterTerm })}
      onClick={onClear}
    >
      Clear
    </button>
  </div>
);
