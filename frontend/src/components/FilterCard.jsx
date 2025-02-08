import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    id: 'location',
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai']
  },
  {
    id: 'industry',
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer']
  },
  {
    id: 'salary',
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh']
  }
];

const FilterCard = () => {
  const [filters, setFilters] = useState({
    location: '',
    industry: '',
    salary: ''
  });
  
  const dispatch = useDispatch();

  const handleFilterChange = (value, filterId) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const clearFilter = (filterId) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: ''
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      location: '',
      industry: '',
      salary: ''
    });
  };

  useEffect(() => {
    // Combine all active filters
    const activeFilters = Object.values(filters).filter(Boolean).join(',');
    dispatch(setSearchedQuery(activeFilters));
  }, [filters, dispatch]);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg text-gray-900">Filter Jobs</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {filterData.map((section) => (
          <div key={section.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">{section.filterType}</h3>
              {filters[section.id] && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearFilter(section.id)}
                  className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <RadioGroup
              value={filters[section.id]}
              onValueChange={(value) => handleFilterChange(value, section.id)}
              className="space-y-2"
            >
              {section.array.map((item, idx) => {
                const itemId = `${section.id}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600"
                    />
                    <Label
                      htmlFor={itemId}
                      className="flex-1 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item}
                    </Label>
                    {filters[section.id] === item && (
                      <span className="text-xs text-purple-600 font-medium">
                        Selected
                      </span>
                    )}
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </div>

      {hasActiveFilters && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-sm"
                >
                  {value}
                  <button
                    onClick={() => clearFilter(key)}
                    className="hover:text-purple-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCard;