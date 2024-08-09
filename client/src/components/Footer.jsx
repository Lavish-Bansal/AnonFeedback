import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-16 font-sans tracking-wide">
      <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
        <p className="text-[15px] leading-loose">© 2024 All Rights Reserved.</p>
        <p className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
          Made with ❤️ by &nbsp;
          <a
            href="https://www.github.com/Lavish-Bansal"
            target="/"
            className="text-[15px] hover:text-white"
          >
            Lavish Bansal
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
