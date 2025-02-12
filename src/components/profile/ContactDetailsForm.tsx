
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ContactDetailsFormProps {
  mobile: string;
  setMobile: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  updating: boolean;
}

export const ContactDetailsForm = ({
  mobile,
  setMobile,
  state,
  setState,
  city,
  setCity,
  address,
  setAddress,
  zipCode,
  setZipCode,
  updating
}: ContactDetailsFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label>Mobile</Label>
        <Input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={updating}
          placeholder="Enter mobile number"
        />
      </div>

      <div className="space-y-2">
        <Label>State</Label>
        <Input
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={updating}
          placeholder="Enter state"
        />
      </div>

      <div className="space-y-2">
        <Label>City</Label>
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={updating}
          placeholder="Enter city"
        />
      </div>

      <div className="space-y-2">
        <Label>Zip Code</Label>
        <Input
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          disabled={updating}
          placeholder="Enter zip code"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label>Address</Label>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={updating}
          placeholder="Enter full address"
        />
      </div>
    </div>
  );
};
