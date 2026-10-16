"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import Image from "next/image";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formLoadedAtRef = useRef<number>(0);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    company: string;
    message: string;
  }>(() => {
    try {
      const saved = sessionStorage.getItem("rg_rs_contact_form");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load saved form data", e);
    }
    return { name: "", email: "", company: "", message: "" };
  });

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("rg_rs_contact_form", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formLoadedAt: formLoadedAtRef.current }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        sessionStorage.removeItem("rg_rs_contact_form");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 bg-rg-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-rg-line-soft">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-12 bg-rg-navy text-white flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <Image
                  src="/logos/RaymondgraylogoNoTextNoBG.png"
                  alt="Raymond Gray"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
                <span className="font-display font-medium text-base sm:text-lg tracking-tight text-white">
                  Raymond <span className="font-normal text-white/80">Gray | Remote Support</span>
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl mb-4 sm:mb-6">
                Ready to streamline your operations?
              </h2>
              <p className="text-rg-navy-100 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                Whether you need dedicated L2 IT support or back-office administration, Raymond Gray provides reliable, scalable solutions worldwide.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-white/90 uppercase tracking-wider mb-1">Email</h4>
                  <p className="text-white text-sm sm:text-base">remotesupport@raymond-gray.com</p>
                </div>
                <div>
                  <h4 className="text-sm text-white/90 uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-white text-sm sm:text-base">
                    Accra, Ghana<br /> Serving SMEs Worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12">
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-rg-navy mb-4 sm:mb-6">
                Request Support
              </h3>

              {status === "success" ? (
                <div className="bg-green-50 text-green-800 p-8 rounded-lg text-center border border-green-200 flex flex-col items-center justify-center h-full">
                  <p className="font-display font-medium text-xl mb-3">Message Sent Successfully!</p>
                  <p className="text-sm text-green-700 mb-6">We&apos;ll get back to you shortly.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-white border border-green-300 text-green-800 font-medium rounded-md hover:bg-green-100 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Leave this field empty</label>
                    <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-rg-ink-soft mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all h-10 sm:h-auto"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-rg-ink-soft mb-1">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all h-10 sm:h-auto"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-rg-ink-soft mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all h-10 sm:h-auto"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-rg-ink-soft mb-1">
                      How can we help?
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 sm:py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all h-10 sm:h-auto resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-600 text-sm" role="alert">
                      Failed to send message. Please try again later or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-busy={status === "loading"}
                    className="w-full py-3.5 sm:py-3 px-6 bg-rg-accent text-white font-medium rounded-md hover:bg-rg-accent-deep transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? "Sending..." : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
