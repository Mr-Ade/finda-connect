import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Star, 
  Check, 
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

export const JobListingDetail = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="mb-4">
            <Button variant="outline" asChild>
              <Link to="/listings" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Company Logo" 
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">InfosysX</div>
                  <h1 className="text-2xl font-semibold mb-3">Senior UI/UX Web Designer in USA</h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      <Briefcase className="w-4 h-4 mr-1" />
                      Full Time
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                      <MapPin className="w-4 h-4 mr-1" />
                      San Francisco, USA
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                      $85k - 100k PA.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">Job Description</h2>
                <p className="text-muted-foreground">
                  We are looking for an experienced UI/UX Designer to join our team. The ideal candidate will have a strong portfolio demonstrating their ability to create intuitive and visually appealing user interfaces.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Requirements</h2>
                <div className="space-y-3">
                  {[
                    "Strong core PHP Hands on experience",
                    "Strong Expertise in CodeIgniter Framework",
                    "Understanding of MVC design pattern",
                    "Basic understanding of front-end technologies",
                    "Good knowledge of relational databases",
                    "Proficient understanding of code versioning tools"
                  ].map((req, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="rounded-full p-1 bg-primary/10 text-primary mt-1">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-muted-foreground">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">Key Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "React",
                    "TypeScript",
                    "UI/UX Design",
                    "Figma",
                    "HTML5",
                    "CSS3",
                    "Web Design"
                  ].map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-gray-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline">Save Job</Button>
                <Button>Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Recruiter" 
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">Thomas R. Graves</h3>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    San Francisco
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="font-semibold">140+</div>
                  <div className="text-sm text-muted-foreground">Listings</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600">4.7</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div>
                  <div className="font-semibold">80K</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">Follow</Button>
                <Button variant="outline" className="w-full">Message</Button>
                <Button className="w-full">View Profile</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Website</div>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    https://company.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <a href="mailto:support@company.com" className="text-sm text-muted-foreground hover:text-primary">
                    support@company.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary">
                    (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">
                    San Francisco, CA 94105
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};