// Header Component icons
import userIcon from "../assets/Images/png/user.png";
import bag from "../assets/Images/png/shopping-bag.png";
import logout from "../assets/Images/png/logout.png";
import down from "../assets/Images/png/down-arrow.png";

// Search Component icon
import searchIcon from "../assets/Images/svg/search.svg";

// Game Component icons
import star from "../assets/Images/svg/star.svg";
import calander from "../assets/Images/png/calendar.png";
import forward from "../assets/Images/png/next.png";
import backward from "../assets/Images/png/previous.png";
import x_button from "../assets/Images/png/x.png";
import addToCart from "../assets/Images/png/add-to-cart.png";
import flame from "../assets/Images/png/flame.png";

// Game card Console Platforms icons
import windows from "../assets/Images/png/windows.png";
import playstation from "../assets/Images/svg/icons8-playstation.svg";
import android from "../assets/Images/png/android.png";
import xbox from "../assets/Images/png/xbox.png";
import ios from "../assets/Images/png/apple.png";
import linux from "../assets/Images/png/linux-white.png";
import nintendo from "../assets/Images/png/nintendo.png";

// Game card Store Platform icons
import xboxStore from "../assets/Images/svg/icons8-xbox.svg";
import steam from "../assets/Images/svg/steam.svg";
import epic from "../assets/Images/svg/epic.svg";
import appstore from "../assets/Images/svg/appstore.svg";
import googleplay from "../assets/Images/svg/googleplay.svg";
import gog from "../assets/Images/svg/gog.svg";
import playStationStore from "../assets/Images/svg/icons8-playstation.svg";
import nintendostore from "../assets/Images/png/icons8-nintendo-30.png";

// Sidebar Component icons
import removeIcon from "../assets/Images/png/delete.png";
import card from "../assets/Images/png/atm-card.png";

// Loading Component icons
import gear from "../assets/Images/gif/Gear-0.2s-304px.gif";

// Account Component icons
import web from "../assets/Images/png/spider-web.png";

// Account Component icons
import clearFilter from "../assets/Images/png/clear-filter.png";
import tag from "../assets/Images/png/game-console_2985586.png";
import wallpaper from "../assets/Images/png/spi.png";
import spiderMan from "../assets/Images/Videos/spider-man-video-background.mp4";

// MyOrder Component icons
import download from "../assets/Images/png/cloud-computing.png";
import checked from "../assets/Images/png/checked.png";

// Payment Component icons
import stripeIcon from "../assets/Images/png/stripe.png";

let storeData = [
  { name: "Steam", image: steam },
  { name: "GOG", image: gog },
  {
    name: "PlayStation Store",
    image: playStationStore,
  },
  { name: "Xbox Store", image: xboxStore },
  { name: "Epic Games", image: epic },
  { name: "Nintendo Store", image: nintendostore },
  { name: "App Store", image: appstore },
  { name: "Google Play", image: googleplay },
];

let platformData = [
  { name: "PlayStation 4", image: playstation },
  { name: "Xbox One", image: xbox },
  { name: "PC", image: windows },
  { name: "macOS", image: ios },
  { name: "Nintendo Switch", image: nintendo },
  { name: "Linux", image: linux },
  { name: "Android", image: android },
];

const genersData = [
  { name: "All", emoji: "🎮", gener: "all" },
  { name: "Action", emoji: "🔥", gener: "action" },
  // { name: "Indie", emoji: "🕹️", gener: "indie" },
  { name: "Adventure", emoji: "🌍", gener: "adventure" },
  { name: "RPG", emoji: "🗡️", gener: "role-playing-games-rpg" },
  { name: "Strategy", emoji: "🏰", gener: "strategy" },
  { name: "Shooter", emoji: "🔫", gener: "shooter" },
  // { name: "Casual", emoji: "😊", gener: "casual" },
  { name: "Puzzle", emoji: "🧩", gener: "puzzle" },
  { name: "Arcade", emoji: "🕹️", gener: "arcade" },
  // { name: "Platformer", emoji: "🏞️", gener: "platformer" },
  { name: "Racing", emoji: "🏁", gener: "racing" },
  { name: "Multiplayer", emoji: "👥", gener: "massively-multiplayer" },
  { name: "Sports", emoji: "⚽", gener: "sports" },
  { name: "Fighting", emoji: "🥊", gener: "fighting" },
  { name: "Board", emoji: "🎲", gener: "board-games" },
  // { name: "Card", emoji: "🃏", gener: "card" },
];

let importedData = {
  windows,
  playstation,
  android,
  xbox,
  star,
  ios,
  linux,
  nintendo,
  gog,
  epic,
  steam,
  googleplay,
  calander,
  forward,
  backward,
  appstore,
  x_button,
  searchIcon,
  storeData,
  platformData,
  removeIcon,
  addToCart,
  flame,
  clearFilter,
  genersData,
  tag,
  bag,
  spiderMan,
  web,
  userIcon,
  gear,
  logout,
  down,
  card,
  wallpaper,
  download,
  checked,
  stripeIcon,
};

export default importedData;
