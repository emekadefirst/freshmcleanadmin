// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, ordersPerPage, ordersLength, prevPage, nextPage }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Page Info */}
      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * ordersPerPage + 1} -{" "}
        {Math.min(currentPage * ordersPerPage, ordersLength)} of {ordersLength} orders
      </div>

      {/* Pagination Controls */}
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;