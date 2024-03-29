import React, { useEffect, useState, useMemo } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { useSelector } from 'react-redux';
import { chartDataApi, dashboardCountApi } from '../../../Services/hostelAdmin';
Chart.register(CategoryScale);

function SingleHostelDashboard() {
  const [chartData, setChartData] = useState(null);
  const [chartCount, setChartCount] = useState([]);
  console.log(chartCount.studentCount, "checking the data");
  const hostelId = useSelector(state => state?.adminHostelData?.hostelId);

  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []);

  useEffect(() => {
    const fetchChartCount = async () => {
      try {
        const response = await dashboardCountApi(headers, hostelId);
        if (response) {
          console.log(response.data, "this is the response");
          setChartCount(response.data);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartCount();
  }, [headers, hostelId]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await chartDataApi(headers, hostelId);
        if (response) {
          console.log(response);
          setChartData(response.data);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, [headers, hostelId]);


  const { userChart, complaintChart, paymentChart, VacateChart } = chartData || {};

  const chartDataConfig = {
    labels: userChart ? Object.keys(userChart[0]?.data ?? 0) : [],
    datasets: [
      {
        label: "Vacate",
        data: VacateChart ? Object.values(VacateChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(280, 104, 28)",
      },
      {
        label: "Complaints",
        data: complaintChart ? Object.values(complaintChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(54, 162, 235)",
      },
      {
        label: "Students",
        data: userChart ? Object.values(userChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(75, 201, 108)",
      },
      {
        label: "Payment",
        data: paymentChart ? Object.values(paymentChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(183, 23, 119)",
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <>
      <div className="flex justify-between p-3 ">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">DashBoard</h1>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-4 bg-[#4bc96c] rounded  shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Users
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.studentCount}</p>
          </div>
          <div className="p-4 bg-[#36a2eb] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Complaints
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.complaintCount}</p>
          </div>
          <div className="p-4 bg-[#ff681c] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Vacate
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.vacateCount}</p>
          </div>
          <div className="p-4 bg-[#b71777] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
             Revenue
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.paymentCount}</p>
          </div>
        </div>

        <div className="chart-container h-96 sm:h-[400px] w-full">
          {chartData ? (
            <Bar data={chartDataConfig} options={chartOptions} />
          ) : (
            <div>Loading chart data...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleHostelDashboard;
