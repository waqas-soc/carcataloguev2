import Image from "next/image";
import React from "react";
import IconCard from "./IconCard";

const getRentValue = (city_mpg, year) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

const getCarImgUrl = (car, angle) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { searchParams } = url;
  const { make, model, year } = car;

  searchParams.append("customer", process.env.NEXT_PUBLIC_IMAGIN_API_KEY);
  searchParams.append("make", make);
  searchParams.append("modelFamily", model?.split(" ")[0]);
  searchParams.append("zoomType", "fullscreen");
  searchParams.append("modelYear", `${year}`);
  searchParams.append("angle", `${angle}`);

  return `${url}`;
};

const Card = ({
  city_mpg,
  year,
  make,
  model,
  transmission,
  drive,
  carItem,
}) => {
  const carRent = getRentValue(city_mpg, year);

  return (
    <>
      <div className="bg-cardcontainerbgclr rounded-[1.15rem]">
        <div className="bg-cardbgclr rounded-[1.916rem]">
          <div className="pt-8 px-5 ">
            <h1 className="text-primary text-[1.054rem] font-bold mb-3 capitalize">
              {make && make} {model && model}
            </h1>
            <h3 className="text-primary text-[1.533rem] font-extrabold">
              <span className="text-[0.671rem] font-semibold align-text-top">
                ${" "}
              </span>
              {carRent && carRent}
              <span className="text-[0.575rem] font-medium opacity-80 align-baseline">
                /day
              </span>
            </h3>
          </div>
          <div className="px-2 w-full">
            <Image
              src={getCarImgUrl(carItem)}
              alt="carpic"
              width={100}
              height={100}
              className="w-full h-auto"
            />
          </div>
          <div className="px-5 pb-8 mt-1 flex justify-evenly items-center">
            <IconCard
              src={"steeringIcon.svg"}
              title={transmission === "a" ? "Automatic" : "Manual"}
            />
            <IconCard src={"seatIcon.svg"} title={`${drive && drive} Seats`} />
            <IconCard
              src={"gasStationIcon.svg"}
              title={`${city_mpg && city_mpg} MPG`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
