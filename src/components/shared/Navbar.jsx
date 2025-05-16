"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();



  const links = [
    { title: "Home", url: "/" },
    { title: "Products", url: "/products" },
    { title: "About us", url: "/about" },
  ];

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 space-y-3 mt-3 w-60 p-2 shadow"
            >
              {links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    className={`px-4 py-2 rounded ${pathname === link.url
                        ? "text-[#0053a5] font-bold"
                        : "text-black"
                      }`}
                    href={link.url}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <a className="btn btn-ghost text-lg text-[#0053a5]">Oshudia</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6 px-1">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  className={`px-4 py-2 rounded ${pathname === link.url
                      ? "text-[#0053a5] font-bold"
                      : "text-black"
                    }`}
                  href={link.url}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          {session.status === "loading" ? (
            "Loading..."
          ) : (
            <>
              {" "}
              {session.status === "authenticated" ? (
                <Link
                  className={`btn ${pathname === `/dashboard/${session?.data?.user?.email}` ? 'bg-[#0053a5] text-white' : ''}`}
                  href={`/dashboard/${session?.data?.user?.email}`}
                >
                  Dashboard
                </Link>

              ) : (
                <Link
                  href="/login"
                  className="btn bg-[#0053a5] text-white font-bold"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
