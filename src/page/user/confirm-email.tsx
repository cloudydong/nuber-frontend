import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router";
import { useMe } from "../../hook/useMe";
import {
  verifyEmail,
  verifyEmailVariables,
} from "../../__generated__/verifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            verified
          }
        `,
        data: {
          verified: true,
        },
      });
      history.push("/");
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );
  useEffect(() => {
    const [, token] = window.location.href.split("code=");
    console.log(token);
    verifyEmail({
      variables: {
        input: {
          code: token,
        },
      },
    });
  });
  return (
    <div className="mt-10 xl:mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Nuber</title>
      </Helmet>
      <h2 className="text-lg mb-2 font-medium">이메일 인증중...</h2>
      <h4 className="text-gray-700 text-sm">
        이 페이지를 닫지 말고 기다려주세요
      </h4>
    </div>
  );
};
