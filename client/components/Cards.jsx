import { GET_TRANSACTIONS } from "@/graphql/queries/transaction-queries";
import Card from "./Card";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Cards = () => {
  const [error, setError] = useState(null);
  const [getTransactions, { loading, data }] = useLazyQuery(GET_TRANSACTIONS);

  useEffect(() => {
    const getTransactionData = () => {
      try {
        getTransactions();

        console.log(data);
      } catch (error) {
        console.error(error);
        setError("Error getting transactions");
      }
    };

    getTransactionData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data?.getTransactions?.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              cardType={transaction.cardType}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Cards;
