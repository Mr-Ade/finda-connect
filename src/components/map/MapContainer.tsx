import { ReactNode } from 'react';

interface MapContainerProps {
  children?: ReactNode;
}

export const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      {children}
    </div>
  );
};