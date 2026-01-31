"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/modules/point/components/BottomNavigation";
import { RouteConfig } from "@/config/route.config";
import { useTranslation } from "react-i18next";
import Cookie from "js-cookie";
import { useState, useEffect } from "react";

const languages = [
  { code: "th", name: "ภาษาไทย", nativeName: "Thai", flag: "🇹🇭" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
];

const LanguageSettingsViewPage = () => {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const { t, i18n } = useTranslation("profile");
  const currentLang = Cookie.get("i18next") || "en";
  const [client, setClient] = useState(false);
  const [lang, setLang] = useState(currentLang);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  const handleBack = () => {
    i18n.changeLanguage(lang);
    Cookie.set("i18next", lang, { expires: 365 });
    router.push(RouteConfig.PROFILE.PROFILE(params.orgId));
  };

  const handleSelectLanguage = (langCode: string) => {
    setLang(langCode);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 pb-24">
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
            <h1 className="text-2xl font-bold">
              {t("languageSettings.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("languageSettings.subtitle")}
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="divide-y p-0">
            {languages.map((language) => {
              const isActive = lang === language.code;
              return (
                <button
                  key={language.code}
                  onClick={() => handleSelectLanguage(language.code)}
                  className={`flex w-full items-center gap-3 p-4 transition-colors hover:bg-accent ${
                    isActive ? "bg-accent/50" : ""
                  }`}
                >
                  <span className="text-2xl shrink-0">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{language.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {language.nativeName}
                    </p>
                  </div>
                  {isActive && (
                    <Check className="h-5 w-5 text-primary shrink-0" />
                  )}
                </button>
              );
            })}
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button onClick={handleBack} className="w-full">
            {t("languageSettings.action.save")}
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default LanguageSettingsViewPage;
