import { useEffect, useState } from "react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";

const InputComponent = ({
  title,
  keywords,
  preSelectedKeywords,
  setKeywords,
}) => {
  const [keys, setKeys] = useState(keywords);
  const [inputValue, setInputValue] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedKeywords(preSelectedKeywords);
    setKeys(keys.filter((kw) => !preSelectedKeywords.includes(kw)));
  }, [preSelectedKeywords]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setDropdownOpen(true);
  };

  const handleKeywordClick = (keyword) => {
    setInputValue("");
    setSelectedKeywords([...selectedKeywords, keyword]);
    setKeys(keys.filter((kw) => kw !== keyword));
    setDropdownOpen(false);

    //external Set
    setKeywords([...selectedKeywords, keyword]);
  };

  const handleRemoveKeyword = (keyword) => {
    const newKeywords = selectedKeywords.filter((kw) => kw !== keyword);
    setSelectedKeywords(newKeywords);
    setKeys([...keys, keyword]);

    //external Set
    setKeywords(newKeywords);
  };

  const filteredKeywords = keys
    .filter((keyword) =>
      keyword.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .sort();

  return (
    <div className="relative mb-4">
      <h2 className="text-lg font-semibold text-neutral-300">{title}</h2>
      <div className="flex flex-wrap items-center border border-neutral-700 bg-black p-2">
        {selectedKeywords.map((keyword) => (
          <div
            key={keyword}
            className="m-1 mr-1 flex items-center justify-center bg-neutral-700 px-2 py-1 text-center text-white"
          >
            {keyword}
            <button
              className="ml-1 focus:outline-none"
              onClick={() => handleRemoveKeyword(keyword)}
            >
              <XMarkIcon className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
        <input
          type="text"
          className="ml-2 flex-grow bg-transparent bg-black text-white focus:outline-none"
          placeholder="Search keywords..."
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setDropdownOpen(true)}
        />
        <ChevronDownIcon
          className={`h-5 w-5 ${
            dropdownOpen ? "rotate-180 transform" : ""
          } cursor-pointer text-gray-500`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      </div>
      {dropdownOpen && (
        <div className="top-full left-0 right-0 z-50 border-x border-b border-neutral-700 bg-black">
          <div className="flex flex-wrap">
            {filteredKeywords.map((keyword) => (
              <span
                key={keyword}
                className="m-1 w-fit cursor-pointer p-2 text-left text-base font-medium text-neutral-300 hover:bg-neutral-800"
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
