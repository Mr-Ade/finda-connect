import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddressFieldsProps {
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
    phone: string;
    email: string;
    website: string;
  };
  availableStates: Array<{ name: string; code: string }>;
  onAddressChange: (field: string, value: string) => void;
}

export const AddressFields = ({ address, availableStates, onAddressChange }: AddressFieldsProps) => {
  console.log("Current state:", address.state);
  console.log("Available states:", availableStates);

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input 
            id="country" 
            value="Nigeria"
            disabled
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select 
            value={address.state} 
            onValueChange={(value) => onAddressChange('state', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {availableStates.map((state) => (
                <SelectItem key={state.code} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input 
          id="city" 
          value={address.city}
          onChange={(e) => onAddressChange('city', e.target.value)}
          placeholder="Enter city"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input 
          id="street" 
          value={address.street}
          onChange={(e) => onAddressChange('street', e.target.value)}
          placeholder="e.g. 36, Minfa Crescent, Becky Garden Estate"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">Zip Code</Label>
        <Input 
          id="zipCode" 
          value={address.zipCode}
          onChange={(e) => onAddressChange('zipCode', e.target.value)}
          placeholder="Enter zip code"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            type="tel" 
            value={address.phone}
            onChange={(e) => onAddressChange('phone', e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={address.email}
            onChange={(e) => onAddressChange('email', e.target.value)}
            placeholder="Enter email address"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input 
          id="website" 
          type="url" 
          value={address.website}
          onChange={(e) => onAddressChange('website', e.target.value)}
          placeholder="Enter website URL"
        />
      </div>
    </>
  );
};