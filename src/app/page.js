"use client";

import { manufacturer, price, rating, type } from "@/app/constants/const";
import { CustomFilter, Card } from "./components";
import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";

export default function Home() {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCars = async () => {
    setLoading(true);
    console.log("runnung ", window.location.origin);
    console.log("window.location.search ", window.location.search);

    const urlParams = new URLSearchParams(window.location.search);

    const make = urlParams.get("manufacturer") || "";
    const year = urlParams.get("year") || "";
    const fuel = urlParams.get("fuel") || "";
    const limit = urlParams.get("limit") || "";
    const model = urlParams.get("model") || "";

    const baseUrl = window.location.origin;

    try {
      let resp = await fetch(
        `${baseUrl}/api/cars?make=${make}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
        {
          cache: "no-store",
        }
      );

      resp = await resp.json();
      console.log("resp ", resp);
      setCarsData(resp);
      setLoading(false);
    } catch (err) {
      console.log("error=> ", err);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-3">
      <div className="my-3 w-full sm:w-[95%] p-4 rounded-[2.428rem] flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between">
        <div>
          <h1 className="text-primary text-[2.088rem] font-extrabold">
            Car Catalogue
          </h1>
          <h5 className="text-primary text-[0.958rem] font-normal">
            Explore out cars you might like!
          </h5>
        </div>

        <div className="my-3 sm:flex sm:justify-start lg:justify-end items-center sm:flex-wrap [&>*]:mr-3 lg:[&>*]:mr-0 lg:[&>*]:ml-3">
          <CustomFilter title="price" options={price} />
          <CustomFilter title="manufacturer" options={manufacturer} />
          <CustomFilter title="type" options={type} />
          <CustomFilter title="rating" options={rating} />
        </div>
      </div>

      <section className="mt-4 w-full sm:w-[95%] p-3">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]:">
          {loading ? (
            <div className="w-full h-[400px] flex justify-center items-center">
              <Ring size={40} lineWeight={5} speed={2} color="black" />
            </div>
          ) : Array.isArray(carsData) && carsData.length > 0 ? (
            carsData?.map((car, i) => (
              <Card
                city_mpg={car?.city_mpg}
                year={car?.year}
                make={car?.make}
                model={car?.make}
                transmission={car?.transmission}
                drive={car?.drive}
                carItem={car}
              />
            ))
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">No Data</h2>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
