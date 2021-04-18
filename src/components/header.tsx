import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hook/useMe";
import nuberLogo from "../image/logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base">
          <span>이메일을 인증하세요</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 container flex justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} alt="nuber eats" className="w-36" />
          </Link>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
