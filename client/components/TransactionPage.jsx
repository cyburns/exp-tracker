"use client";

import { UPDATE_TRANSACTION } from "@/graphql/mutations/transaction-mutations";
import { GET_SINGLE_TRANSACTION } from "@/graphql/queries/transaction-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TransactionPage = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: "",
  });

  const [updateTransaction, { loading: isUpdateLoading, data }] =
    useMutation(UPDATE_TRANSACTION);

  const { loading } = useQuery(GET_SINGLE_TRANSACTION, {
    variables: { transactionId: id },
    onCompleted: (data) => {
      const { description, paymentType, category, amount, location, date } =
        data.getTransaction;

      const dateReformatted = new Date(Number(date))
        .toISOString()
        .split("T")[0];

      setFormData({
        description,
        paymentType,
        category,
        amount,
        location,
        date: dateReformatted,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);

    try {
      await updateTransaction({
        variables: {
          input: {
            transactionId: id,
            ...formData,
            amount,
          },
        },
      });

      toast.success("Transaction updated successfully");
      navigationBackHome();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update transaction");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const navigationBackHome = () => {
    setTimeout(() => {
      router.push("/");
    }, 750);
  };

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center justify-center">
      <p className="md:text-4xl text-2xl lg:text-4xl font-light mb-10 text-center relative z-50">
        Update this transaction
      </p>
      <form
        className="w-full max-w-lg flex flex-col gap-5 px-3 "
        onSubmit={handleSubmit}
      >
        {/* TRANSACTION */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="description"
            >
              Transaction
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              name="description"
              type="text"
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* PAYMENT TYPE */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="paymentType"
            >
              Payment Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="paymentType"
                name="paymentType"
                onChange={handleInputChange}
                defaultValue={formData.paymentType}
              >
                <option value={"card"}>Card</option>
                <option value={"cash"}>Cash</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="category"
                name="category"
                onChange={handleInputChange}
                defaultValue={formData.category}
              >
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase text-white text-xs font-bold mb-2"
              htmlFor="amount"
            >
              Amount($)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              name="amount"
              type="number"
              placeholder="150"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="location"
              name="location"
              type="text"
              placeholder="New York"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          {/* DATE */}
          <div className="w-full flex-1">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
              placeholder="Select date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          className="text-white font-bold w-full rounded px-4 py-2 bg-blue-500 hover:bg-blue-400 transition mt-7"
          type="submit"
          disabled={loading || isUpdateLoading}
        >
          {loading ? "Loading" : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default TransactionPage;
