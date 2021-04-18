import { gql } from "@apollo/client";

export const RESTAURANTS_FRAGMENT = gql`
  fragment RestaurantsPart on Restaurant {
    id
    name
    coverImg
    address
    isPromoted
    category {
      name
    }
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryPart on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;
