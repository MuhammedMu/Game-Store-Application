import importedData from "../Js/importedData";
import { useContextGlobally } from "./StateProvider";

const { searchIcon } = importedData;
function Search() {
  const { search } = useContextGlobally();

  return (
    <>
      {/* Search container */}
      <div className="container flex  z-10 absolute w-full  md:w-[30%] mt-16 md:mt-5 md:ml-[35%]  h-9  ">
        <div>
          {/* Search button */}
          <button className="absolute ml-[85%] md:ml-[85%] lg:ml-[90%] xl:ml-[92%]  mt-[6px]  box-border rounded-e-full w-8 focus:border-e-slate-700 ">
            {/* Search icon */}
            <img src={searchIcon} alt="search-icon" className="w-6 " />
          </button>
        </div>
        {/* Search input field */}
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          className="bg-transparent border overflow-hidden w-[90%] md:w-full  mx-auto rounded-full outline-none focus:border-2 focus:border-blue-500 pl-7 text-white"
          onChange={(e) => {
            // Update search state with the input value
            console.log(e.target.value);
            search(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default Search;
