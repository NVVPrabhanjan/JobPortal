import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Bengaluru", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Data Science",
      "Graphic Designer",
      "FullStack Developer",
      "AI Engineer",
      "UI/UX Designer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh - 5 lakh"],
  },
];
function FilterCard() {
  return (
    <div className="w-full bg-white p-3 rounded-medium">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {
              data.array.map((item, index)=>{
                return (
                  <div className="flex item-center space-x-2 my-2">
                    <RadioGroupItem value={item}/>
                    <Label>{item}</Label>
                  </div>
                )
              })
            }
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
