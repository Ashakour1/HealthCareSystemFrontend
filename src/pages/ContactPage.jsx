import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";

export default function ContactPage() {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Loading state
  const [loading, setLoading] = useState(false);

  // Clear the form data
  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  // Function to validate form data
  const validate = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  // Function to handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!validate()) {
      return;
    }

    setLoading(true);

    const templateParams = {
      to_email: formData.email,
      to_name: `${formData.firstName} ${formData.lastName}`,
      from_name: "Eventify", // Replace with your company or dynamic value
      message: formData.message,
    };

    try {
      // Sending the form data via emailjs
      await emailjs.send(
        "your_service_id", // Replace with your service ID
        "your_template_id", // Replace with your template ID
        templateParams,
        "your_user_id" // Replace with your user ID
      );

      toast.success("Message sent successfully!");
      setLoading(false);
      clearForm();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send message. Please try again.");
      clearForm();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <section className="bg-muted py-12 md:py-20 lg:py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-6 px-3">
              <div className="space-y-4">
                <h2 className="text-3xl text-customBlue font-bold md:text-4xl">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground text-gray-500 md:text-lg">
                  Have a question or want to work together? Fill out the form or
                  use the contact information below.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="h-6 w-6 text-customBlue" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">
                      123 Main St, Anytown USA 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaPhone className="h-6 w-6 text-customBlue" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaEnvelope className="h-6 w-6 text-customBlue" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      <Link to="mailto:info@example.com" className="text-blue-500 hover:underline">
                        info@example.com
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-background shadow-lg">
              <form className="rounded-lg p-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="mt-1 p-2 w-full border rounded"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="mt-1 p-2 w-full border rounded"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-2 w-full border rounded"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="mt-1 p-2 w-full border rounded"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Select Subject</label>
                  <div className="block md:flex md:flex-wrap space-y-2 md:space-y-0 mt-2">
                    <label className="flex items-center mb-2 md:mb-0 md:mr-4">
                      <input
                        type="radio"
                        name="subject"
                        value="General Inquiry"
                        className="mr-2"
                        onChange={handleChange}
                      />
                      <span>General Inquiry</span>
                    </label>
                    <label className="flex items-center mb-2 md:mb-0 md:mr-4">
                      <input
                        type="radio"
                        name="subject"
                        value="Technical Issue"
                        className="mr-2"
                        onChange={handleChange}
                      />
                      <span>Technical Issue</span>
                    </label>
                    <label className="flex items-center mb-2 md:mb-0 md:mr-4">
                      <input
                        type="radio"
                        name="subject"
                        value="Feedback"
                        className="mr-2"
                        onChange={handleChange}
                      />
                      <span>Feedback</span>
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="mt-1 p-2 w-full border rounded"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message.."
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="bg-customBlue w-full text-white px-6 py-2 rounded shadow hover:bg-gray-800"
                >
                  {loading ? (
                    <svg
                      className="animate-spin border-white border-2 rounded-full h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      ></circle>
                    </svg>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}