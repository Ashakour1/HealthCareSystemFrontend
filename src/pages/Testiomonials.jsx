import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
const Testiomonials = () => {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Hear from our satisfied patients who have used our appointment
                system.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 text-left">
                <blockquote className="text-lg font-semibold leading-snug">
                  &ldquo;The appointment system is so easy to use. I was able to
                  book my appointment in just a few clicks.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">
                      Patient, Acme Hospital
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6 text-left">
                <blockquote className="text-lg font-semibold leading-snug">
                  &ldquo;The automated reminders have been a game-changer for
                  me. I never miss an appointment now.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Jane Appleseed</div>
                    <div className="text-sm text-muted-foreground">
                      Patient, Acme Hospital
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6 text-left">
                <blockquote className="text-lg font-semibold leading-snug">
                  &ldquo;I love being able to access my appointment history and
                  medical records through the app. It's so convenient.&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Sarah Anderson</div>
                    <div className="text-sm text-muted-foreground">
                      Patient, Acme Hospital
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testiomonials;
