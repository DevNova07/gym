import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/10 py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-heading font-bold text-2xl text-white uppercase tracking-wider mb-4">
            Elevate <span className="text-purple-500">Fitness</span>
          </h2>
          <p className="text-gray-400 max-w-sm mb-8">
            The world's most elite performance facility. Transform your body. Transform your life.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-white uppercase tracking-wider mb-4">Explore</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Programs</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Trainers</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Facility</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-white uppercase tracking-wider mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Elevate Fitness. All rights reserved.
      </div>
    </footer>
  );
}
