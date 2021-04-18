import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { Pagination } from "../../components/pagination";
import { Restaurant } from "../../components/restaurant";
import { RESTAURANTS_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalCount
      restaurants {
        ...RestaurantsPart
      }
    }
  }
  ${RESTAURANTS_FRAGMENT}
`;

export const Search = () => {
  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((curPage) => curPage + 1);
  const onPrevPageClick = () => setPage((curPage) => curPage - 1);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const query = urlParams.get("term");
  const history = useHistory();
  const [callQuery, { loading, data }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    if (!query) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page,
          query,
        },
      },
    });
  }, [callQuery, history, location, query, page]);

  return (
    <div>
      <Helmet>
        <title>Search | Nuber</title>
      </Helmet>
      {!loading && (
        <div className="flex w-full justify-center items-center">
          <div className="flex flex-col w-1/6 justify-center items-center">
            <h1 className="font-serif text-3xl">{`검색어: “${query}”`}</h1>
            <h2 className="font-normal text-sm">
              {data?.searchRestaurant.totalCount}개의 가게들
            </h2>
          </div>
          <div className="w-5/6">
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-8 mt-6">
              {data?.searchRestaurant.restaurants?.map((restaurant) => (
                <Restaurant
                  key={restaurant.id}
                  id={restaurant.id + ""}
                  coverImg={restaurant.coverImg}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={data?.searchRestaurant.totalPages}
              onPrevPageClick={onPrevPageClick}
              onNextPageClick={onNextPageClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};
