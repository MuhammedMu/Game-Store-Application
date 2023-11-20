// Define a reducer function that takes two arguments: state and action
const reducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const name = action.name;
    const price = action.price + 0.99;
    const image = action.image;

    const existingProduct = state.cart?.find(
      (product) => product.name === action.name
    );

    if (existingProduct) {
      const updatedCart = state.cart.map((product) =>
        product.name === name
          ? { ...product, count: product.count + 1 }
          : product
      );

      let newTotalPrice = 0;

      updatedCart.map((singleGame) => {
        newTotalPrice += singleGame.price * singleGame.count;
      });

      console.log(newTotalPrice);

      // Update the cart data in localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

      return {
        ...state,
        cart: updatedCart,
        totalPrice: newTotalPrice,
      };
    } else {
      const newItem = {
        image: image,
        name: name,
        price: price,
        count: 1,
      };
      let newTotalPrice = state.totalPrice;

      newTotalPrice += newItem.price;

      const updatedCart = [...state.cart, newItem];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

      return {
        ...state,
        cart: updatedCart,
        totalPrice: newTotalPrice,
      };
    }
  }

  // Dispatch to remove Single Item
  if (action.type === "REMOVE") {
    let name = action.payload;
    let newTotalPrice = 0;

    const allWithoutSameID = state.cart?.filter(
      (product) => product.name !== name
    );

    allWithoutSameID.map((product) => {
      newTotalPrice += product.price * product.count;
    });

    localStorage.setItem("cart", JSON.stringify(allWithoutSameID));
    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

    return {
      ...state,
      cart: allWithoutSameID,
      totalPrice: newTotalPrice,
    };
  }

  // Check if the action type is "CLEAR" for clearing the cart
  if (action.type === "CLEAR") {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    return {
      ...state,
      cart: [],
      totalPrice: 0,
    };
  }

  if (action.type === "LOGIN") {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    return {
      ...state,
      isLoggedIn: true,
    };
  }

  if (action.type === "LOGOUT") {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    return {
      ...state,
      isLoggedIn: false,
    };
  }

  if (action.type === "TOOGLE_TRUE") {
    return {
      ...state,
      toogle: true,
    };
  }

  if (action.type === "TOOGLE_FALSE") {
    return {
      ...state,
      toogle: false,
    };
  }

  if (action.type == "INCREMENT_CART") {
    let newTotalPrice = 0;
    console.log(action.name);

    const newFilterdData = state.cart?.map((product) =>
      product.name === action.name
        ? { ...product, count: product.count + 1 }
        : product
    );

    newFilterdData.map((product) => {
      newTotalPrice += product.price * product.count;
    });

    localStorage.setItem("cart", JSON.stringify(newFilterdData));
    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

    return {
      ...state,
      cart: newFilterdData,
      totalPrice: newTotalPrice,
    };
  }

  if (action.type == "DECREMENT_CART") {
    let newTotalPrice = 0;

    const newFilterdData = state.cart?.map((product) =>
      product.name === action.name && product.count > 1
        ? { ...product, count: product.count - 1 }
        : product
    );

    newFilterdData.forEach((product) => {
      newTotalPrice += product.price * product.count;
    });

    console.log(newTotalPrice);
    console.log("Json Updated");

    localStorage.setItem("cart", JSON.stringify(newFilterdData));
    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));

    // Return a new state object with the updated cart and total price
    return {
      ...state,
      cart: newFilterdData, // Update the cart with the filtered and modified data
      totalPrice: newTotalPrice, // Update the total price in the state
    };
  }

  // Check if the action type is "SET_GAME_DATA" for initializing the allGames (original) state variable
  if (action.type === "SET_GAME_DATA") {
    // Return a new state object with "allGames" set to the provided payload
    return {
      ...state,
      allGames: action.payload,
    };
  }

  // Check if the action type is "PLATFORM" for sorting games with their platform
  if (action.type === "PLATFORM") {
    // Return a new state object with "platform" set to the provided payload
    return {
      ...state,
      platform: action.payload,
    };
  }

  // Check if the action type is "ORDERTYPE"  for sorting games with their order type
  if (action.type === "ORDERTYPE") {
    // Return a new state object with "orderType" set to the provided payload
    return {
      ...state,
      orderType: action.payload,
    };
  }

  // Check if the action type is "INITIALIZE" for initializing the filterdData (clone) state variable
  if (action.type === "INITIALIZE") {
    // Return a new state object with "filterdData" set to the provided payload
    return {
      ...state,
      filterdData: action.payload,
    };
  }

  // Calculating total price
  // if (action.type === "TOTALPRICE") {
  //   let calculatedTotalPrice = 0;

  //   state?.cart?.map((single) => {
  //     calculatedTotalPrice += single?.count * single?.price;
  //   });

  //   calculatedTotalPrice = (
  //     calculatedTotalPrice +
  //     calculatedTotalPrice * 0.15
  //   ).toFixed(2);

  //   // console.log(calculatedTotalPrice);

  //   return {
  //     ...state,
  //     totalPrice: calculatedTotalPrice,
  //   };
  // }

  // Check if the action type is "SEARCH" for initializing the search input
  if (action.type === "SEARCH") {
    // Return a new state object with "searchedData" set to the provided payload
    let searchedData = state.allGames?.filter((item) => {
      // Filter games based on search term
      let lowerSearch = action.payload.toLowerCase();
      let lowerName = item.name.toLowerCase();
      let include = lowerName.includes(lowerSearch);
      return lowerSearch === "" ? item : include;
    });

    searchedData.length > 0
      ? (state.noSearchData = true)
      : (state.noSearchData = false);

    console.log(state.noSearchData);

    // console.log(searchedData);
    return {
      ...state,
      filterdData: searchedData,
    };
  }

  // Check if the action type is "FILTER" for filtering games with their geners
  if (action.type === "FILTER") {
    let dataAfterFiltered = [];
    let name = "All";

    if (
      action.payload.filterType === "clear" ||
      action.payload.filterType === "all"
    ) {
      return {
        ...state,
        filterdData: state.allGames,
        gameTitle: name,
      };
    }

    // Filter by Platform
    if (action.payload.filterType === "platform") {
      // console.log("platform activated")
      dataAfterFiltered = state.allGames.filter((game) =>
        game.platforms.some(
          (platform) => platform.platform.name === action.payload.filterName
        )
      );
      name = action.payload.filterName;
    }

    // Sort by name in both ascending or descending order
    if (action.payload.filterType == "name") {
      if (action.payload.filterName == "Ascending") {
        dataAfterFiltered = action.payload.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        dataAfterFiltered = action.payload.data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      name = state.gameTitle;
    }

    // Sort by popularity in both ascending or descending order
    if (action.payload.filterType == "popularity") {
      if (action.payload.filterName == "Ascending") {
        dataAfterFiltered = action.payload.data.sort(
          (a, b) => a.metacritic - b.metacritic
        );
      } else {
        dataAfterFiltered = action.payload.data.sort(
          (a, b) => b.metacritic - a.metacritic
        );
      }
      name = state.gameTitle;
    }

    // Sort by popularity in both ascending or descending order
    if (action.payload.filterType == "rate") {
      if (action.payload.filterName == "Ascending") {
        dataAfterFiltered = action.payload.data.sort(
          (a, b) => a.rating - b.rating
        );
      } else {
        dataAfterFiltered = action.payload.data.sort(
          (a, b) => b.rating - a.rating
        );
      }
      name = state.gameTitle;
    }

    // Sort by release date in both ascending or descending order
    if (action.payload.filterType == "date") {
      dataAfterFiltered = action.payload.data?.sort((a, b) => {
        const dateA = new Date(a.released.slice(0, 8)).getTime();
        const dateB = new Date(b.released.slice(0, 8)).getTime();

        if (action.payload.filterName === "Ascending") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
      name = state.gameTitle;
    }

    // Filter the data to include only items with the specified genre
    if (action.payload.filterType === "gener") {
      console.log(action.payload.filterName);
      name = action.payload.title;

      if (name === "All") {
        console.log("hello");
        return {
          ...state,
          filterdData: state.allGames,
          gameTitle: name,
        };
      }

      dataAfterFiltered = action.payload.data.filter((item) => {
        return item.genres.some(
          (genre) => genre.slug === action.payload.filterName
        );
      });

      // Sort the filtered data by some criteria, for example, playtime
      dataAfterFiltered.sort((a, b) => b.playtime - a.playtime);
    }

    return {
      ...state,
      filterdData: dataAfterFiltered,
      gameTitle: name,
    };
  }

  // Check if the action type is "getPrice"
  // if (action.type == "getPrice") {
  //   if (true) {
  //     let collection, collection2;
  //     const newFilterdData = state.cart?.map((product) => {
  //       collection = product?.price * product?.count;
  //       collection2 = state.totalPrice + collection;
  //       return { ...state.totalPrice, totalPrice: collection2 };
  //     });
  //     console.log(newFilterdData[0].totalPrice);
  //     return {
  //       ...state,
  //       totalPrice: newFilterdData, // Update the cart with the filtered and modified data
  //     };
  //   }
  // }

  // Calculate the total prices of all products in the cart
  // {
  //   let totalPrices = 0;

  //   state.cart.forEach((product) => {
  //     if (product.price) {
  //       totalPrices += product.price * product.count;
  //     }
  //   });

  //   console.log(totalPrices);

  //   // Return a new state object with the updated total price
  //   return {
  //     ...state,
  //     totalPrice: totalPrices,
  //   };
  // }
};

export default reducer;
