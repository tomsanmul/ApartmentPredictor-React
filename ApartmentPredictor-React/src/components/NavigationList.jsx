const Navigation = ({ onPageChange }) => {

  if (!onPageChange) return null;

  return (
    <div className="pagination">

      <button onClick={() => onPageChange(0)}>1</button>
      <button onClick={() => onPageChange(1)}>2</button>
      <button onClick={() => onPageChange(2)}>3</button>
      <button onClick={() => onPageChange(3)}>4</button>

    </div>
  );

};

export default Navigation;