import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { RESTAURANTS_FRAGMENT } from "../../fragments";
import {
  findRestaurantById,
  findRestaurantByIdVariables,
} from "../../__generated__/findRestaurantById";

const RESTAURANT_QUERY = gql`
  query findRestaurantById($input: ByIdRestaurantInput!) {
    findRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantsPart
      }
    }
  }
  ${RESTAURANTS_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const RestaurantPage = () => {
  const params = useParams<IParams>();
  const { loading, data } = useQuery<
    findRestaurantById,
    findRestaurantByIdVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id,
      },
    },
  });

  return (
    <div>
      <Helmet>
        <title>Restaurant | Nuber</title>
      </Helmet>
      {!loading && (
        <div
          className="bg-gray-800 bg-center bg-cover py-48"
          style={{
            backgroundImage: `url(${data?.findRestaurantById.restaurant?.coverImg})`,
          }}
        >
          <div className="bg-white w-1/4 py-8 lg:pl-36 max-w-screen-xl">
            <h4 className="text-3xl mb-3">
              {data?.findRestaurantById.restaurant?.name}
            </h4>
            <h5 className="text-sm font-light mb-2">
              {data?.findRestaurantById.restaurant?.category?.name}
            </h5>
            <h6 className="text-sm font-light">
              {data?.findRestaurantById.restaurant?.address}
            </h6>
          </div>
        </div>
      )}
    </div>
  );
};
