import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Business } from "@/types/business";

interface BusinessFormProps {
  business?: Business;
  onSubmit: (data: Partial<Business>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const BusinessForm = ({ business, onSubmit, onCancel, isEdit = false }: BusinessFormProps) => {
  const [formData, setFormData] = useState<Partial<Business>>(business || {
    name: '',
    description: '',
    category: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    email: '',
    website: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof Business, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const categories = [
    'Restaurant',
    'Retail',
    'Service',
    'Healthcare',
    'Entertainment',
    'Education',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Business Name"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div>
          <Textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            required
          />
        </div>

        <div>
          <Select
            value={formData.category}
            onValueChange={(value) => handleChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Input
            placeholder="Address"
            value={formData.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="City"
            value={formData.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            required
          />
          <Input
            placeholder="State"
            value={formData.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            placeholder="ZIP Code"
            value={formData.zip_code || ''}
            onChange={(e) => handleChange('zip_code', e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Phone"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div>
          <Input
            type="url"
            placeholder="Website"
            value={formData.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEdit ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};