import { X } from "lucide-react";
import contactBg from "../../assets/images/contract-bg.jpg";

export default function ContactPage({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#30574E]/70 backdrop-blur-md flex items-center justify-center px-6">

      {/* OUTER CONTAINER */}
      <div className="relative w-full max-w-[1400px] h-[85vh] rounded-[28px] overflow-hidden bg-white shadow-2xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-6 right-6 z-20
            w-10 h-10 rounded-full
            bg-white/80 hover:bg-white
            flex items-center justify-center
            transition
          "
        >
          <X className="w-5 h-5 text-[#30574E]" />
        </button>

        <div className="h-full grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT IMAGE PANEL */}
          <div className="relative hidden lg:block">

            {/* Green base */}
            <div className="absolute inset-0 bg-[#30574E]" />

            {/* Image */}
            <img
              src={contactBg}
              alt="Contact background"
              className="
                absolute inset-0
                w-full h-full
                object-cover
                opacity-80
              "
            />

            {/* Soft overlay for readability */}
            <div className="absolute inset-0 bg-[#30574E]/40" />

            {/* Social icons */}
            <div className="absolute bottom-6 left-6 flex gap-4 text-white/90 text-sm z-10">
              <span>in</span>
              <span>ig</span>
              <span>x</span>
            </div>
          </div>

          {/* RIGHT CONTACT CARD */}
          <div className="flex items-center justify-center">

            <div
              className="
                w-full max-w-[480px]
                h-[90%]
                rounded-[48px_0_0_48px]
                px-10 py-12
                flex flex-col justify-between
                bg-white
              "
            >
              {/* TOP CONTENT */}
              <div>
                <h2 className="text-5xl font-medium leading-tight text-[#30574E] mb-6">
                  Get in
                  <br />
                  touch
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-10">
                  We’re here to help you explore how data-backed carbon
                  infrastructure can support your climate and compliance
                  goals. Reach out to us directly — we’d love to talk.
                </p>

                <div className="border-t border-gray-200 pt-6 space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                      For all inquiries
                    </p>
                    <p className="text-lg font-medium text-[#30574E]">
                      offset@tryoffset.com
                    </p>
                  </div>

                </div>
              </div>

            
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
