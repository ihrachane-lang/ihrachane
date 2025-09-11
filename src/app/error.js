"use client";

import Error from "@/components/error/Error";

const error = ({ error, reset }) => {
  return <Error error={error} reset={reset}/>
};

export default error;
