const Navigation = ({ totalPages, currentPage, onPageChange }) => {

  if (!totalPages) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);
  

  return (
    <div className="pagination">

      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            fontWeight: currentPage === page ? "bold" : "normal"
          }}
        >
          {page + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

    </div>
  );
};

export default Navigation;