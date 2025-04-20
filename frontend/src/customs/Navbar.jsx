import React from "react";
import { AuthStore } from "../stores/useAuthStore.js";

const Navbar = () => {
  const { user, logout } = AuthStore();

  return (
    <nav className="w-full h-16 bg-white flex items-center justify-between px-4 md:px-16 shadow-sm fixed top-0 z-50 border-b border-zinc-200">
      <h1 className="text-xl font-bold font-[Poppins] text-indigo-600 tracking-wide">
        Guru-Vaid
      </h1>

      <div className="flex items-center gap-8">
        {user && (
          <div className="flex items-center  gap-2">
            <img
              src={user?.photoURL}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover border border-zinc-300 shadow-sm"
            />
            <div className="leading-tight hidden sm:block">
              <p className="text-xs text-zinc-500 font-[Inter]">Welcome back</p>
              <h1 className="text-sm font-semibold text-black font-[Inter] line-clamp-1 max-w-[120px]">
                {user.name}
              </h1>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-4 rounded-2xl transition-all duration-200 font-[Inter]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
