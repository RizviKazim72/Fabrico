import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import Logo from "./Logo";
import { FOOTER_LINKS, SOCIAL_LINKS } from "../constants/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName) => {
    const icons = {
      facebook: Facebook,
      instagram: Instagram,
      twitter: Twitter,
      linkedin: Linkedin,
      youtube: Youtube,
    };
    return icons[iconName] || Facebook;
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="text-sm text-neutral-400 mb-6 max-w-md">
              Fabrico is your one-stop destination for quality fashion and
              lifestyle products. We bring you the latest trends at unbeatable
              prices.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">
                Subscribe to our newsletter
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="
                    flex-1 px-4 py-2 
                    bg-neutral-800 
                    border border-neutral-700
                    rounded-lg
                    text-white
                    placeholder:text-neutral-500
                    focus:outline-none
                    focus:border-brand-500
                    transition-colors
                  "
                />
                <button
                  className="
                  px-6 py-2
                  bg-brand-500 
                  text-white 
                  rounded-lg
                  hover:bg-brand-600
                  transition-colors
                  font-medium
                "
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-white font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        w-10 h-10
                        bg-neutral-800
                        rounded-lg
                        flex items-center justify-center
                        hover:bg-brand-500
                        transition-all duration-300
                        group
                      "
                      aria-label={social.name}
                    >
                      <Icon
                        size={18}
                        className="text-neutral-400 group-hover:text-white transition-colors"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {FOOTER_LINKS.company.title}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {FOOTER_LINKS.help.title}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.help.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {FOOTER_LINKS.shop.title}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-brand-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Address</h4>
                <p className="text-sm text-neutral-400">
                  123 Fashion Street
                  <br />
                  Mumbai, Maharashtra 400001
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-brand-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Phone</h4>
                <p className="text-sm text-neutral-400">
                  +91 1800-123-4567
                  <br />
                  Mon-Sat, 9AM-6PM IST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-brand-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Email</h4>
                <p className="text-sm text-neutral-400">
                  support@fabrico.com
                  <br />
                  sales@fabrico.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-400">
              © {currentYear} Fabrico. All rights reserved.
            </p>

            <div className="flex items-center gap-1 text-sm text-neutral-400">
              <span>Made with</span>
              <Heart
                size={16}
                className="text-negative-500 fill-negative-500"
              />
              <span>in India</span>
            </div>

            <div className="flex gap-6">
              {FOOTER_LINKS.legal.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
