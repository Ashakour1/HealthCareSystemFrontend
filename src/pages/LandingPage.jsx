import { Link } from "react-router-dom";

import CTA from "./CTA";
import Testiomonials from "./Testiomonials";
import {
  FaBell,
  FaCalendar,
  FaClipboard,
  FaPhone,
  FaShieldAlt,
  FaTextWidth,
} from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full bg-cover bg-center py-24 md:py-32 lg:py-40">
        <img
          src="https://www.rajagirihospital.com/Userfiles/Poster/2bc5e43752c04d55904ea8db56579e96.jpg"
          alt="Hospital staff"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 container px-4 md:px-6">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl">
              Streamline Your Hospital Appointments
            </h1>
            <p className="text-lg text-black md:text-xl">
              Our intuitive appointment system makes it easy for patients to
              book, manage, and track their hospital visits.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-black text-white px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Book Demo
              </Link>
              <Link
                to="/about"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input  text-black bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:">
          <div className="mx-auto max-w-6xl space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Our appointment system offers a range of features to streamline
                your hospital experience.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <FaCalendar className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Online Booking</h3>
                <p className="text-muted-foreground text-sm">
                  Patients can easily book appointments online at their
                  convenience.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaBell className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Automated Reminders</h3>
                <p className="text-muted-foreground text-sm">
                  Receive timely reminders for upcoming appointments to avoid
                  missed visits.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaTextWidth className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Patient History</h3>
                <p className="text-muted-foreground text-sm">
                  Keep track of your medical history and past appointments.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaClipboard className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">
                  Appointment Management
                </h3>
                <p className="text-muted-foreground text-sm">
                  Easily manage and reschedule appointments as needed.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaShieldAlt className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Secure Data</h3>
                <p className="text-muted-foreground text-sm">
                  Your personal information is kept safe and secure.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <FaPhone className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">Mobile Accessibility</h3>
                <p className="text-muted-foreground text-sm">
                  Access your appointment details on the go with our mobile app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Testiomonials />
    </div>
  );
}
