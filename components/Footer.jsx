import React from "react";

function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-20 md:px-40 py-14 bg-gray-100 text-gray-600">
      <div className="space-y-4 text-xs text-gray-800 pb-4 border-b border-gray-300">
        <h5 className="font-bold">Support</h5>
        <p>Help Center</p>
        <p>AirCover</p>
        <p>Supporting people with disabilities</p>
        <p>Cancellation options</p>
        <p>Our COVID-19 Response</p>
        <p>Report a neighborhood concern</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800 pb-4 border-b border-gray-300">
        <h5 className="font-bold">Community</h5>
        <p>Airbnb.org: disaster relief housing</p>
        <p>Combating discrimination</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800 pb-4 border-b border-gray-300">
        <h5 className="font-bold">Hosting</h5>
        <p>Airbnb your home</p>
        <p>AirCover for Hosts</p>
        <p>Explore hosting resources</p>
        <p>Visit our community forum</p>
        <p>How to host responsibly</p>
        <p>Airbnb-friendly apartments</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800 pb-4 border-b border-gray-300">
        <h5 className="font-bold">Newsroom</h5>
        <p>Learn about new features</p>
        <p>Letter from our founders</p>
        <p>Careers</p>
        <p>Investors</p>
        <p>Gift cards</p>
      </div>
    </div>
  );
}

export default Footer;
