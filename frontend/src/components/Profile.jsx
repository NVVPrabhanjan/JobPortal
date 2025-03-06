import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Mail, Phone, FileText, Briefcase, Award, Calendar, MapPin, Edit, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { appliedJobs } = useSelector(store => store.job);
    
    // Get initials for avatar fallback
    const getInitials = (name) => {
        if (!name) return "?";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600">Manage your information and view application history</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-col items-center">
                                    <Avatar className="h-32 w-32 mb-4 border-4 border-purple-100 shadow-sm">
                                        <AvatarImage 
                                            src={user?.profile?.avatar || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                            alt={user?.fullname || "Profile"} 
                                        />
                                        <AvatarFallback className="bg-purple-600 text-white text-2xl">
                                            {getInitials(user?.fullname)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-semibold text-gray-900 text-center">{user?.fullname}</h2>
                                    <p className="text-gray-600 text-center mt-1">{user?.profile?.title || "Student"}</p>
                                </div>
                                <Button 
                                    onClick={() => setOpen(true)} 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8 w-8 p-0 rounded-full"
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit Profile</span>
                                </Button>
                            </div>

                            {user?.profile?.bio && (
                                <div className="mb-6 px-4 py-3 bg-gray-50 rounded-lg text-gray-700 text-sm">
                                    {user.profile.bio}
                                </div>
                            )}

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="h-5 w-5 text-purple-600" />
                                    <span>{user?.email || "Not provided"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Phone className="h-5 w-5 text-purple-600" />
                                    <span>{user?.phoneNumber || "Not provided"}</span>
                                </div>
                                {user?.profile?.location && (
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <MapPin className="h-5 w-5 text-purple-600" />
                                        <span>{user.profile.location}</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-5">
                                <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-600" />
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {user?.profile?.skills && user.profile.skills.length > 0 ? (
                                        user.profile.skills.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                                                {skill}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 text-sm italic">No skills added yet</span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-5 mt-5">
                                <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                    Resume
                                </h3>
                                {user?.profile?.resume ? (
                                    <a 
                                        target="_blank" 
                                        href={user.profile.resume} 
                                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium"
                                    >
                                        {user.profile.resumeOriginalName || "View Resume"}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <span className="text-gray-500 text-sm italic">No resume uploaded</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Applications */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Job Applications</h2>
                                <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                                    {appliedJobs?.length || 0} Total
                                </Badge>
                            </div>
                            
                            {/* Applied Job Table */}
                            {appliedJobs && appliedJobs.length > 0 ? (
                                <AppliedJobTable />
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700 mb-1">No Applications Yet</h3>
                                    <p className="text-gray-500 max-w-md">
                                        You haven't applied to any jobs yet. Start exploring opportunities to begin your career journey.
                                    </p>
                                    <Button className="mt-6 bg-purple-600 hover:bg-purple-700" onClick={() => window.location.href = '/browse'}>
                                        Browse Open Positions
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Recent Activity Section */}
                        {appliedJobs && appliedJobs.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                                
                                <div className="relative pl-8 space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-gray-200">
                                    {appliedJobs.slice(0, 5).map((job, index) => (
                                        <div key={index} className="relative">
                                            <div className="absolute left-[-2.45rem] rounded-full bg-purple-100 p-2 text-purple-600">
                                                <Briefcase className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Applied to {job.position} at {job.company}</p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    <span>{new Date(job.appliedAt).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric'
                                                    })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;