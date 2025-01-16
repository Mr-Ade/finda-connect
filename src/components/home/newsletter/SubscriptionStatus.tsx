interface SubscriptionStatusProps {
  title: string;
  description: string;
}

export const SubscriptionStatus = ({ title, description }: SubscriptionStatusProps) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-4">
        {title}
      </h2>
      <p className="text-white/80">
        {description}
      </p>
    </div>
  );
};