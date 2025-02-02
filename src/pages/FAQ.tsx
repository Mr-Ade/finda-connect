import { useState } from "react";
import { CommunityQuestion } from "@/types/business";

const generalQuestions: CommunityQuestion[] = [
  { id: "1", question: "What is this platform?", answer: "This platform connects businesses with customers." },
  { id: "2", question: "How do I create an account?", answer: "You can create an account by clicking on the sign-up button." },
];

const businessQuestions: CommunityQuestion[] = [
  { id: "3", question: "How do I list my business?", answer: "You can list your business by filling out the registration form." },
  { id: "4", question: "What are the fees for listing?", answer: "Listing your business is free for the first year." },
];

const accountQuestions: CommunityQuestion[] = [
  { id: "5", question: "How do I reset my password?", answer: "You can reset your password by clicking on the 'Forgot Password' link." },
  { id: "6", question: "How do I update my profile?", answer: "You can update your profile in the account settings." },
];

const FAQ = () => {
  const faqSections = [
    {
      title: "General Questions",
      questions: generalQuestions.map(q => ({
        ...q,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })) as CommunityQuestion[]
    },
    {
      title: "Business Listings",
      questions: businessQuestions.map(q => ({
        ...q,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })) as CommunityQuestion[]
    },
    {
      title: "Account & Settings",
      questions: accountQuestions.map(q => ({
        ...q,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })) as CommunityQuestion[]
    }
  ];

  return (
    <div>
      {faqSections.map(section => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          <ul>
            {section.questions.map(question => (
              <li key={question.id}>
                <strong>{question.question}</strong>
                <p>{question.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
