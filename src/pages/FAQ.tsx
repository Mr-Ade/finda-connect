import { CommunityQuestion } from '@/types/business';

const generalQuestions: CommunityQuestion[] = [
  {
    id: '1',
    question: 'What is Lovable?',
    answer: 'Lovable is a platform that connects local businesses with customers...',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    question: 'How can I support local businesses?',
    answer: 'You can support local businesses by shopping locally, leaving reviews, and sharing their services with friends.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    question: 'What types of businesses are listed on Lovable?',
    answer: 'Lovable features a variety of local businesses, including restaurants, shops, services, and more.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    question: 'How do I leave a review?',
    answer: 'To leave a review, visit the business page and click on the "Leave a Review" button.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    question: 'Can I edit my review?',
    answer: 'Yes, you can edit your review by going to the business page and selecting your review.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    question: 'How do I contact customer support?',
    answer: 'You can contact customer support through the "Contact Us" page on our website.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

const FAQ = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <div className="mt-4">
        {generalQuestions.map((question) => (
          <div key={question.id} className="mb-4">
            <h2 className="font-semibold">{question.question}</h2>
            <p>{question.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
