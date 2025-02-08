import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, MapPin, Calendar, Briefcase, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const Job = ({ job }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const formatTimeAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    
    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    return `${daysAgo} days ago`;
  };

  const handleSaveJob = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Job removed from saved items' : 'Job saved successfully');
  };

  const handleViewDetails = () => {
    navigate(`/description/${job?._id}`);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div 
      className="p-6 rounded-lg shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      role="article"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {formatTimeAgo(job?.createdAt)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full hover:bg-purple-50 ${isSaved ? 'text-purple-600' : 'text-gray-400'}`}
          onClick={handleSaveJob}
          aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-12 w-12 rounded-lg">
          <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
          <AvatarFallback>
            {job?.company?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-bold text-xl text-gray-900 mb-1">
            {job?.title}
          </h2>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <span className="font-medium text-gray-700">{job?.company?.name}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{job?.company?.location}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        {truncateText(job?.description, 150)}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Briefcase className="h-3 w-3" />
          <span>{job?.position} Positions</span>
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1 bg-red-50 text-red-600">
          <span>{job?.jobType}</span>
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1 bg-purple-50 text-purple-600">
          <DollarSign className="h-3 w-3" />
          <span>{job?.salary} LPA</span>
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button 
          onClick={handleViewDetails}
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          View Details
        </Button>
        <Button 
          onClick={handleSaveJob}
          className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700"
        >
          {isSaved ? 'Saved' : 'Save For Later'}
        </Button>
      </div>
    </div>
  );
};

export default Job;