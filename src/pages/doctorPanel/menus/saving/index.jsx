import React from "react";
import { Save, ShieldCheck, Wifi, FilePlus } from "lucide-react";

const SavingTab = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg space-y-10">
      <div className="flex items-center gap-4">
        <Save className="text-blue-600 w-10 h-10" />
        <h1 className="text-4xl font-bold text-gray-800">
          Save Your Work with Confidence
        </h1>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            🔄 Real-time Saving Status
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our system ensures that all patient details and uploaded documents are saved instantly and securely.
            You’ll receive instant feedback on success or failure—so you’re never left wondering.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            💡 Best Practices for Saving
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Keep your internet connection stable <Wifi className="inline w-4 h-4 ml-1 text-blue-400" /></li>
            <li>Only upload supported formats (PDF, PNG, JPG) <FilePlus className="inline w-4 h-4 ml-1 text-blue-400" /></li>
            <li>Save regularly to avoid session timeouts</li>
            <li>Use clear file names for easier reference later</li>
            <li>Do not refresh the page during uploads</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            🔒 Secure & Compliant
          </h2>
          <div className="flex items-start gap-4">
            <ShieldCheck className="text-green-600 w-6 h-6 mt-1" />
            <p className="text-gray-700">
              All your data is encrypted and stored following HIPAA-compliant standards.
              Only authorized personnel have access to patient documents.
              Security is our top priority.
            </p>
          </div>
        </section>
      </div>

      <div className="text-center">
        <p className="text-gray-600 italic">
          “Saving data shouldn’t be stressful — we’ve made it seamless and secure.”
        </p>
      </div>
    </div>
  );
};

export default SavingTab;
