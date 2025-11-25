import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext} from "../context/AppContext";

const Hero = () => {

    const {setSearchFilter, setIsSearched} = useContext(AppContext);

    const  titleRef = useRef(null)
    const  locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        });
        setIsSearched(true)
    }

    return (
        <div className="container 2xl:px-20 mx-auto my-10">
            <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                    Over 1,000+ jobs to apply
                </h2>
                <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
                    Your Next Big Professional Move Starts Right Here — Explore the Best
                    Job Opportunities and Take the Next Step Toward Your Future!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded text-gray-700 max-w-xl mx-4 sm:mx-auto p-2">
                    <div className="flex items-center w-full sm:w-1/2 px-2">
                        <img className="h-4 sm:h-5 mr-2" src={assets.search_icon} alt="Search icon" />
                        <input
                            type="text"
                            placeholder="Search jobs"
                            className="text-gray-800 placeholder-gray-500 text-sm p-2 rounded outline-none w-full"
                            ref = {titleRef}
                        />
                    </div>

                    <div className="flex items-center w-full sm:w-1/2 px-2 mt-2 sm:mt-0">
                        <img className="h-4 sm:h-5 mr-2" src={assets.location_icon} alt="Location icon" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="text-gray-800 placeholder-gray-500 text-sm p-2 rounded outline-none w-full"
                            ref = {locationRef}
                        />
                    </div>

                    <button onClick={onSearch} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white m-2 sm:m-1">
                        Search
                    </button>
                </div>
            </div>
            <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
                <div className="flex justify-center gap-10 lg:gap-16 flex-wrap"> 
                    <p className="font-medium">Trusted by</p>
                    <img className="h-6" src={assets.microsoft_logo} alt="" />
                    <img className="h-6" src={assets.walmart_logo} alt="" />
                    <img className="h-6" src={assets.accenture_logo} alt="" />
                    <img className="h-6" src={assets.samsung_logo} alt="" />
                    <img className="h-6" src={assets.amazon_logo} alt="" />
                    <img className="h-6" src={assets.adobe_logo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Hero;