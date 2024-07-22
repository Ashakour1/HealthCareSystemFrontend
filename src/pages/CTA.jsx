import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const CTA = () => {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get Started
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Sign up today and experience the convenience of our hospital
                appointment system.
              </p>
            </div>
            <form className="mx-auto flex max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">Get Started</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;
