interface CategoryListProps {
  onSelectCategory: (category: string) => void;
}

const catList = ['Salary', 'Freelancing', 'Groceries', 'Rent', 'Transport', 'Entertainment'];

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full absolute top-[100px] flex flex-col gap-4 justify-center bg-inputBackColor z-10">
      {catList &&
        catList.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => onSelectCategory(item)}
              className="flex border-b-2 p-2 text-[1.5rem]"
            >
              <p>{item}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CategoryList;
