import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="h-screen flex flex-col justify-center items-center">
    <Helmet>
      <title>Not Found | Nuber</title>
    </Helmet>
    <h1 className="font-semi bold text-4xl mb-5">Page Not Found.</h1>
    <h2 className="font-medium text-lg mb-5">
      요청하신 페이지를 찾을 수 없습니다.
    </h2>
    <h2 className="font-medium text-lg mb-5">
      입력하신 주소가 정확한지 다시 한번 확인해주세요.
    </h2>
    <Link className="hover:underline text-blue-500" to="/">
      이전 페이지로 돌아가기
    </Link>
  </div>
);
