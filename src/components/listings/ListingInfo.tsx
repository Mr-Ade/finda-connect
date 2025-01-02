import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

export const ListingInfo = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <FileText className="w-5 h-5" />
        <h3 className="font-medium">Listing Info</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Listing Title</Label>
            <Input id="title" placeholder="Enter business name" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel & Spa</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="cafe">Cafe & Bars</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input id="keywords" placeholder="Type keywords separated by commas" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">About Listing</Label>
            <Textarea 
              id="description" 
              placeholder="Describe your business"
              className="min-h-[120px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};