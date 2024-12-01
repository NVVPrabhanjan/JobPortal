import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

function Job() {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <p>2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Section */}
      <div className="flex items-center gap-4 my-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900"
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg">Company Name</h1>
          <p className="text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className='text-lg font-bold my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio deleniti accusamus nostrum animi voluptates explicabo voluptatem doloribus quasi, voluptas aut.</p>
      </div>
      <div className='flex item-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'}>12 Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'}>Part Time</Badge>
            <Badge className={'text-[#7209b7] font-bold'}>24 LPA</Badge>
        </div>
        <div className='flex item-center gap-4 mt-4'>
          <Button variant="outline">Details</Button>
          <Button className="bg-[#7209b7]">Save for later</Button>
        </div>
    </div>
  );
}

export default Job;
