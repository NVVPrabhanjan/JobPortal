import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Edit2, Eye, MoreHorizontal, ArrowUpDown, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { format } from 'date-fns';

const AdminJobsTable = ({ filterType = 'all' }) => {
  const { allAdminJobs, searchJobByText, loading } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const navigate = useNavigate();

  // Apply filters and search
  useEffect(() => {
    let results = [...allAdminJobs];

    // Apply text search
    if (searchJobByText) {
      results = results.filter((job) => {
        const searchLower = searchJobByText.toLowerCase();
        return (
          (job?.title?.toLowerCase().includes(searchLower)) || 
          (job?.company?.name?.toLowerCase().includes(searchLower)) ||
          (job?.location?.toLowerCase().includes(searchLower)) ||
          (job?.department?.toLowerCase().includes(searchLower))
        );
      });
    }

    // Apply status filter
    if (filterType !== 'all') {
      results = results.filter(job => job.status === filterType);
    }

    // Apply sorting
    results.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'createdAt') {
        return sortConfig.direction === 'asc' 
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      }
      
      if (sortConfig.key === 'company.name' || sortConfig.key === 'title') {
        const aCompare = sortConfig.key === 'company.name' ? a.company?.name : a.title;
        const bCompare = sortConfig.key === 'company.name' ? b.company?.name : b.title;
        
        return sortConfig.direction === 'asc'
          ? aCompare?.localeCompare(bCompare)
          : bCompare?.localeCompare(aCompare);
      }
      
      return 0;
    });

    setFilteredJobs(results);
  }, [allAdminJobs, searchJobByText, filterType, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  // Format date function
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString?.split("T")[0] || 'Invalid date';
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Active', variant: 'success' },
      draft: { label: 'Draft', variant: 'secondary' },
      archived: { label: 'Archived', variant: 'destructive' },
      expired: { label: 'Expired', variant: 'warning' }
    };
    
    const config = statusConfig[status] || { label: status, variant: 'outline' };
    
    return (
      <Badge variant={config.variant}>{config.label}</Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>
          {filteredJobs.length > 0 
            ? `Showing ${filteredJobs.length} job listings`
            : loading 
              ? 'Loading job listings...'
              : 'No job listings found'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]" onClick={() => handleSort('company.name')}>
              <div className="flex items-center cursor-pointer">
                Company
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('title')}>
              <div className="flex items-center cursor-pointer">
                Position
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('createdAt')}>
              <div className="flex items-center cursor-pointer">
                Posted Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                      <AvatarFallback>{job?.company?.name?.charAt(0) || 'C'}</AvatarFallback>
                    </Avatar>
                    <span className="truncate max-w-[180px]" title={job?.company?.name}>
                      {job?.company?.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{job?.title}</span>
                    <span className="text-sm text-gray-500">{job?.location || 'Remote'}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(job?.createdAt)}</TableCell>
                <TableCell>{getStatusBadge(job?.status || 'active')}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56" align="end">
                      <div className="grid gap-2">
                        <Button 
                          variant="ghost" 
                          className="flex items-center justify-start gap-2 text-sm h-9"
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span>Edit Job</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="flex items-center justify-start gap-2 text-sm h-9"
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Applicants</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="flex items-center justify-start gap-2 text-sm h-9"
                          onClick={() => navigate(`/jobs/${job._id}`)}
                        >
                          <FileText className="h-4 w-4" />
                          <span>Preview Listing</span>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-pulse text-gray-500">Loading job listings...</div>
                  </div>
                ) : (
                  <span className="text-muted-foreground">No job listings found</span>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;