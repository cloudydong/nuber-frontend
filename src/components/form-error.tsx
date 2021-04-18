import React from "react";

interface ICheckFormErrorProps {
  errorMessage: string | null | undefined;
}

export const CheckFormError: React.FC<ICheckFormErrorProps | null> = ({
  errorMessage,
}) => {
  if (errorMessage)
    return <span className="font-medium text-red-500">{errorMessage}</span>;
  else return null;
};

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return <span className="font-medium text-red-500">{errorMessage}</span>;
};
