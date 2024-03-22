import { forwardRef } from 'react';
import Calendar from '../icons/Calendar';
import SearchGlass from '../icons/SearchGlass';
import DatePicker from 'react-datepicker';
import { CalendarButtonProps } from '@/lib/dataTypes';

/* CSS */
import 'react-datepicker/dist/react-datepicker.css';
import './SearchTransaction.css';

interface SearchFunction {
  handleInputSearch: (input: string, date?: Date) => void;
}

const SearchTransaction: React.FC<SearchFunction> = ({ handleInputSearch }) => {
  const CalendarButton = forwardRef<HTMLButtonElement, CalendarButtonProps>(
    ({ onClick, ...rest }, ref) => (
      <button onClick={onClick} ref={ref} {...rest}>
        <Calendar />
      </button>
    )
  );

  CalendarButton.displayName = 'CalendarButton';

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
        <DatePicker
          onChange={(date: Date) => handleInputSearch(null, date)}
          customInput={<CalendarButton />}
          maxDate={new Date()}
        />
      </div>
    </div>
  );
};

export default SearchTransaction;
