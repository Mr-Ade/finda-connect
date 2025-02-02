import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunityQuestion } from "@/types/business";

interface FAQProps {
  businessId: string;
  questions: CommunityQuestion[];
}

export const FAQ = ({ businessId, questions = [] }: FAQProps) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Ask the Community
        </CardTitle>
        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Ask a question
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((qa, index) => (
          <div key={qa.id} className="space-y-4 border-b border-gray-100 pb-6 last:border-0">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700">Q:</span>
                <p className="font-medium text-gray-900">{qa.question}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-700">A:</span>
                <div className="space-y-2">
                  <p className="text-gray-600">{qa.answer}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{qa.answeredBy}</span>
                    <span>•</span>
                    <span>{qa.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <Link 
              to={`/business/${businessId}/question/${qa.id}`}
              className="inline-block rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              See question details
            </Link>
          </div>
        ))}
        {questions.length > 2 && (
          <Link 
            to={`/business/${businessId}/questions`}
            className="inline-block text-sm font-medium text-primary hover:text-primary/90"
          >
            See all {questions.length} questions
          </Link>
        )}
      </CardContent>
    </Card>
  );
};