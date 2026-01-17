"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/modules/root/components/BottomNavigation";
import { RouteConfig } from "@/config/route.config";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
];

const LanguageSettingsViewPage = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleBack = () => {
    router.push(RouteConfig.PROFILE.PROFILE);
  };

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguage(code);
    console.log("Language changed to:", code);
    // TODO: Implement language change logic
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md p-4 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Language</h1>
            <p className="text-sm text-muted-foreground">
              Choose your preferred language
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="divide-y p-0">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleSelectLanguage(language.code)}
                className="flex w-full items-center justify-between p-4 transition-colors hover:bg-accent"
              >
                <div className="text-left">
                  <p className="font-medium">{language.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {language.nativeName}
                  </p>
                </div>
                {selectedLanguage === language.code && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button onClick={handleBack} className="w-full">
            Save Changes
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default LanguageSettingsViewPage;
