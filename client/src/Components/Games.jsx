import React, { useEffect, useState } from "react";
import { useContextGlobally } from "./StateProvider";
import importedData from "../Js/importedData";
import { RxDotFilled } from "react-icons/rx";
import axios from "../Js/axios"; // Import the Axios library from the "axios" module.
import Loading from "./Loading";

function Games(props) {
  // Access functions and data from a custom context using useContextGlobally
  const { add, allGames, filterdData } = useContextGlobally();
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [modalData, setModalData] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [gameDetail, setGameDetail] = useState(null);
  const [descriptionLoading, setDescriptionLoading] = useState(true);

  // Destructure imported data and functions
  const {
    star,
    calander,
    forward,
    backward,
    x_button,
    storeData,
    platformData,
    addToCart,
    flame,
  } = importedData;

  // Function to open the modal dialog and set the selected game
  function open(id) {
    try {
      detail(id);

      // If the product already exists in the cart, update its count

      let selectedGame = allGames?.find((product) => product.id === id);
      setModalData(selectedGame);

      setSlides(selectedGame?.short_screenshots);

      const dialog = document.querySelector("dialog");
      dialog.showModal(); // Opens a modal dialog
    } catch (error) {
      console.error("Error in open function:", error);
    }
  }

  // Function to close the modal dialog
  function close() {
    const dialog = document.querySelector("dialog");
    dialog.close(); // Closes the dialog
    setCurrentIndex(0);
  }

  function detail(gameID) {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/games/${gameID}?key=${API_KEY}&dates=2022-01-01,2023-01-01`
        );
        setGameDetail(response.data);
        setDescriptionLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }

  // console.log("currentIndex " + currentIndex);
  // console.log("slides.length " + slides.length - 1);

  // Function to go to the next slide in the modal
  function nextSlide() {
    currentIndex === slides.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex((currentIndex) => currentIndex + 1);
  }

  function previousSlide() {
    currentIndex === 0
      ? setCurrentIndex(() => slides.length - 1)
      : setCurrentIndex((currentIndex) => currentIndex - 1);
  }

  return (
    <>
      {/* Search section */}
      <section className="game">
        <div className="container md:flex gap-5 w-auto mx-auto   mt-5  ">
          <div className="grid w-full grid-cols-1    gap-4 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  ">
            {/* Mapping over filtered games */}
            {filterdData?.map((single) => {
              return (
                <div key={single?.name}>
                  {/* Game card */}
                  <div className=" md:w-[320px] lg:w-[320px] xl:w-[320px] h-[325px]   bg-slate-800 border border-blue-950 rounded-3xl  hover:transform hover:transition-transform duration-1000 hover:scale-105 ">
                    {/* Game background image */}
                    <div className="flex hover:cursor-pointer w-full h-[52%] box-border justify-center ">
                      <img
                        className="flex w-full  rounded-t-2xl object-cover"
                        src={single?.background_image}
                        alt="background-image"
                        onClick={() => open(single?.id)}
                      />
                    </div>

                    {/* Game Details */}
                    <div className="relative bottom-2 end-0  ml-4">
                      {/* Platform icons */}
                      <div className="flex mt-4  justify-between ">
                        <div className="flex gap-1 items-center ">
                          {single?.platforms?.map((single, i) => {
                            return (
                              <div key={i}>
                                {platformData?.map(
                                  (singlePlatformData, index) => {
                                    if (
                                      single.platform.name ===
                                      singlePlatformData.name
                                    ) {
                                      return (
                                        <img
                                          key={index}
                                          className=" w-4 "
                                          src={singlePlatformData.image}
                                          alt="playstation-icon"
                                        />
                                      );
                                    }
                                  }
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Game price */}
                        <div className="flex items-center justify-center ">
                          <div className="flex text-white bg-gradient-to-tl from-blue-700 to-blue-900 w-20 h-7 justify-center mr-4 font-medium items-center rounded-lg">
                            {/* ${" "} */}
                            <div className=" flex text-white gap-1 items-center justify-center">
                              <div className="text-yellow-400 text-xl"> $ </div>
                              {single?.playtime}.99
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" mt-1">
                        {/* Game title */}
                        <h1 className="text-white font-semibold text-xl truncate">
                          {single?.name}
                        </h1>
                        {/* Game rating */}
                        <div className="flex">
                          <div className="flex space-x-2 mt-1  items-center  w-[80%]   text-blue-400">
                            <img
                              className="w-3"
                              src={star}
                              alt="first-star-icon"
                            />
                            <img
                              className="w-3"
                              src={star}
                              alt="second-star-icon"
                            />
                            <img
                              className="w-3"
                              src={star}
                              alt="third-star-icon"
                            />
                            <img
                              className="w-3"
                              src={star}
                              alt="fourth-star-icon"
                            />
                            <h1 className="text-white text-xs">
                              ({single?.rating})
                            </h1>
                          </div>
                          {/* Game metacritic / popularity */}
                          <div className="flex gap-1 text-amber-400 text-[14px] bg-slate-800 w-7 h-7 justify-center    items-center rounded-full">
                            <img src={flame} width={"18px"} alt="" />
                            {single?.metacritic}
                          </div>
                        </div>

                        {/* Game releaded date */}
                        <div className="flex text-white bg-slate-700 w-[115px] text-sm h-7 items-center  my-3 rounded-xl">
                          <div className="flex pl-2 space-x-1 justify-center items-center">
                            <img
                              src={calander}
                              alt="calender-icon"
                              width={"19x"}
                            />
                            <p className="text-xs w-40 pl-1 ">
                              {single?.released}
                            </p>
                          </div>

                          <div className="w-60 ">
                            {/* Add to cart button */}
                            <button
                              onClick={() =>
                                add(
                                  single?.background_image,
                                  single?.name,
                                  single?.playtime
                                )
                              }
                            >
                              <div className=" absolute end-4 bottom-0 bg-gradient-to-tl from-red-700 to-red-900 text-base   px-3   h-7 text-white   rounded-2xl shadow-3xl transform transition-transform duration-300 hover:scale-105">
                                <div className="flex  w-full h-full justify-center items-center text-sm gap-2">
                                  <div className="flex items-center gap-1 text-xs">
                                    <img
                                      src={addToCart}
                                      width={"18px"}
                                      alt="add-to-cart-icon"
                                    />
                                    <div>Add to cart</div>
                                  </div>
                                </div>
                              </div>
                            </button>
                            {/* End of Add to cart button */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ########################################################  */}
        {/* ########################################################  */}
        {/* ########################################################  */}
        {/* ########################################################  */}
        {/* ########################################################  */}
        {/* ########################################################  */}

        {/* Modal dialog for displaying the selected game */}

        <dialog className=" w-full h-[86%]  md:w-[80%] md:h-[97%] rounded-xl overflow-hidden m-auto  bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 ">
          {/* Modal content */}
          <div className="md:flex md:items-center md:w-full md:h-full overflow-y-auto ">
            {/* Game Image and slides  */}
            <div className="flex items-center md:h-full ">
              <div className="md:ml-11 md:my-auto ">
                {/* Close button */}
                <button
                  className="absolute z-10 end-4 top-4 text-white transform transition-transform duration-300 hover:scale-105"
                  onClick={() => close()}
                >
                  <span className="sr-only">Close cart</span>
                  <img
                    className="h-7 w-7 bg-blue-700 hover:object-scale-down border-2 border-blue-700 rounded-full p-1 hover:border-red-500"
                    src={x_button}
                    alt="x-icon"
                  />
                </button>

                {/* Background image */}
                <img
                  className="relative w-full  md:w-[650px] object-cover mx-auto rounded-2xl "
                  src={modalData?.short_screenshots[currentIndex]?.image}
                  alt="screen-shots"
                />
                {/* Navigation buttons */}
                <div className=" absolute z-20 flex px-5 md:px-0 top-[18%]  md:top-[45%] md:start-[65px] w-full md:w-[48%]  justify-between mx-auto ">
                  <div>
                    {/* Previous slide button */}
                    <button
                      className="flex rounded-full items-center  bg-black/50 text-white cursor-pointer h-6 w-6 md:h-8 md:w-8 pl-1 "
                      onClick={() => previousSlide()}
                    >
                      {/* Left arrow icon */}

                      <img
                        src={backward}
                        className="w-4 md:w-5"
                        alt="previous-icon"
                      />
                    </button>
                  </div>

                  <div>
                    {/* Next slide button */}
                    <button
                      className="flex rounded-full items-center  bg-black/50 text-white cursor-pointer h-6 w-6 md:h-8 md:w-8 pl-1 md:pl-2"
                      onClick={() => nextSlide()}
                    >
                      {/* Right arrow icon */}
                      <img
                        src={forward}
                        className="w-4 md:w-5"
                        alt="next-icon"
                      />
                    </button>
                  </div>
                </div>

                {/* Image slides */}
                <div className="  text-2xl cursor-pointer right-0 left-0  w-48 mx-auto text-slate-300 top-[42%] md:top-[62%] h-5 mt-1 md:mt-3">
                  <div className=" rounded-full items-center flex mx-auto w-[180px] h-[15px] justify-center">
                    {/* Mapping over slides */}
                    {slides?.map((single, index) => {
                      let colorSelected;
                      index === currentIndex
                        ? (colorSelected = "text-blue-400")
                        : (colorSelected = null);

                      return (
                        <div className={colorSelected} key={index}>
                          <RxDotFilled onClick={() => setCurrentIndex(index)} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Game details */}
            <div className="h-[215px] md:w-[45%] md:h-3/4">
              {/* Selected game title */}
              <div className=" space-x-2 ml-3 md:ml-8 mt-2 md:mt-9 md:w-[80%] text-blue-400">
                <div className="flex absolute end-5 items-center justify-center ">
                  <div className="flex text-white bg-gradient-to-tl from-blue-700 to-blue-900 w-[70px] md:w-20 h-6 md:h-[30px] justify-center mr-4 font-medium items-center rounded-lg">
                    <div className=" flex text-white items-center gap-1  mx-auto before:inset-0 w-full h-1/2 justify-center text-sm">
                      <div className="text-yellow-400  md:text-xl">$</div>
                      {modalData?.playtime}.99
                    </div>
                  </div>
                </div>
                <h1 className="text-white font-bold w-[70%]  md:text-2xl ">
                  {modalData?.name}
                </h1>
              </div>

              {/* Game detail description  */}
              <div className="mx-auto flex items-center flex-wrap overflow-y-scroll  scrollbar-thin md:scrollbar-thumb-rounded-md md:scrollbar-thumb-slate-400  scrollbar-track-slate-600 scrollbar-track-rounded-full py-1 w-[88%] h-[80%]  md:h-[45%]  md:pl-2  md:pr-1  my-2 text-[10px] md:text-sm text-slate-300 ">
                {descriptionLoading ? (
                  <div className="fixed top-[190px] left-0 md:top-[95px] md:left-[420px]  ">
                    <Loading />
                  </div>
                ) : (
                  gameDetail?.description_raw
                )}
              </div>

              {/* Platform icons for the selected game */}
              <div className="flex gap-1 ml-5 md:ml-10 mt-3 items-center   w-[100%]   text-blue-400">
                <h1 className="text-[10px] md:text-sm mr-2">Platforms : </h1>
                {modalData?.platforms?.map((single, index) => {
                  return (
                    <h1 className="" key={index}>
                      {platformData?.map((singlePlatformData, index) => {
                        if (single.platform.name === singlePlatformData.name) {
                          return (
                            <img
                              key={index}
                              className="w-3 md:w-4 "
                              src={singlePlatformData.image}
                              alt="playstation"
                            />
                          );
                        }
                      })}
                    </h1>
                  );
                })}
              </div>

              {/* Rating */}
              <div className="flex space-x-2 ml-5 md:ml-10 mt-2 items-center  w-[80%]   text-blue-400">
                <h1 className="text-[10px] md:text-sm ">Rating :</h1>
                {/* Star icons */}
                <img className="w-3" src={star} alt="first-star-icon" />
                <img className="w-3" src={star} alt="second-star-icon" />
                <img className="w-3" src={star} alt="third-star-icon" />
                <img className="w-3" src={star} alt="fourth-star-icon" />
                <h1 className=" text-[10px] md:text-sm  text-white">
                  ({modalData?.rating})
                </h1>
              </div>

              {/* Genres */}
              <div className="flex gap-3  md:space-x-1 ml-5 md:ml-10 mt-1 md:mt-2  overflow-scroll md:overflow-x-hidden  w-[900px] md:w-[1200px]   text-blue-400">
                <span className="text-[10px] md:text-sm ">Genres :</span>
                {modalData?.genres?.map((single, i) => {
                  return (
                    <span
                      className="text-slate-200 text-[10px] md:text-sm  "
                      key={i}
                    >
                      {single.name}
                    </span>
                  );
                })}
              </div>

              {/* Stores */}
              <div className="flex gap-3  md:space-x-1 ml-5 md:ml-10 mt-1 md:mt-2  overflow-x-scroll md:overflow-x-hidden  w-[900px] md:w-[1200px]   text-blue-400 ">
                <div className="text-[10px] md:text-sm  flex">Stores :</div>
                {/* Store names and icons */}
                {modalData?.stores?.map((single, i) => {
                  return (
                    <span
                      className="text-slate-200 text-[10px] md:text-sm  md:flex "
                      key={i}
                    >
                      <div className="flex space-x-2">
                        <span className="flex-nowrap">{single.store.name}</span>
                        {storeData?.map((singleStoreData, index) => {
                          if (single.store.name === singleStoreData.name) {
                            return (
                              <img
                                key={index}
                                className=" w-3 md:w-4 ml-2"
                                src={singleStoreData.image}
                              />
                            );
                          }
                        })}
                      </div>
                    </span>
                  );
                })}
              </div>

              {/* Tags  */}
              <div className="md:flex gap-3 space-x-1  ml-5 md:ml-10 md:overflow-hidden md:overflow-x-hidden w-[900px] md:mt-2   md:w-[80%] overflow-x-scroll   text-blue-400">
                <span className="text-[10px] md:text-sm ">Tags : </span>
                {modalData?.tags?.map((single, i) => {
                  if (single?.language == "eng" && i <= 2) {
                    return (
                      <span
                        className="text-slate-200 text-[10px] md:text-sm  "
                        key={i}
                      >
                        # {single?.name}
                      </span>
                    );
                  }
                })}
              </div>

              {/* Release date and Add to cart button */}
              <div className="w-11/12 mt-3 mx-auto  md:ml-9">
                <div className="flex w-12/12 mx-auto justify-between items-center">
                  <div className="flex text-white bg-slate-700 w-24 md:w-28 text-[10px] md:text-sm h-6 md:h-8 items-center  rounded-full justify-center ">
                    {/* Release date */}
                    <div className="flex pl-12  space-x-1 justify-center items-center">
                      <img src={calander} alt="calender-icon" width={"13px"} />
                      <p className="pl-1 text-[10px] mx-auto md:text-xs w-32 ">
                        {modalData?.released}
                        {/* {single?.released.slice(0, 4)} */}
                      </p>
                    </div>
                  </div>
                  <div className="">
                    {/* Add to cart button for the selected game */}
                    <button
                      onClick={() =>
                        add(
                          single?.background_image,
                          single?.name,
                          single?.playtime
                        )
                      }
                    >
                      <div className="bg-gradient-to-tl from-red-700 to-red-900 text-base  w-24 md:w-28  h-6 md:h-8 text-white   rounded-2xl shadow-3xl transform transition-transform duration-300 hover:scale-105 md:mr-6">
                        <div className="flex  w-full h-full justify-center items-center text-sm gap-2">
                          <div className="flex items-center gap-1 text-[10px] md:text-xs">
                            <img
                              src={addToCart}
                              width={"20px"}
                              alt="add-to-cart-icon"
                            />
                            <div>Add to cart</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
}

export default Games;
