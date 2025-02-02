import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FAQProps {
  businessId: string;
  faqs: {
    id: string;
    question: string;
    answer: string;
    answeredBy?: string;
    date?: string;
  }[];
}

export const FAQ = ({ businessId, faqs }: FAQProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ask the Community</CardTitle>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Ask a question
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={faq.id || index} className="border-b pb-6 last:border-b-0">
              <div className="mb-2">
                <span className="font-medium text-gray-700">Q:</span>
                <span className="ml-2">{faq.question}</span>
              </div>
              <div className="mb-3">
                <span className="font-medium text-gray-700">A:</span>
                <span className="ml-2">{faq.answer}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {faq.answeredBy}, Business Customer Service • {faq.date || '1 year ago'}
                </div>
                <Link to={`/business/${businessId}/questions/${faq.id}`}>
                  <Button variant="secondary" size="sm">
                    See question details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {faqs.length > 2 && (
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              See all {faqs.length} questions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};