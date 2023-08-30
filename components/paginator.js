import classnames from "classnames"

export const Paginator = ({ page, isLastPage, onPrev, onNext }) => (
  <div className='container my-3 w-96 flex items-center justify-between'>
    <button
      className={classnames('cursor-pointer text-xs bg-sky-200 rounded p-0.5 shadow', { 'cursor-auto opacity-60': page === 0 })}
      disabled={page === 0}
      onClick={onPrev}
    >
      Previous page
    </button>
    <p>Page: {page + 1}</p>
    <button
      className={classnames('cursor-pointer text-xs bg-sky-200 rounded p-0.5 shadow', { 'cursor-auto opacity-60': isLastPage })}
      disabled={isLastPage}
      onClick={onNext}
    >
      Next page
    </button>
  </div>
);
