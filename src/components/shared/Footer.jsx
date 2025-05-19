import React from "react";
import { SiYoutube } from "react-icons/si";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import Link from "next/link";
const Footer = () => {
  return (
    <div>

       <div className="flex justify-end">
        
       </div>
      <footer className="footer sm:footer-horizontal bg-base-300 text-base-content  p-10">    
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href="/terms" className="link link-hover">Terms of use</Link>
          <Link href={'/privacy&policy'} className="link link-hover">Privacy policy</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href={'/about'} className="link link-hover">About us</Link>
          <a href="mailto:earntoclick.core@gmail.com" className="link link-hover">Contact</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex flex-wrap gap-4 text-3xl">
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/profile.php?id=643326028865563" className="text-[#1877F2] hover:scale-110 duration-300">
              <ImFacebook2 />
            </a>
            <a href="https://www.youtube.com/@Earntoclick-x4s"
              target="_blank"
              rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 duration-300">
              <SiYoutube />
            </a>
            <a href="https://t.me/earn_to_click"
              target="_blank"
              rel="noopener noreferrer" className="text-[#0088cc] hover:scale-110 duration-300">
              <FaTelegram />
            </a>
       
            <a href="https://vm.tiktok.com/ZSh9nPtMQ/"
              target="_blank"
              rel="noopener noreferrer" className="text-black hover:scale-110 duration-300 dark:text-white">
              <FaTiktok />
            </a>
         
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
