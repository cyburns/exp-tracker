"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "./Cards";
import TransactionForm from "./TransactionForm";
import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/user-mutations";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { GET_CATEGORY_STATISTICS } from "@/graphql/queries/transaction-queries";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const { loading: isCatDataLoading, data: categoryData } = useQuery(
    GET_CATEGORY_STATISTICS
  );

  const router = useRouter();
  const [logout, { loading }] = useMutation(LOGOUT);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (isCatDataLoading) return <div>Loading...</div>;

  const chartData = {
    labels: ["Expense", "Saving", "Investment"],
    datasets: [
      {
        label: "%",
        data: categoryData.getCategoryStatistics.map(
          (category) => category.totalAmount
        ),
        backgroundColor: [
          "#dc2626", //expense
          "#16803d", //saving
          "#3b82f7", //investment
        ],
        borderWidth: 0,
        borderRadius: 5,
        spacing: 10,
        cutout: 120,
      },
    ],
  };

  return (
    <>
      <h1>{JSON.stringify()}</h1>
      <Header />
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex justify-between w-full max-w-4xl mb-10 items-center">
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="w-12 h-12 rounded-full border cursor-pointer"
            alt="Avatar"
          />

          <div className="group flex flex-row" onClick={handleLogout}>
            <p className="group-hover:underline">Log out</p>
            {!loading && <MdLogout className="mx-2 w-5 h-5 cursor-pointer" />}
          </div>

          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin" />
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
            <Doughnut data={chartData} />
          </div>

          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
