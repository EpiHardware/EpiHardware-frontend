import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {

  // Assume you have a state or context that keeps track of the user's login status
  // replace this with the actual username
  //Remettre avec la db le login et le name de l'utilisateur connecter

  const isLoggedIn = false;
  const username = "Terry";
  const capitalizeFirstLetter = (string : string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
      <div className="py-4 bg-white top-0 sticky z-10 shadow-lg font-karla">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-4xl font-bold" data-test="main-logo">
              EpiHardware
            </Link>
            <div className="lg:flex hidden w-full max-w-[500px]">
              <input
                  type="text"
                  placeholder="Search for a product..."
                  className="border-2 border-blue-500 px-6 py-2 w-full"
              />
              <div className="bg-blue-500 text-white text-[26px] grid place-items-center px-4">
                <BsSearch />
              </div>
            </div>
            <div className="flex gap-4 md:gap-8 items-center">
              <Link
                  to="/products"
                  className="text-xl font-bold"
                  data-test="main-products"
              >
                Products
              </Link>

              <div className="flex items-center gap-2 ">
                {isLoggedIn ? (
                    <>
                      <img
                          src="https://robohash.org/Terry.png?set=set4"
                          alt="avatar"
                          className="w-6"
                      />
                      <div className="text-xl font-bold">
                        <Link to="/profile" className="cursor-pointer hover:opacity-85" data-test="profile-btn">
                          {capitalizeFirstLetter(username)}
                        </Link>
                      </div>
                    </>
                ) : (
                    <>
                      <FaUser className="text-gray-500 text-2xl" />

                      <div className="text-xl font-bold" >
                        <Link to="/login" className="cursor-pointer hover:opacity-85" data-test="login-btn">
                          Login
                        </Link>
                      </div>
                    </>
                )}
              </div>
              <div
                  className="text-gray-500 text-[32px] relative hover:cursor-pointer hover:opacity-80"
                  data-test="cart-btn"
              >
                <AiOutlineShoppingCart />
                <div
                    className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center"
                    data-test="cart-item-count"
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
