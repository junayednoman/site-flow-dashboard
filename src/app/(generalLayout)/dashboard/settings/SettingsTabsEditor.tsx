"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import JoditTextEditor from "@/components/form/ATextEditor";
import {
  useGetSettingsContentQuery,
  useUpdateSettingsMutation,
} from "@/redux/api/settingsApi";
import handleMutation from "@/utils/handleMutation";

interface ContentSection {
  id: string;
  title: string;
  content: string;
  apiField: string; // Maps to API field name
}

const SettingsTabsEditor = () => {
  const [activeTab, setActiveTab] = useState("about");

  const {
    data: settingsData,
    isLoading,
    isError,
    refetch,
  } = useGetSettingsContentQuery("");
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Define sections with explicit API field mappings
  const sections: ContentSection[] = [
    { id: "about", title: "About Us", content: "", apiField: "about_us" },
    {
      id: "terms",
      title: "Terms & Conditions",
      content: "",
      apiField: "terms_conditions",
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content: "",
      apiField: "privacy_policy",
    },
  ];

  // Initialize contentSections with API data
  const [contentSections, setContentSections] =
    useState<ContentSection[]>(sections);

  useEffect(() => {
    if (settingsData?.data) {
      setContentSections(
        sections.map((section) => ({
          ...section,
          content: settingsData.data[section.apiField] || "",
        }))
      );
    }
  }, [settingsData]);

  const handleContentChange = (sectionId: string, content: string) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      )
    );
  };

  const handleSave = (sectionId: string) => {
    const section = contentSections.find((s) => s.id === sectionId);
    if (!section) return;

    const updatedData = {
      about_us:
        contentSections.find((s) => s.apiField === "about_us")?.content || "",
      terms_conditions:
        contentSections.find((s) => s.apiField === "terms_conditions")
          ?.content || "",
      privacy_policy:
        contentSections.find((s) => s.apiField === "privacy_policy")?.content ||
        "",
    };
    // return console.log("updatedData", updatedData);
    handleMutation(
      updatedData,
      updateSettings,
      "Saving changes..."
      // (response) => {
      //   // Update local state with the latest content immediately
      //   if (response?.data) {
      //     setContentSections((prev) =>
      //       prev.map((section) => ({
      //         ...section,
      //         content: response.data[section.apiField] || section.content,
      //       }))
      //     );
      //   }
      //   setSavedStates((prev) => ({ ...prev, [sectionId]: true }));
      //   setTimeout(
      //     () => setSavedStates((prev) => ({ ...prev, [sectionId]: false })),
      //     2000
      //   );
      //   refetch(); // Sync with latest API data
      // },
      // (error) => console.error(`Failed to save ${section.title}:`, error)
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Error loading settings. <button onClick={refetch}>Retry</button>
      </div>
    );

  const currentSection = contentSections.find(
    (section) => section.id === activeTab
  );
  console.log("currentSection", currentSection);

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-3 bg-card mb-6 h-14">
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Terms & Conditions
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Privacy Policy
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 flex flex-col">
            {contentSections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id}
                className="flex-1 flex flex-col mt-0"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 mb-6">
                    <div className="h-fit rounded-lg overflow-hidden">
                      <JoditTextEditor
                        content={section.content}
                        onChange={(content) =>
                          handleContentChange(section.id, content)
                        }
                        placeholder={`Enter your ${section.title.toLowerCase()} content here...`}
                      />
                      <div className="flex justify-end mt-8">
                        <Button
                          onClick={() => handleSave(section.id)}
                          disabled={isUpdating}
                          className="min-w-[140px] gap-2"
                          size="lg"
                        >
                          {isUpdating ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsTabsEditor;
