import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (query.trim()) {
      dispatch(setSearchedQuery(query.trim()));
      navigate("/browse");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchJobHandler(e);
    }
  };

  return (
    <section className="w-full px-4 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="inline-block px-4 py-2 rounded-full bg-red-50 text-red-600 font-medium text-sm">
          From BMSCE Placement Cell
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Search, Apply & <br className="md:hidden" /> Get Your{' '}
          <span className="text-purple-600">Dream Jobs</span>
        </h1>
        
        <p className="max-w-2xl text-gray-600 text-lg">
          Find and apply to the best career opportunities that match your skills and aspirations.
        </p>

        <form 
          onSubmit={searchJobHandler}
          className="w-full max-w-2xl mt-4"
        >
          <div className="flex items-center gap-2 p-2 shadow-lg border border-gray-200 rounded-full bg-white">
            <Search className="h-5 w-5 text-gray-400 ml-2" />
            <input
              type="search"
              placeholder="Search for job titles or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-2 py-2 outline-none text-base placeholder:text-gray-400"
              aria-label="Search jobs"
            />
            <Button 
              type="submit"
              className="rounded-full bg-purple-600 hover:bg-purple-700 px-6"
            >
              Search
              <Search className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-gray-600">
          <span>Popular searches:</span>
          {['Software Engineer', 'Product Manager', 'Data Scientist'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setQuery(term);
                searchJobHandler({ preventDefault: () => {} });
              }}
              className="hover:text-purple-600 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;