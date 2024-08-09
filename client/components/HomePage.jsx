"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "./Cards";
import TransactionForm from "./TransactionForm";
import { MdLogout } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/graphql/mutations/user-mutations";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const chartData = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [13, 8, 3],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  };

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

  return (
    <>
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
