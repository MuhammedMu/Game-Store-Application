import  { useState } from "react";
import importedData from "../Js/importedData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import db, { auth } from "../Js/firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useContextGlobally } from "./StateProvider";

function Account() {
  const { spiderMan } = importedData;
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const { firebaseLogin } = useContextGlobally();

  const firebaseSignin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const signedUserID = userCredential.user.uid;

      const colRef = collection(db, "userInformation");

      const querySnapshot = await getDocs(colRef);

      const localUser = querySnapshot.docs
        .map((doc) => doc.data())
        .find((userID) => userID.userID == signedUserID);

      if (localUser) {
        localStorage.setItem("userName", localUser.userName);
        localStorage.setItem("userID", localUser.userID);

        // console.log(localStorage.getItem("userName"));

        firebaseLogin();
        navigate("/");
      } else {
        console.log("User not found.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div  >
      <div className="relative z-20">
        {/* Video Background */}
        <video
          className="fixed hidden md:block  md:left-80 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
        >
          <source src={spiderMan} type="video/mp4" />
        </video>
        {/* <img
          className="fixed  md:left-80 w-full h-full object-cover z-0"
          src={wallpaper}
          alt=""
        /> */}
        {/* Content Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center  z-10 ">
          <div className="text-white text-center">
            <div className="flex md:bg-slate-900 w-[45%] h-[670px] ml-[2%] md:mt-0 md:ml-0  md:w-[450px] md:h-screen absolute items-center">
              
              <div className="absolute z-20 md:-end-60 flex bg-slate-800  -end-48 md:w-[470px]  h-[75%] md:h-[630px] md:ml-10 md:items-center rounded-3xl ">
                <div className=" w-[90%] h-[85%]  mx-auto  ">
                  <Link to={"/"}>
                    <div className="flex items-center gap-3 text-start pl-12 text-blue-400 text-sm">
                      <div className="text-xl">&lt;</div> Back to home page
                    </div>
                  </Link>
                  {isSignIn ? (
                    <SignInForm
                      toggleForm={toggleForm}
                      firebaseSignin={firebaseSignin}
                    />
                  ) : (
                    <SignUpForm
                      toggleForm={toggleForm}
                      firebaseSignin={firebaseSignin}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm({ toggleForm, firebaseSignin }) {
  const { web, gear } = importedData;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await firebaseSignin(email, password);

    setLoading(false);
  };

  return (
    <div
      className={`text-start pl-12 font-medium h-[100%] md:text-3xl text-white `}
    >
      <div className="flex gap-2 items-center ">
        <div className="space-y-2">
          <div className="flex items-center mt-7 md:mt-0 gap-3">
            <div>Welcome !</div> <img src={web} alt="" />
          </div>
          <div className="flex bg-gradient-to-r h-11 items-center from-blue-500 to-red-500 md:text-2xl py-1 px-5 rounded-full">
            Login to your account !
          </div>
        </div>
      </div>

      <div className="text-base text-slate-500 mt-5">
        Please Login to your account
      </div>
      <div className="mt-5">
        <form action="" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="email" className="text-base text-slate-500 mt-5">
              Email or Username
            </label>
            <input
              className="md:w-80 md:h-10 text-lg text-slate-800 pl-5 rounded-xl"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="text-base text-slate-500 ">
              Password
            </label>
            <input
              className="md:w-80 md:h-10 text-lg text-slate-800 pl-5 rounded-xl"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex w-[87%] justify-between pt-2 md:pt-11">
              <button className="text-sm text-blue-400 hover:text-slate-400">
                Forget Password ?
              </button>
              {loading ? (
                <button disabled>
                  <div className="text-base bg-blue-950 w-36 h-11 text-white border-2 border-red-600 rounded-lg">
                    <div className="flex w-full h-full  justify-center items-center gap-2 pl-2">
                      Loading <div className="text-white">→</div>
                      <img src={gear} width={"28px"} alt="" />
                    </div>
                  </div>
                </button>
              ) : (
                <button>
                  <div className="text-base bg-blue-950 w-24 h-11 text-white border-2 border-red-600 rounded-lg">
                    <div className="flex  w-full h-full justify-center items-center  gap-2">
                      Login <div className="text-white">→</div>
                    </div>
                  </div>
                </button>
              )}
            </div>
            <button
              onClick={toggleForm}
              className="flex relative  text-blue-400 hover:text-slate-400 pt-3 w-[90%] text-sm justify-center"
            >
              Don't have an account ?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignUpForm({ toggleForm, firebaseSignin }) {
  const { web, gear } = importedData;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(userCredential);

      const signedUserID = userCredential.user.uid;

      console.log("signedUserID" + signedUserID);

      const colRef = collection(db, "userInformation");

      addDoc(colRef, {
        userName: name,
        userID: signedUserID,
      });

      firebaseSignin(email, password);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div
      className={`text-start pl-12 font-medium h-[100%] md:text-3xl text-white `}
    >
      <div className="flex gap-2 items-center ">
        <div className="space-y-2">
          <div className="flex items-center mt-5 md:mt-0 gap-3">
            <div>Welcome !</div> <img src={web} alt="" />
          </div>

          <div className="flex bg-gradient-to-r h-11  items-center from-blue-500 to-red-500 md:text-2xl py-1 px-5 rounded-full">
            Create new account !
          </div>
        </div>
      </div>
      {/* <div className="text-base text-slate-500 mt-5">
        Please Create your account
      </div> */}
      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-3 ">
            <label htmlFor="name" className="text-sm md:text-base text-slate-500 ">
              Full Name
            </label>
            <input
              className="md:w-80 md:h-10 text-lg text-slate-800 pl-5 rounded-xl"
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="email" className="text-sm md:text-base text-slate-500 mt-5">
              Email or Username
            </label>
            <input
              className="md:w-80 md:h-10 text-lg text-slate-800 pl-5 rounded-xl"
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="text-sm md:text-base text-slate-500 ">
              Password
            </label>
            <input
              className="md:w-80 md:h-10 text-lg text-slate-800 pl-5 rounded-xl"
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex w-[87%] justify-between pt-2 md:pt-5">
              <button className="text-xs md:text-sm text-blue-400 hover:text-slate-400">
                Forget Password ?
              </button>

              {loading ? (
                <button disabled>
                  <div className="text-sm bg-blue-950 w-44 h-11 text-white border-2 border-red-600 rounded-lg">
                    <div className="flex w-full h-full  justify-center items-center gap-2 pl-2">
                      Creating Account
                      <img src={gear} width={"28px"} alt="" />
                    </div>
                  </div>
                </button>
              ) : (
                <button className="text-base bg-blue-950 w-44 h-11 text-white border-2 border-red-600 rounded-lg">
                  <div className="flex justify-center items-center gap-2 text-xs md:text-sm md:text:base">
                    Create Account <div className="text-white">→</div>
                  </div>
                </button>
              )}
            </div>
            <button
              onClick={toggleForm}
              className="flex relative  text-blue-400 hover:text-slate-400 w-[90%] pt-3 text-sm justify-center"
            >
              Sign in to your account ?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
