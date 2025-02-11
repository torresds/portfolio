import { ChangeEvent, KeyboardEvent } from 'react';

interface AutocompleteInputProps {
  value: string;
  suggestion: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  suggestion,
  onChange,
  onKeyDown,
  inputRef,
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 flex items-center pl-2 font-dos whitespace-pre select-none pointer-events-none">
        <span className="text-green-500">{value}</span>
        <span className="text-gray-500">{suggestion}</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        className="relative w-full bg-transparent text-transparent caret-white focus:outline-none pl-2 font-dos whitespace-pre"
      />
    </div>
  );
};

export default AutocompleteInput;
