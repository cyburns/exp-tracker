import TransactionPage from "@/components/TransactionPage";
import React from "react";

const page = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <TransactionPage id={id} />
    </div>
  );
};

export default page;
