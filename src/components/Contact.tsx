import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
// import emailjs from '@emailjs/browser';
import Section from "./common/Section";
import VisitorCounter from "./common/VisitorCounter";
import portfolioData from "../data/portfolioData.json";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: React.FC = () => {
  const { contact } = portfolioData;
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [resultMessage, setResultMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setResultMessage("");

    try {
      const formData = new FormData();
      // Access Key - Required
      formData.append("access_key", "ae44e3ef-a072-4983-a904-f6a73f5b7d25");

      // Form Data
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      // Optional: Custom Redirect
      // formData.append("redirect", "https://yourwebsite.com/thanks");

      // Optional: Subject
      formData.append("subject", `New Message from ${data.name}`);

      // Optional: From Name (shows in email)
      formData.append("from_name", "Portfolio Contact Form");

      // Honeypot - Anti-spam protection
      // If this field is filled by a bot, the submission will be ignored.
      // We handle this via a hidden input in the JSX, but we can also check it here if we were doing manual validation.
      // Web3Forms checks the 'botcheck' field automatically.

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const resData = await response.json();

      if (resData.success) {
        setSubmitStatus("success");
        setResultMessage("Message sent successfully!");
        reset();
      } else {
        setSubmitStatus("error");
        setResultMessage(
          resData.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setResultMessage("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
      // Clear success message after 5 seconds
      setTimeout(() => {
        if (submitStatus === "success") {
          setSubmitStatus("idle");
          setResultMessage("");
        }
      }, 5000);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "📧":
        return <Mail className="w-6 h-6 text-primary" />;
      case "📱":
        return <Phone className="w-6 h-6 text-primary" />;
      case "📍":
        return <MapPin className="w-6 h-6 text-primary" />;
      default:
        return null;
    }
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case "GitHub":
        return <Github size={24} />;
      case "LinkedIn":
        return <Linkedin size={24} />;
      case "Instagram":
        return <Instagram size={24} />;
      default:
        return null;
    }
  };

  return (
    <Section
      id="contact"
      title="Get in Touch"
      subtitle="Let's build something amazing together"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">
              {contact.title}
            </h3>
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
              {contact.description}
            </p>
          </div>

          <div className="space-y-6">
            {contact.details.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="p-3 bg-white/60 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10">
                  {getIcon(item.icon)}
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-white/10">
            <h4 className="text-lg font-medium text-foreground dark:text-white mb-4">
              Connect with me
            </h4>
            <div className="flex space-x-4 mb-6">
              {contact.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/60 dark:bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5"
                >
                  {getSocialIcon(link.name)}
                </a>
              ))}
            </div>
            <VisitorCounter />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-sm"
        >
          <form
            ref={form}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Hidden Inputs for Web3Forms Configuration */}
            <input
              type="hidden"
              name="access_key"
              value="ae44e3ef-a072-4983-a904-f6a73f5b7d25"
            />

            {/* Honeypot Spam Protection */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              aria-label="Bot check (leave empty)"
              tabIndex={-1}
            />

            {/* 
                           Optional: Google reCAPTCHA v3 
                           If you want to use Google reCAPTCHA, you need to:
                           1. Register your site at https://www.google.com/recaptcha/admin/create
                           2. Get the Site Key and Secret Key
                           3. Enable reCAPTCHA in your Web3Forms dashboard settings
                           4. Add the reCAPTCHA script to your index.html or use a library
                           
                           For now, we are using Web3Forms built-in spam protection (Honeypot + AI).
                        */}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
              >
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-foreground dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Your name goes here"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-foreground dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="example@service.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
              >
                Message
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={4}
                className="w-full bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-foreground dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="Your message here..."
              />
              {errors.message && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>

            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 dark:text-green-400 text-center text-sm font-medium"
              >
                {resultMessage}
              </motion.p>
            )}
            {submitStatus === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 dark:text-red-400 text-center text-sm font-medium"
              >
                {resultMessage}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
