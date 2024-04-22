import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define the structure of the state
interface State {
  auth: {
    isLoggedIn: boolean;
  };
  wishlist: {
    wishItems: any[]; // Replace any with the actual type of wishItems
  };
}

// Define the structure of the user form data
interface UserFormData {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  adress: string;
  password: string;
}

const Profile: React.FC = () => {
  const [id, setId] = useState<string>(localStorage.getItem("id") || "");
  const [userData, setUserData] = useState<any>({}); // Replace any with the actual type of userData
  const loginState = useSelector((state: State) => state.auth.isLoggedIn);
  const wishItems = useSelector((state: State) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState<UserFormData>({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios(`http://localhost:8080/user/${id}`);
      const data: any = response.data; // Replace any with the actual type of data
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        password: data.password,
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const getResponse = await axios(`http://localhost:8080/user/${id}`);
      const userObj: any = getResponse.data; // Replace any with the actual type of userObj

      // saljemo get(default) request
      const putResponse = await axios.put(`http://localhost:8080/user/${id}`, {
        id: id,
        name: userFormData.name,
        lastname: userFormData.lastname,
        email: userFormData.email,
        phone: userFormData.phone,
        adress: userFormData.adress,
        password: userFormData.password,
        userWishlist: await userObj.userWishlist
        //userWishlist treba da stoji ovde kako bi sacuvao stanje liste zelja
      });
      const putData: any = putResponse.data; // Replace any with the actual type of putData
    }catch(error){
      console.log(error.response);
    }
  }

  return (
      <>
        <SectionTitle title="User Profile" path="Home | User Profile" />
        <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
          <div className="grid grid-cols-3 max-lg:grid-cols-1">
            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                  value={userFormData.name}
                  onChange={(e) => {setUserFormData({...userFormData, name: e.target.value})}}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Your Lastname</span>
              </label>
              <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                  value={userFormData.lastname}
                  onChange={(e) => {setUserFormData({...userFormData, lastname: e.target.value})}}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                  value={userFormData.email}
                  onChange={(e) => {setUserFormData({...userFormData, email: e.target.value})}}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Your Phone</span>
              </label>
              <input
                  type="tel"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                  value={userFormData.phone}
                  onChange={(e) => {setUserFormData({...userFormData, phone: e.target.value})}}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Your Adress</span>
              </label>
              <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                  value={userFormData.adress}
                  onChange={(e) => {setUserFormData({...userFormData, adress: e.target.value})}}
              />
            </div>

            <div className="form-control w-full lg:max-w-xs">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                  value={userFormData.password}
                  onChange={(e) => {setUserFormData({...userFormData, password: e.target.value})}}
              />
            </div>
          </div>
          <button
              className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
              type="submit"
          >
            Update Profile
          </button>
        </form>
      </>
  );
};

export default Profile;
