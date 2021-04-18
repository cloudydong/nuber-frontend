import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="flex flex-col">
        <div
          style={{ backgroundImage: `url(${coverImg})` }}
          className="bg-red-500 bg-cover bg-center mb-3 py-28"
        ></div>
        <h3 className="text-xl">{name}</h3>
        <span className="border-t py-2 mt-2 text-xs opacity-50 border-gray-500">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};
