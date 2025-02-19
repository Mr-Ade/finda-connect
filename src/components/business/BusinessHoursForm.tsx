import { BusinessHoursManager } from "./BusinessHoursManager";

const BusinessHoursForm = ({ businessId }: { businessId: string }) => {
  return <BusinessHoursManager businessId={businessId} />;
};

export default BusinessHoursForm;