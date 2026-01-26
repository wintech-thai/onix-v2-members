"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomNavigation } from "@/modules/point/components/BottomNavigation";
import { RouteConfig } from "@/config/route.config";
import { useParams } from "next/navigation";

const ConsentViewPage = () => {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();

  const handleBack = () => {
    router.push(RouteConfig.PROFILE.PROFILE(params.orgId));
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
            <h1 className="text-2xl font-bold">Consent & Privacy</h1>
            <p className="text-sm text-muted-foreground">
              Terms of service and privacy policy
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Terms of Service */}
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-60">
                <div className="space-y-4 pr-4 text-sm text-muted-foreground">
                  <p>
                    <strong>Last updated:</strong> January 17, 2026
                  </p>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      1. Acceptance of Terms
                    </h4>
                    <p>
                      By accessing and using this members portal, you accept and
                      agree to be bound by the terms and provision of this
                      agreement.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      2. Use License
                    </h4>
                    <p>
                      Permission is granted to temporarily access the materials
                      on this portal for personal, non-commercial transitory
                      viewing only.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      3. Points and Rewards
                    </h4>
                    <p>
                      Points earned through this program are non-transferable
                      and have no cash value. Points may expire according to the
                      program rules.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      4. Account Responsibilities
                    </h4>
                    <p>
                      You are responsible for maintaining the confidentiality of
                      your account and password. You agree to accept
                      responsibility for all activities that occur under your
                      account.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      5. Modifications
                    </h4>
                    <p>
                      We reserve the right to modify these terms at any time.
                      Your continued use of the portal following any changes
                      indicates your acceptance of the new terms.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-60">
                <div className="space-y-4 pr-4 text-sm text-muted-foreground">
                  <p>
                    <strong>Last updated:</strong> January 17, 2026
                  </p>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      1. Information We Collect
                    </h4>
                    <p>
                      We collect information you provide directly to us,
                      including your name, email address, phone number, birth
                      date, and transaction history.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      2. How We Use Your Information
                    </h4>
                    <p>
                      We use the information we collect to provide, maintain,
                      and improve our services, process transactions, send you
                      technical notices and support messages.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      3. Location Data
                    </h4>
                    <p>
                      With your consent, we may collect and process information
                      about your location to provide location-based services and
                      personalized content.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      4. Data Security
                    </h4>
                    <p>
                      We implement appropriate technical and organizational
                      measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or
                      destruction.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      5. Your Rights
                    </h4>
                    <p>
                      You have the right to access, update, or delete your
                      personal information at any time. You may also object to
                      processing of your personal data.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">
                      6. Contact Us
                    </h4>
                    <p>
                      If you have any questions about this Privacy Policy,
                      please contact us at privacy@example.com
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ConsentViewPage;
