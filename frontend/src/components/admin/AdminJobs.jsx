import React, { useEffect, useState } from 'react'
import { Search, Plus, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  const { loading, refetch } = useGetAllAdminJobs();
  const [searchInput, setSearchInput] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Apply search with debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchJobByText(searchInput));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, dispatch]);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Job Listings Management</CardTitle>
              <Button 
                onClick={() => navigate("/admin/jobs/create")}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Create New Job
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center w-full sm:w-auto gap-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-8 w-full"
                    placeholder="Search by title, department, location..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                className="w-full sm:w-auto flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                Refresh
              </Button>
            </div>
            
            <AdminJobsTable filterType={filterType} />
            
            {loading && (
              <div className="flex justify-center my-8">
                <div className="animate-pulse text-gray-500">Loading job listings...</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminJobs