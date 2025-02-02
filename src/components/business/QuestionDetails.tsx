import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft } from "lucide-react";

interface QuestionDetailsProps {
  businessName: string;
  question: {
    question: string;
    answer: string;
    askedBy?: string;
    answeredBy?: string;
    date?: string;
  };
}

export const QuestionDetails = ({ businessName, question }: QuestionDetailsProps) => {
  const { questionId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link to={`/business/${businessName}`}>
            <span className="hover:underline">{businessName}</span>
          </Link>
          <span>›</span>
          <Link to={`/business/${businessName}/questions`}>
            <span className="hover:underline">Ask the community</span>
          </Link>
          <span>›</span>
          <span className="text-gray-900">Question details</span>
        </div>

        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">{question.question}</h1>
            <div className="text-sm text-gray-600">
              Asked by {question.askedBy} • {question.date}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium mb-1">{question.answeredBy}</div>
                  <div className="text-gray-600">{question.answer}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                Helpful
              </Button>
              <Button variant="outline" size="sm">
                Not Helpful
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Help out with an answer!</h2>
        <Button variant="default" className="bg-red-600 hover:bg-red-700">
          Post an Answer
        </Button>
      </div>
    </div>
  );
};