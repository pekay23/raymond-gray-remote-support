"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Image from "next/image";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-rg-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-rg-line-soft">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-12 bg-rg-navy text-white flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src="/logos/RaymondgraylogoNoTextNoBG.png"
                  alt="Raymond Gray"
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <span className="font-display font-medium text-lg tracking-tight text-white">
                  Raymond <span className="font-normal text-white/80">Gray | Remote Support</span>
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl mb-6">Ready to streamline your operations?</h2>
              <p className="text-rg-navy-100 mb-8 leading-relaxed">
                Whether you need dedicated L2 IT support or back-office administration, Raymond Gray provides reliable, scalable solutions worldwide.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-rg-accent-light uppercase tracking-wider mb-1">Email</h4>
                  <p>remotesupport@raymond-gray.com</p>
                </div>
                <div>
                  <h4 className="text-sm text-rg-accent-light uppercase tracking-wider mb-1">Location</h4>
                  <p>Accra, Ghana<br/>Serving SMEs Worldwide</p>
                </div>
              </div>
            </div>
            
            <div className="p-10 md:p-12">
              <h3 className="font-display font-semibold text-2xl text-rg-navy mb-6">Request Support</h3>
              
              {status === "success" ? (
                <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center border border-green-200">
                  <p className="font-medium mb-2">Message Sent Successfully!</p>
                  <p className="text-sm text-green-700">We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-rg-ink-soft mb-1">Full Name</label>
                    <input required type="text" id="name" name="name" className="w-full px-4 py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-rg-ink-soft mb-1">Work Email</label>
                    <input required type="email" id="email" name="email" className="w-full px-4 py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-rg-ink-soft mb-1">Company</label>
                    <input type="text" id="company" name="company" className="w-full px-4 py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-rg-ink-soft mb-1">How can we help?</label>
                    <textarea required id="message" name="message" rows={4} className="w-full px-4 py-2 rounded-md border border-rg-line-soft focus:ring-2 focus:ring-rg-accent focus:border-rg-accent outline-none transition-all resize-none"></textarea>
                  </div>
                  
                  {status === "error" && (
                    <p className="text-red-600 text-sm">Failed to send message. Please try again later or email us directly.</p>
                  )}
                  
                  <button
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full py-3 px-6 bg-rg-accent hover:bg-rg-accent-deep text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                    {status !== "loading" && <Send size={18} />}
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
