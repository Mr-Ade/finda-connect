import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommunityQuestion } from "@/types/business";
import { ChevronLeft, ThumbsDown, ThumbsUp } from "lucide-react";

interface QuestionDetailsProps {
  question: CommunityQuestion;
  businessName: string;
}

export const QuestionDetails = ({ question, businessName }: QuestionDetailsProps) => {
  const { businessId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to={`/business/${businessId}`}>{businessName}</Link>
          <span>›</span>
          <Link to={`/business/${businessId}/questions`}>Ask the community</Link>
          <span>›</span>
          <span className="text-gray-900">Question details</span>
        </div>
        <Link 
          to={`/business/${businessId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to business
        </Link>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-gray-900">{question.question}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Asked by {question.askedBy}</span>
            <span>•</span>
            <span>{question.date}</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-gray-600">{question.answer}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{question.answeredBy}</span>
                  <span>•</span>
                  <span>{question.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful {question.helpful}</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ThumbsDown className="h-4 w-4" />
                  <span>Not helpful {question.notHelpful}</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Help out with an answer!</h2>
        <Button variant="default" className="bg-primary hover:bg-primary/90">
          Post an Answer
        </Button>
      </div>
    </div>
  );
};