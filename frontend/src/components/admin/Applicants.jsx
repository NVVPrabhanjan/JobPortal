import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ArrowLeft, RefreshCw, Users } from 'lucide-react'

import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { applicants } = useSelector(store => store.application)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAllApplicants = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { 
        withCredentials: true 
      })
      dispatch(setAllApplicants(res.data.job))
    } catch (error) {
      console.error('Failed to fetch applicants:', error)
      setError(error.response?.data?.message || 'Failed to load applicants')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllApplicants()
  }, [params.id, dispatch])

  const applicationCount = applicants?.applications?.length || 0
  const jobTitle = applicants?.title || 'Job Position'
  const companyName = applicants?.company?.name || 'Company'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 mb-4"
            onClick={() => navigate('/admin/jobs')}
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </Button>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {companyName}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {jobTitle} - Applicants
                  </CardTitle>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2">
                    <Users size={16} />
                    <span className="font-medium">{applicationCount} Applicants</span>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={fetchAllApplicants}
                    className="flex items-center gap-2"
                    disabled={loading}
                  >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              {loading && !applicants ? (
                <div className="flex justify-center my-8">
                  <div className="animate-pulse text-gray-500">Loading applicants...</div>
                </div>
              ) : (
                <ApplicantsTable 
                  applicants={applicants?.applications || []} 
                  jobId={params.id}
                  isLoading={loading}
                  onRefresh={fetchAllApplicants}
                />
              )}
              
              {!loading && applicationCount === 0 && !error && (
                <div className="text-center py-10">
                  <Users size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No applicants yet</h3>
                  <p className="text-gray-500 mt-2">
                    There are currently no applicants for this position.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Applicants