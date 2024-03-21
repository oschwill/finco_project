import Calendar from '../icons/Calendar';
import SearchGlass from '../icons/SearchGlass';

interface SearchFunction {
  handleInputSearch: (input: string) => void;
}

const SearchTransaction: React.FC<SearchFunction> = ({ handleInputSearch }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchValue = (
      event.currentTarget.elements.namedItem('searchTransaction') as HTMLInputElement
    ).value;

    handleInputSearch(searchValue);
  };

  return (
    <div className="flex gap-4 items-center w-full">
      <form className="w-full " onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="searchTransaction"></label>
          <input
            type="text"
            name="searchTransaction"
            id="searchTransaction"
            className={` w-full p-4 rounded-[25px] text-[1.5rem] bg-inputBackColor`}
          />
          <button className="absolute right-5 bottom-4">
            <SearchGlass />
          </button>
        </div>
      </form>
      <div className="bg-inputBackColor rounded-full p-4">
        <Calendar />
      </div>
    </div>
  );
};

export default SearchTransaction;
