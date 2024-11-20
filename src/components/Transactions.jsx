import { useState } from "react";
import dataTransaction from "../utils/data";
import { CiSearch } from "react-icons/ci";

import * as XLSX from "xlsx";

const Transactions = () => {
  const [data, setData] = useState(dataTransaction);
  const [inputData, setInputData] = useState("");

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setInputData(searchValue);
    console.log(inputData);

    const searchData = dataTransaction.filter((item) =>
      item.counterparty.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(searchData);
  };

  const exportToExcel = () => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workBook, workSheet, "MySheet1");

    XLSX.writeFile(workBook, "MyExcel.xlsx");
  };

  const viewAll = () => {
    const all = dataTransaction.filter((item) => {
      return item.status;
    });
    setData(all);
  };

  const viewCancelled = () => {
    const cancelled = dataTransaction.filter((item) => {
      return item.status === "canceled";
    });
    setData(cancelled);
  };

  const viewCompleted = () => {
    const completed = dataTransaction.filter((item) => {
      return item.status === "completed";
    });
    setData(completed);
  };

  const viewPending = () => {
    const pending = dataTransaction.filter((item) => {
      return item.status === "pending";
    });
    setData(pending);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between">
        <div className="px-7 py-10">
          <p className="text-3xl font-bold">$9505.55</p>
          <p className="py-2">
            Transactions from my{" "}
            <span className="text-indigo-600">My Personal Account</span>
          </p>
        </div>

        <div className="lg:px-7 md:px-10 sm:px-10 mt-5 flex sm:gap-10">
          <div className="flex justify-center items-center gap-5">
            <div className="p-2 border-2 border-lightGray-400 outline-none lg:w-[300px] md:w-[300px] sm:w-[250px] rounded-lg flex items-center gap-2">
              <CiSearch className="text-xl" />
              <input
                type="text"
                value={inputData}
                onChange={handleSearch}
                placeholder="Search..."
                className="outline-none"
              />
            </div>

            <button
              onClick={exportToExcel}
              className="p-2 rounded-lg bg-fullBlack-400 text-gray-100"
            >
              Export Transactions
            </button>
          </div>
        </div>
      </div>

      <div className="px-7 flex gap-5">
        <button
          className="border-2 border-gray-300 p-[1px] text-gray-700 rounded-2xl w-[100px] hover:bg-fullBlack-400 hover:text-white-400 hover:border-0 transition-all"
          onClick={viewAll}
        >
          View All
        </button>
        <button
          className="border-2 border-gray-300 p-[1px] text-gray-700 rounded-2xl w-[100px] hover:bg-fullBlack-400 hover:text-white-400 hover:border-0 transition-all"
          onClick={viewCompleted}
        >
          Completed
        </button>
        <button
          className="border-2 border-gray-300 p-[1px] text-gray-700 rounded-2xl w-[100px] hover:bg-fullBlack-400 hover:text-white-400 hover:border-0 transition-all"
          onClick={viewPending}
        >
          Pending
        </button>
        <button
          className="border-2 border-gray-300 p-[1px] text-gray-700 rounded-2xl w-[100px] hover:bg-fullBlack-400 hover:text-white-400 hover:border-0 transition-all"
          onClick={viewCancelled}
        >
          Canceled
        </button>
      </div>

      <div className="rounded-lg p-6">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b-[1px] border-t-2 border-gray-600 text-gray-800 font-bold">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">COUNTERPARTY</th>
              <th className="p-4 text-left">PAYMENT DATE</th>
              <th className="p-4 text-left">STATUS</th>
              <th className="p-4 text-left">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return (
                <tr key={data.id} className="border-b border-gray-300">
                  <td className="p-4 text-gray-700">{data.id}</td>
                  <td className="p-4 text-gray-700 font-medium flex items-center gap-7">
                    <img
                      src={data.logo}
                      alt=""
                      className="w-[40px] rounded-full"
                    />
                    <p>{data.counterparty}</p>
                  </td>
                  <td className="p-4 text-gray-700">{data.payment_date}</td>
                  <td
                    className={`${
                      data.status === "completed"
                        ? "text-green-400 p-4"
                        : data.status === "canceled"
                        ? "text-red-500 p-4"
                        : "text-gray-700 p-4"
                    }`}
                  >
                    <p className="bg-gray-100 w-fit px-2 py-[2px] rounded-xl">
                      {data.status}
                    </p>
                  </td>
                  <td className="p-4 text-gray-700">${data.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
