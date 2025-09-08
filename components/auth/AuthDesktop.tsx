"use client";

import UserNav from "./UserNav";

export const AuthDesktop = () => {
  return (
    <div className="hidden md:flex md:items-center md:space-x-4">
      <UserNav />
    </div>
  );
};
