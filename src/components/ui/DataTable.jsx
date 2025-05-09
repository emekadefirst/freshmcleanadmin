import React, { useState } from 'react';
import Pagination from "./pagination";

const DataTable = ({ data, columns, title, onRowClick, emptyMessage = "No data available yet" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white mt-4 border border-gray-300 rounded-lg overflow-x-auto px-3 py-4">
      {title && <h1 className="font-semibold text-lg mb-4">{title}</h1>}
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
            {columns.map((column, index) => (
              <th key={index} className="py-3 px-4">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getCurrentItems().length > 0 ? (
            getCurrentItems().map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-t border-gray-200 hover:bg-gray-50 text-sm ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-3 px-4">
                    {column.render
                      ? column.render(item)
                      : item[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 px-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / itemsPerPage)}
        ordersPerPage={itemsPerPage}
        ordersLength={data.length}
        prevPage={handlePrevPage}
        nextPage={handleNextPage}
      />
    </div>
  );
};

export default DataTable;