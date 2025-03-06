import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();
    
    const handleViewAllJobs = () => {
        navigate('/browse');
    };

    return (
        <section className="w-full px-4 py-16 bg-gradient-to-b from-white to-gray-50">
            <div className='max-w-7xl mx-auto'>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1 w-10 bg-purple-600 rounded-full"></div>
                            <span className="text-sm font-medium text-purple-600">Opportunities</span>
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold'>
                            <span className='text-purple-600'>Latest & Top </span> 
                            Job Openings
                        </h2>
                        <p className="text-gray-600 mt-2 max-w-lg">
                            Discover the most recent opportunities from top companies looking for talented graduates like you.
                        </p>
                    </div>

                    <Button 
                        onClick={handleViewAllJobs}
                        variant="outline" 
                        className="border-purple-600 text-purple-600 hover:bg-purple-50 group"
                    >
                        View All Jobs
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {allJobs.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700">No Jobs Available</h3>
                        <p className="text-gray-500 mt-2 text-center max-w-md">
                            There are currently no job openings available. Please check back later or explore other sections.
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs?.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))}
                    </div>
                )}

                {allJobs.length > 0 && (
                    <div className="flex justify-center mt-10 md:hidden">
                        <Button 
                            onClick={handleViewAllJobs}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            Browse All Opportunities
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestJobs;