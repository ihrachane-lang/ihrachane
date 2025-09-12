import { HiOutlineGlobeAlt } from "react-icons/hi";
import { FaUserShield, FaCheckCircle, FaGlobeAmericas } from "react-icons/fa";
import { getData } from "@/utils/axiosPublic";
import { useEffect, useState } from "react";

const MoreInfo = () => {
  const [about, setAbout] = useState({});
  useEffect(() => {
    async function fetchData() {
      const { data } = await getData("/api/company/details");
      setAbout(data);
    }
    fetchData();
  }, []);

 
  const features = [
    {
      icon: <FaUserShield className="w-6 h-6 text-orange-600" />,
      title: "Verified Suppliers",
      description: "All suppliers are thoroughly vetted and verified",
    },
    {
      icon: <FaCheckCircle className="w-6 h-6 text-orange-600" />,
      title: "Quality Assurance",
      description: "Comprehensive quality control and inspection",
    },
    {
      icon: <FaGlobeAmericas className="w-6 h-6 text-orange-600" />,
      title: "Global Network",
      description: "Access to suppliers in 50+ countries",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-orange-100 max-w-xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="bg-orange-100 text-orange-600 p-2 rounded-full">
            <HiOutlineGlobeAlt className="w-8 h-8" />
          </span>
          Why Choose Us?
        </h3>
        <ul className="space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="bg-orange-50 p-2 rounded-full shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-lg">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Need Help?</h3>
        <p className="mb-4 text-orange-100">
          Our sourcing experts are available 24/7 to assist you with your
          requirements.
        </p>
        <div className="space-y-2 text-orange-50">
          <p className="flex items-center">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            {about?.email}
          </p>
          <p className="flex items-center">
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            {about?.phoneNumber}
          </p>
          <p className="flex items-center">
            <svg
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.472 14.381c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.359-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.487"
                fill="#ffffff"
              />
            </svg>
            {about?.whatsAppNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
