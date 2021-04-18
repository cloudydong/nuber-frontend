import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Pagination } from "../../components/pagination";
import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANTS_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalCount
      restaurants {
        ...RestaurantsPart
      }
      category {
        ...CategoryPart
      }
    }
  }
  ${RESTAURANTS_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}
export const Category = () => {
  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((curPage) => curPage + 1);
  const onPrevPageClick = () => setPage((curPage) => curPage - 1);

  const params = useParams<ICategoryParams>();
  const { loading, data } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          slug: params.slug,
          page,
        },
      },
    }
  );
  return (
    <div>
      <Helmet>
        <title>Category | Nuber</title>
      </Helmet>
      {!loading && (
        <div className="flex w-full justify-center items-center">
          <div className="flex flex-col w-1/6 justify-center items-center">
            <h1 className="font-serif text-3xl">{`“${data?.category.category?.name}”`}</h1>
            <h2 className="font-normal text-sm">
              {data?.category.totalCount}개의 가게들
            </h2>
          </div>
          <div className="w-5/6">
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-8 mt-6">
              {data?.category.restaurants?.map((restaurant) => (
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
              totalPages={data?.category.totalPages}
              onPrevPageClick={onPrevPageClick}
              onNextPageClick={onNextPageClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};
