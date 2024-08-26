// components/ui/avatar-group.tsx
import React from "react";
import Image from "next/image";

interface AvatarGroupProps {
  persons: Array<{
    _id: string;
    name: string;
    picture: string;
  }>;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ persons }) => {
  const visibleAvatars = persons.slice(0, 3);
  const additionalCount = persons.length - visibleAvatars.length;

  return (
    <div className="flex -space-x-4">
      {visibleAvatars.map((person) => (
        <div key={person._id} className="relative">
          <Image
            src={person.picture}
            alt={person.name}
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            className="border-2 border-white"
          />
        </div>
      ))}
      {additionalCount > 0 && (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700 border-2 border-white">
          +{additionalCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
