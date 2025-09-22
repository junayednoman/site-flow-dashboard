"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./ProfileHeader";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import {
  useGetProfileQuery,
  useUpdateAdminProfileMutation,
} from "@/redux/api/profileApi";
import handleMutation from "@/utils/handleMutation";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useChangePasswordMutation } from "@/redux/api/authApi";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");

  const { data, isLoading, isError, error, refetch } = useGetProfileQuery("");
  const profile = data?.data;
  const [updateAdminProfile, { isLoading: isUpdateLoading }] =
    useUpdateAdminProfileMutation();
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  const handleEditProfile = (data: any) => {
    handleMutation(data, updateAdminProfile, "Updating profile...");
  };

  const handleChangePassword = (data: any) => {
    handleMutation(data, changePassword, "Changing password...");
    // Handle password change logic here (API integration TBD)
  };

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;

  return (
    <div className="min-h-screen bg-card p-6 rounded-lg">
      <div className="max-w-2xl mx-auto space-y-8">
        <ProfileHeader
          name={profile.name}
          role={"Admin"}
          avatar={profile.image}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="edit-profile"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent pb-2 text-primary-foreground text-[16px]"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="change-password"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-0 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent pb-2 text-primary-foreground text-[16px]"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="edit-profile" className="mt-0">
              <EditProfileForm
                defaultValues={{
                  name: profile.name,
                  email: profile.email,
                  phone: profile.phone || "",
                }}
                onSubmit={handleEditProfile}
                isUpdateLoading={isUpdateLoading}
              />
            </TabsContent>

            <TabsContent value="change-password" className="mt-0">
              <ChangePasswordForm
                isChanging={isChangePasswordLoading}
                onSubmit={handleChangePassword}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
