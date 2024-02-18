import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Meeting } from "@prisma/client";

export default function Meetings({ meetings }: { meetings: Meeting[] }) {
  return (
    <div>
      {meetings.map((meeting) => (
        <Card key={meeting.creatorId} className="bg-gray-100">
          <CardHeader>
            <div className="flex items-center space-x-4 mb-2">
              <Avatar>
                <AvatarImage
                  alt="Profile picture"
                  src="/placeholder.png?height=40&width=40"
                />
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">Javob John</h2>
                <p className="text-sm text-gray-500">(Business)</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">
              903 A wing, Green Tower, Gilbert Hill, Andheri West Mumbai
            </p>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">03:00 PM</p>
              <p className="text-sm text-gray-600">18.10.2018</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Going</Button>
              <Button variant="destructive">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
