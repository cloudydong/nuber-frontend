import { gql, makeVar } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri: `http://${window.location.hostname}:4000/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then((result) => console.log(result));
