import Team from "@/components/Team";
import {
  FaRocket,
  FaUsers,
  FaBolt,
  FaInfinity,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[400px] overflow-hidden">
        <div className="w-full h-full bg-[url(./conference.png)] bg-no-repeat bg-cover opacity-75 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center pt-24">
            <h1 className="text-4xl font-bold text-white mt-2">
              About Healthcare Appointment System
            </h1>
            <p className="text-base text-white w-8/12 text-center mt-3 md:text-xl">
              The Healthcare Appointment System is a user-friendly platform
              designed to streamline the scheduling and management of patient
              appointments. This system is tailored for healthcare administrators
              to efficiently handle appointments and ensure smooth patient
              interactions.
            </p>
          </div>
        </div>
      </section>
      <Team />
      <section className="py-12 md:py-24 lg:py-32">
        <div className="max-w-[1140px] mx-auto container">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At the core of our system are values that drive our mission and
              guide our approach to healthcare management.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center text-center">
              <FaRocket className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold mt-4">Innovation</h3>
              <p className="text-gray-600">
                We integrate cutting-edge technology to enhance the appointment
                scheduling experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUsers className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold mt-4">Collaboration</h3>
              <p className="text-gray-600">
                We work closely with healthcare professionals to tailor our
                system to meet their needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaBolt className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold mt-4">Agility</h3>
              <p className="text-gray-600">
                Our system adapts to evolving healthcare requirements and user
                feedback.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaInfinity className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-bold mt-4">Integrity</h3>
              <p className="text-gray-600">
                We uphold transparency and ethical standards in managing patient
                data and appointments.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">Ready to Optimize Your Appointment Scheduling?</h2>
          <p className="text-gray-600 max-w-2xl mt-4">
            Discover how the Healthcare Appointment System can improve your
            scheduling efficiency and patient management.
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              to="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white bg-black shadow transition-colors hover:bg-gray-900 focus-visible:outline-none"
            >
              Learn More
            </Link>
            <Link
              to="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
