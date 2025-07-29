import { useState, useEffect } from 'react';
import { Trash2, Search, Star } from 'lucide-react';
import { useTestimonyStore } from '../../store/testimonyStore';
import { toast } from 'react-toastify';

const TestimoniesTab = () => {
  const { testimonies, loading, fetchTestimonies, deleteTestimony } = useTestimonyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTestimony, setDeletingTestimony] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTestimonies();
  }, [fetchTestimonies]);

  const handleDeleteClick = (testimony) => {
    setDeletingTestimony(testimony);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deletingTestimony) return;
    
    setDeleting(true);
    try {
      await deleteTestimony(deletingTestimony.id);
      toast.success('Testimony deleted successfully');
      setShowDeleteModal(false);
      setDeletingTestimony(null);
    } catch (error) {
      toast.error('Failed to delete testimony');
    } finally {
      setDeleting(false);
    }
  };

  const filteredTestimonies = testimonies.filter(testimony =>
    testimony.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimony.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimony.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTestimonies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTestimonies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search testimonies..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Read-only: Users submit testimonies
        </div>
      </div>

      {/* Testimonies List */}
      {loading ? (
        <div className="text-center py-8">Loading testimonies...</div>
      ) : (
        <div>
          <div className="space-y-4">
            {currentItems.map((testimony) => (
              <div
                key={testimony.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimony.title}
                      </h3>
                      {testimony.category && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {testimony.category}
                        </span>
                      )}
                    </div>

                    {testimony.rating && (
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(testimony.rating)}
                        <span className="text-sm text-gray-600 ml-2">
                          ({testimony.rating}/5)
                        </span>
                      </div>
                    )}

                    <p className="text-gray-600 line-clamp-3 mb-2">
                      {testimony.content}
                    </p>

                    <div className="text-sm text-gray-500">
                      {testimony.author && <span>By: {testimony.author}</span>}
                      {testimony.created_at && (
                        <span className="ml-4">
                          {new Date(testimony.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleDeleteClick(testimony)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Delete testimony"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {currentItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No testimonies found.{" "}
                {searchQuery
                  ? "Try adjusting your search."
                  : "No testimonies submitted yet."}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredTestimonies.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredTestimonies.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredTestimonies.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={i}
                          onClick={() => paginate(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                            currentPage === pageNum
                              ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() =>
                        paginate(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Delete Testimony
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete the testimony{" "}
                <strong>"{deletingTestimony?.title}"</strong>?
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {deleting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingTestimony(null);
                }}
                disabled={deleting}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimoniesTab;