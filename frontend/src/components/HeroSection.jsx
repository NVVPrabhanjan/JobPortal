import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Briefcase, TrendingUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (query.trim()) {
      dispatch(setSearchedQuery({ query: query.trim(), location: location.trim() }));
      navigate("/browse");
    }
  };

  const popularSearches = [
    { title: 'Software Engineer', icon: <Briefcase className="h-3 w-3" /> },
    { title: 'Product Manager', icon: <TrendingUp className="h-3 w-3" /> },
    { title: 'Data Scientist', icon: <Briefcase className="h-3 w-3" /> }
  ];

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="animate-pulse-slow">
            <span className="inline-block px-4 py-2 rounded-full bg-red-50 text-red-600 font-medium text-sm border border-red-100 shadow-sm">
              From BMSCE Placement Cell
            </span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              Discover & Land Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Dream Career
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl">
              Connect with top employers and find opportunities tailored to your skills and aspirations.
            </p>
          </div>

          <div className="w-full max-w-3xl bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={searchJobHandler} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-300">
                  <Search className="h-5 w-5 text-gray-400 ml-1 flex-shrink-0" />
                  <input
                    type="search"
                    placeholder="Job title, keywords, or company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent px-2 py-1 outline-none text-base placeholder:text-gray-400"
                    aria-label="Search jobs"
                  />
                </div>
                
                <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-300">
                  <MapPin className="h-5 w-5 text-gray-400 ml-1 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Location (optional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 bg-transparent px-2 py-1 outline-none text-base placeholder:text-gray-400"
                    aria-label="Job location"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-6 text-base font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  Find Jobs
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-sm text-gray-600">
                <span className="font-medium">Popular:</span>
                {popularSearches.map((item) => (
                  <button
                    key={item.title}
                    onClick={(e) => {
                      e.preventDefault();
                      setQuery(item.title);
                      searchJobHandler({ preventDefault: () => {} });
                    }}
                    className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                  >
                    {item.icon}
                    {item.title}
                  </button>
                ))}
              </div>
            </form>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl w-full">
            {[
              { number: "1,200+", label: "Job Opportunities" },
              { number: "150+", label: "Partner Companies" },
              { number: "92%", label: "Placement Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-2xl font-bold text-purple-600">{stat.number}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;