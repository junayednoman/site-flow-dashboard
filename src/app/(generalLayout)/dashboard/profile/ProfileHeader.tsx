"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import panda from "@/assets/panda.png";
import { useRef } from "react";
import { useUpdateAdminImageMutation } from "@/redux/api/profileApi";
import handleMutation from "@/utils/handleMutation";

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatar: string;
  onBack?: () => void;
}

const ProfileHeader = ({ name, role, avatar, onBack }: ProfileHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateAdminImage] = useUpdateAdminImageMutation();

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      handleMutation(formData, updateAdminImage, "Uploading image...");
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Avatar and Info */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Image
            src={avatar || panda}
            alt={name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <Button
            size="icon"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
            onClick={handleEditClick}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-foreground">
            {name}
          </h2>
          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>
      {onBack && (
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
