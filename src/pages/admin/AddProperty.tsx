
import { Building } from 'lucide-react';
import PropertyForm from '@/components/admin/PropertyForm';

const AddProperty = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">Add Property</h1>
        </div>
        <p className="text-gray-600 mt-1">Create a new property listing</p>
      </div>
      
      <PropertyForm />
    </div>
  );
};

export default AddProperty;
