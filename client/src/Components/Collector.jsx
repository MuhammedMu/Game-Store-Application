import React, { useEffect } from "react";
import { useContextGlobally } from "./StateProvider";
import Sidebar from "./Sidebar";
import requests from "../Js/requests";
import axios from "../Js/axios";
import Filters from "./Filters";
import Search from "./Search";

function Collector() {
  const { toogle, setAllGames, initializeFilterData } = useContextGlobally();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to send all requests concurrently
        const responses = await Promise.all(
          requests.map((request) => axios.get(request.url))
        );

        // Process the responses and extract data
        let concatenated = [];
        responses.forEach((response) => {
          const newData = response.data.results;

          // Filter out duplicates based on a unique key (e.g., 'id')
          const uniqueData = newData.filter(
            (newItem) =>
              !concatenated.some((oldItem) => oldItem.id === newItem.id)
          );

          concatenated = [...concatenated, ...uniqueData];
        });

        setAllGames(concatenated); // Update the global state with the concatenated data.
        initializeFilterData(concatenated); // Initialize filter data with the concatenated data.
      } catch (err) {
        console.error(err.message); // Log any errors to the console.
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-800  to-red-950 overflow-hidden  ">
      {/* // Render the Sidebar component conditionally based on the "toogle" state. */}
      {toogle && <Sidebar />}
      {/* <Search /> */}
      <Filters />
    </div>
  );
}

export default Collector;
