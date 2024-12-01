import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJob from "./AppliedJobTable";

const skills = ["HTML", "CSS", "JavaScript", "ReactJS"];
function Profile() {
  const isResume = true;
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>Add your bio here</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus!
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-3 my-4">
            <Mail />
            <span>Prabhanjan@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-4">
            <Contact />
            <span>7893152309</span>
          </div>
        </div>
        <div>
          <h1 className="text-medium font-bold">Skills</h1>
          <div className="flex items-center gap-2">
            {skills.length != 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span className="text-red-500">NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label className="text-medium font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href="https://youtube.com"
              className="text-bule-600 w-full hover:underline cursor-pointer"
            >
              Click Here
            </a>
          ) : (
            <span className="text-red-500">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1>Applied Jobs</h1>
        <AppliedJob></AppliedJob>
      </div>
    </div>
  );
}

export default Profile;
