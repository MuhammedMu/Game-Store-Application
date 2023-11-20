import importedData from "../Js/importedData";
import { useContextGlobally } from "./StateProvider";

function Loading() {
  const { gear } = importedData;
  const { noSearchData } = useContextGlobally();

  return (
    <>
      {noSearchData ? (
        <div className="container flex w-screen h-screen justify-center overflow-hidden  mt-5 ">
          {/* Map over the placeholder data to render multiple game card placeholders */}
          <div className="flex h-[50%] items-center md:mr-40">
            <div className="text-xl md:text-3xl text-slate-400">
              No search data Found...
            </div>
            <div className="w-9">
              <img src={gear} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="container flex w-screen h-screen justify-center overflow-hidden  mt-5 ">
          {/* Map over the placeholder data to render multiple game card placeholders */}
          <div className="flex h-[50%] items-center md:mr-40">
            <div className="text-xl md:text-2xl text-slate-400">
              Fetching data...
            </div>
            <div className="w-9">
              <img src={gear} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Loading;
