import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/pagination";
import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANTS_FRAGMENT } from "../../fragments";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryPart
      }
    }
    restaurants(input: $input) {
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
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { loading, data } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((curPage) => curPage + 1);
  const onPrevPageClick = () => setPage((curPage) => curPage - 1);
  const history = useHistory();
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Nuber</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex justify-center items-center"
      >
        <input
          {...register("searchTerm", {
            required: true,
            min: 3,
          })}
          className="input rounded-md border-0 w-3/4 md:w-3/12"
          type="search"
          placeholder="search restaurants..."
        />
      </form>
      {!loading && (
        <div className="container mt-2 pb-28">
          <ul className="flex max-w-xs justify-around mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <li className="flex flex-col group items-center cursor-pointer mx-2">
                  <div
                    className="w-16 h-16 bg-cover group-hover:bg-gray-200 rounded-full"
                    style={{ backgroundImage: `url(${category.coverImg})` }}
                  ></div>
                  <span className="text-sm text-center font-bold">
                    {category.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-8 mt-6">
            {data?.restaurants.restaurants?.map((restaurant) => (
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
            totalPages={data?.restaurants.totalPages}
            onPrevPageClick={onPrevPageClick}
            onNextPageClick={onNextPageClick}
          />
        </div>
      )}
    </div>
  );
};
