'use client'

import Link from "next/link";
import React from "react";
import NavItem from "./NavItem";
import { User } from '@prisma/client';

  
interface NavbarProps {
  currentUser ? : User | null;
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
  return (
    <header className= 'relative w-full bg-white border-b-2 font-roboto'>
      <nav className="z-10 flex items-center mx-auto w-[1024px] h-14">
      <span className="text-2xl font-semibold text-gray-400">
        <Link href="/">NEXT-Carrer</Link>
      </span>
        <NavItem currentUser={currentUser}/>
      </nav>
    </header>
  );
};

export default Navbar;
