import React, { useEffect, useState } from "react";
import importedData from "../Js/importedData";
import { collection, getDocs } from "firebase/firestore";
import db from "../Js/firebase";
import Sidebar from "./Sidebar";
import { useContextGlobally } from "./StateProvider";

function Orders() {
  const { calander, download, checked } = importedData;
  const [paidGames, setPaidGames] = useState([]);
  const { toogle } = useContextGlobally();

  const colRef = collection(db, "games");

  // Get collection Data

  // useEffect(() => {
  //   let games = [];

  //   getDocs(colRef)
  //     .then((snapshots) => {
  //       snapshots.docs.forEach((doc) => {
  //         games.push({ ...doc.data(), id: doc.id });
  //       });
  //       console.log("games ↓");
  //       console.log(games);

  //       // Extract cartWithTimeAndUser arrays into a new object
  //       let extractedArray = games
  //         .map((item) => item.cartWithTimeAndUser)
  //         .flat();

  //       console.log("extractedArray ↓");
  //       console.log(extractedArray);

  //       const userID = localStorage.getItem("userID");

  //       console.log(extractedArray);

  //       console.log(userID);

  //       const newExtractedArray = extractedArray.filter((item) => {
  //         return item.userID === userID;
  //       });

  //       console.log(newExtractedArray);

  //       // console.log(games);
  //       setPaidGames(newExtractedArray);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshots = await getDocs(colRef);
        const userID = localStorage.getItem("userID");

        console.log("snapshots ↓");
        console.log(snapshots);

        const extractedArray = snapshots.docs
          .map((doc) => doc.data().cartWithTimeAndUser)
          .flat();

        console.log("extractedArray ↓");
        console.log(extractedArray);

        const newExtractedArray = extractedArray.filter(
          (item) => item.userID === userID
        );
        setPaidGames(newExtractedArray);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" pt-16 -z-50 bg-gradient-to-r from-slate-950 via-slate-800 to-red-950 w-full h-screen">
      <div className=" w-[95%]  lg:w-[75%]   mx-auto  ">
        <div className="pr-5 scrollbar-thin lg:scrollbar-thumb-rounded-md lg:scrollbar-thumb-slate-400  scrollbar-track-slate-600 scrollbar-track-rounded-full md:mt-4  h-[500px] md:h-[570px] lg:h-[620px]  overflow-auto ">
          {paidGames.length == 0 ? (
            <h1 className=" w-fit mx-auto text-slate-500  relative text-xl lg:text-2xl  top-1/2  font-bold ">
              No Purchased Items
            </h1>
          ) : null}
          <div className="text-white font-bold mt-4 mb-5 ml-5 text-3xl">
            My Games
          </div>
          <ul className=" space-y-3  pt-1 rounded-xl items-center mb-5">
            <div className="hidden md:flex lg:w-full justify-around  font-bold lg:text-xl text-blue-500">
              <div className="md:ml-12">Game</div>
              <div className="md:ml-60">Price</div>
              <div className="">Date / Time</div>
              <div className="">Status</div>
              <div>Downolad</div>
            </div>
            {/* Displaying items in the cart */}
            {paidGames?.map((single, index) => {
              return (
                <li
                  className="flex shadow-lg  shadow-black   w-full h-[100px]   items-center bg-gradient-to-tl from-cyan-800 to-cyan-950 rounded-xl "
                  key={index}
                >
                  <div className="flex  w-48 h-[90%] justify-center ">
                    <img
                      className="flex rounded-md object-cover"
                      src={single?.image}
                      alt=""
                    />
                  </div>

                  <div className="  w-full md:w-[90%]    px-2 my-auto  md:h-[90%] justify-between md:flex lg:mt-1 items-center  m-auto  ">
                    <div className="flex items-center  justify-between  md:w-60 xl:w-80  text-[10px] text-white ">
                      {/* Item name */}
                      <h3 className="text-white text-sm lg:text-[16px]  md:w-48 lg:w-64 lg:pl-5  font-medium ">
                        {single?.name}
                      </h3>

                      {/* Item price */}
                      <div className="flex  md:w-20 lg:w-24">
                        {/* <div className="text-sm lg:text-lg">Price:</div> */}
                        <div className="text-sm lg:text-[16px]  text-blue-400 flex gap-1  ml-2">
                          <div className="text-yellow-400 text-sm lg:text-xl">
                            $
                          </div>
                          <div className="text-white text-sm lg:text-lg">
                            {single?.price}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex  md:w-[70%] lg:w-[55%] lg:mr-7  items-center justify-between">
                      {/* increment decrement button  */}
                      <div className="flex gap-1 lg:gap-3 items-center lg:justify-end text-white">
                        <img src={calander} className="w-5 lg:w-7" alt="" />
                        <div className="text-xs lg:text-[14px]">
                          {single?.time}
                        </div>
                      </div>

                      <div className="flex lg:gap-2 items-center lg:justify-end text-white ">
                        {/* <div className="text-sm lg:text-[15px]">Paid</div> */}
                        <img className="w-3 lg:w-6" src={checked} alt="" />
                        <div className="text-xs lg:text-base">Paid</div>
                      </div>

                      <a
                        download
                        href="../assets/Images/file/MinecraftInstaller.zip"
                        className="flex text-white text-xs lg:text-sm lg:ml-5 h-6 px-5 lg:gap-2 lg:h-10 rounded-full justify-center items-center text-center bg-gradient-to-r from-blue-700 to-blue-600 hover:transform hover:transition-transform duration-300 hover:scale-110"
                      >
                        {/* <div className="text-sm lg:text-[15px]">Paid</div> */}
                        <img src={download} className="w-3 lg:w-6" alt="" />
                        <div>Download</div>
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {toogle && <Sidebar />}
    </div>
  );
}

export default Orders;
