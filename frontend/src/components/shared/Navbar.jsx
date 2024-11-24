import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";

function Navbar() {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-red-500">Portal</span>
          </h1>
        </div>
        <div>
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button className="bg-gray-200 hover:bg-gray-300 text-black">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <li>
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex gap-4 space-y-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Prabhanjan</h4>
                        <p className="text-sm text-muted-foreground">
                          Web developement
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <Button>
                        <User2></User2>View Profile
                      </Button>
                      <Button>
                        <LogOut></LogOut>Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
