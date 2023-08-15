import Link from "next/link";
import React from "react";
import axios from "axios";

const Navbar: React.FC<{}> = () => {
  return (
    <header className="z-10 flex items-center w-[100vw] px-5 bg-white border-b-2 border-t-1 h-14">
      <nav className="flex justify-between w-[1024px] m-auto">
      <span className="text-2xl font-semibold text-gray-400">
        <Link href="/">NEXT-Carrer</Link>
      </span>
      <div className="flex ">
        <Link href={'/companyList'} className="w-20 px-2 pt-1 mr-2 text-lg text-center h-7">채용</Link>
      </div>
      <aside className="flex pt-1">
        <button className="w-20 px-2 mr-2 text-sm text-center text-white bg-gray-400 rounded h-7">
          로그아웃
        </button>
        <Link
          href="/login"
          className="w-20 px-2 pt-0.5 mr-2 text-center text-blue-500 border border-blue-500 ronded h-7"
        >
          로그인
        </Link>
        <Link
          href="/register"
          className="w-20 px-2 pt-0.5 text-center text-white bg-gray-400 rounded h-7"
        >
          회원가입
        </Link>
      </aside>
      </nav>
    </header>
  );
};

export default Navbar;
