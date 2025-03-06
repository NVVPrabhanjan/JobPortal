import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Building, BriefcaseBusiness } from 'lucide-react'

import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { JOB_API_END_POINT } from '@/utils/constant'

const jobTypeOptions = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'remote', label: 'Remote' }
]

const experienceLevelOptions = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'lead', label: 'Team Lead' },
  { value: 'executive', label: 'Executive' }
]

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 1,
    companyId: ""
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const navigate = useNavigate()
  const { companies } = useSelector(store => store.company)

  // Reset errors when form values change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrors({})
    }
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectCompany = (value) => {
    const company = companies.find((c) => c.name.toLowerCase() === value.toLowerCase())
    if (company) {
      setSelectedCompany(company)
      setFormData({...formData, companyId: company._id})
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    if (!formData.requirements.trim()) newErrors.requirements = "Job requirements are required"
    if (!formData.salary.trim()) newErrors.salary = "Salary information is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.jobType) newErrors.jobType = "Job type is required"
    if (!formData.experience) newErrors.experience = "Experience level is required"
    if (!formData.position || formData.position < 1) newErrors.position = "Number of positions must be at least 1"
    if (!formData.companyId) newErrors.companyId = "Company selection is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fill all required fields")
      return
    }
    
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      
      if (res.data.success) {
        toast.success(res.data.message || "Job posted successfully")
        navigate("/admin/jobs")
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to post job"
      toast.error(errorMessage)
      console.error("Job posting error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 mb-6"
          onClick={() => navigate('/admin/jobs')}
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Button>

        <Card className="shadow-md">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-2xl flex items-center gap-2">
              <BriefcaseBusiness className="h-6 w-6" />
              Post New Job Opportunity
            </CardTitle>
            <CardDescription>
              Create a new job listing for candidates to discover and apply
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Job Details Section */}
                <div className="md:col-span-2">
                  <h3 className="font-medium text-lg mb-3">Job Details</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior React Developer"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Number of Positions <span className="text-red-500">*</span></Label>
                  <Input
                    id="position"
                    type="number"
                    min="1"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={errors.position ? "border-red-500" : ""}
                  />
                  {errors.position && <p className="text-red-500 text-xs">{errors.position}</p>}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, responsibilities and benefits"
                    className={`min-h-24 ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="requirements">Requirements <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="List the skills, qualifications and experience required"
                    className={`min-h-24 ${errors.requirements ? "border-red-500" : ""}`}
                  />
                  {errors.requirements && <p className="text-red-500 text-xs">{errors.requirements}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary <span className="text-red-500">*</span></Label>
                  <Input
                    id="salary"
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. $80,000 - $100,000"
                    className={errors.salary ? "border-red-500" : ""}
                  />
                  {errors.salary && <p className="text-red-500 text-xs">{errors.salary}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                  <Input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. New York, NY or Remote"
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type <span className="text-red-500">*</span></Label>
                  <Select name="jobType" onValueChange={(value) => setFormData({...formData, jobType: value})}>
                    <SelectTrigger className={errors.jobType ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {jobTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.jobType && <p className="text-red-500 text-xs">{errors.jobType}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level <span className="text-red-500">*</span></Label>
                  <Select name="experience" onValueChange={(value) => setFormData({...formData, experience: value})}>
                    <SelectTrigger className={errors.experience ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {experienceLevelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
                </div>
                
                {/* Company Section */}
                <div className="md:col-span-2 mt-4">
                  <h3 className="font-medium text-lg mb-3">Company Information</h3>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="company">Select Company <span className="text-red-500">*</span></Label>
                  {companies.length > 0 ? (
                    <>
                      <Select onValueChange={handleSelectCompany}>
                        <SelectTrigger className={`w-full ${errors.companyId ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {companies.map((company) => (
                              <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                <div className="flex items-center gap-2">
                                  {company.logo && (
                                    <img 
                                      src={company.logo} 
                                      alt={company.name} 
                                      className="w-5 h-5 rounded-full object-cover"
                                    />
                                  )}
                                  {!company.logo && <Building className="w-5 h-5" />}
                                  {company.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.companyId && <p className="text-red-500 text-xs">{errors.companyId}</p>}
                      
                      {selectedCompany && (
                        <div className="p-3 bg-blue-50 rounded-md mt-2">
                          <div className="flex items-center gap-3">
                            {selectedCompany.logo ? (
                              <img 
                                src={selectedCompany.logo} 
                                alt={selectedCompany.name} 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Building className="w-6 h-6 text-blue-700" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{selectedCompany.name}</p>
                              {selectedCompany.industry && (
                                <p className="text-sm text-gray-600">{selectedCompany.industry}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-md text-yellow-800">
                      <p className="text-sm font-medium">No companies available</p>
                      <p className="text-xs mt-1">
                        Please register a company first before posting a job.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => navigate('/admin/companies/create')}
                      >
                        Register Company
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 space-y-4 md:flex md:items-center md:justify-end md:space-x-4 md:space-y-0">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/jobs')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={loading || companies.length === 0}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Posting Job...
                    </>
                  ) : (
                    "Post Job"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PostJob