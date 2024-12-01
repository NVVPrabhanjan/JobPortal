import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () =>{
    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
            <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium">No. 1 Job Hunt Website</span>
            <h1 className="my-4 text-5xl font-bold">Search, Apply & <br/> Get Your <span className="text-[#6A38C2]">Dream Jobs</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam dolore temporibus unde rem! Quia soluta commodi id tempora quo velit doloremque debitis minus, maxime sit ut! Earum necessitatibus libero itaque?</p>
            <div className="flex w-[40] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                <input
                    type="text"
                    placeholder="Find your dream jobs"
                    className="outline-none border-non w-full"
                ></input>
                <Button className="rounded-r-full bg-[#6A38C2]">
                    <Search className="h-5 w -5"></Search>
                </Button>
            </div>
            </div>
        </div>
    )
}
export default HeroSection;