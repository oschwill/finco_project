interface CategoryList {
  showCategoryList: boolean;
  handleShowCategoryList: () => void;
}

const Arrow: React.FC<CategoryList> = ({ showCategoryList, handleShowCategoryList }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      className={`${showCategoryList && 'rotate-90'}`}
      onClick={handleShowCategoryList}
    >
      <path
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="m8 15 7.5-5-7.5-5"
      />
    </svg>
  );
};

export default Arrow;
