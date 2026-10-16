import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "Services",
    links: [
      { href: "/#services", label: "Core Services" },
      { href: "/#tiers", label: "IT Helpdesk Tiers" },
      { href: "/#delivery", label: "Delivery Model" },
      { href: "/#clients", label: "Experience Profile" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "https://raymond-gray.org", label: "Main Raymond Gray Site" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:remotesupport@raymond-gray.org", label: "remotesupport@raymond-gray.org" },
      { href: "/#contact", label: "Get in Touch" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-rg-navy text-white/80 pt-8 sm:pt-10 pb-4 sm:pb-6 lg:pt-16 lg:pb-6 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-8 mb-12 sm:mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Image
                src="/logos/RaymondgraylogoNoTextNoBG.png"
                alt="Raymond Gray"
                width={28}
                height={28}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain brightness-0 invert opacity-90"
              />
              <span className="font-display font-bold text-base sm:text-xl text-white tracking-tight">
                Raymond Gray <span className="font-normal text-white/60">| Remote Support</span>
              </span>
            </div>
            <p className="font-display font-medium text-xl text-white mb-3 sm:mb-4">
              Reliable remote support. <em>Worldwide.</em>
            </p>
            <p className="text-white/60 leading-relaxed max-w-none sm:max-w-sm text-base sm:text-lg">
              Back-office administration, customer service operations, and IT helpdesk coverage — built on Raymond Gray&rsquo;s engineering discipline. Accra, Ghana.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-white text-base sm:text-lg mb-4 sm:mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4 sm:space-y-6">
                {section.links.map((link) => (
                  <li key={link.href + link.label} className="px-2 py-2">
                    {link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="block hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="block hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-col md:flex-row items-center justify-between text-center sm:text-center md:text-left gap-3 sm:gap-4 md:gap-0 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-col md:flex-row items-center justify-start sm:justify-start md:justify-start gap-2 sm:gap-4 md:gap-4 flex-1">
            <span>Raymond Gray Limited</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>Accra, Ghana</span>
          </div>

          <div className="flex justify-center items-center flex-1">
            <span>© {new Date().getFullYear()} · All rights reserved</span>
          </div>

          <div className="flex flex-col sm:flex-col md:flex-row items-center justify-end sm:justify-end md:justify-end gap-3 sm:gap-4 md:gap-4 flex-1">
            <Link href="https://raymond-gray.org/privacy" className="block px-2 py-2 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden md:inline text-white/20">|</span>
            <Link href="https://raymond-gray.org/terms" className="block px-2 py-2 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
