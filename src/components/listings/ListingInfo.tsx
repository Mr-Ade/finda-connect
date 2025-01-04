import { BasicInfo } from "./info/BasicInfo";
import { CategorySelect } from "./info/CategorySelect";

export const ListingInfo = () => {
  return (
    <div className="space-y-6">
      <BasicInfo />
      <CategorySelect />
    </div>
  );
};