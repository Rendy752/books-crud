const BookDetailItem = ({ label, value, className }) => {
  return (
    <p className={`text-gray-700 mb-2 ${className}`}>
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
};

export default BookDetailItem;
