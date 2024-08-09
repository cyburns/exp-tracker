import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "@/graphql/mutations/transaction-mutations";
import toast from "react-hot-toast";

const categoryColorMap = {
  saving: "text-green-700",
  expense: "text-red-600",
  investment: "text-blue-700",
};

const Card = ({ transaction }) => {
  const { category, amount, date, location, paymentType, description } =
    transaction;

  const cardClass = categoryColorMap[category];

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION);

  const handleDeleteTransaction = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: transaction._id },
      });

      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting transaction");
    }
  };

  return (
    <div className={`rounded-md p-7 bg-[#161617]`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between mb-3">
          <h2 className={`text-2xl font-base ${cardClass} capitalize`}>
            {category}
          </h2>
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="w-6 h-6 border-b-2 animate-spin rounded-full mx-2" />
            ) : (
              <FaTrash
                className={"cursor-pointer"}
                onClick={handleDeleteTransaction}
              />
            )}
            <Link href={`/transaction/123`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1 capitalize">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {location}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold">
            {new Date(Number(date)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
