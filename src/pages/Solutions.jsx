import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiSliders,
  FiMessageCircle,
  FiUserCheck,
  FiClock,
  FiShield,
  FiHeart,
  FiBriefcase,
  FiDollarSign,
  FiActivity,
  FiUsers,
  FiSmile,
  FiTrendingUp,
  FiCheckCircle,
  FiStar,
  FiChevronRight
} from "react-icons/fi";
import {
  FaHeart,
  FaUserFriends,
  FaBriefcase,
  FaCoins,
  FaHeartbeat,
  FaRing,
  FaBaby,
  FaGavel
} from "react-icons/fa";
import Bottomnav from "../component/Bottomnav";

const SOLUTION_CATEGORIES = [
  {
    id: "love",
    title: "Love Problems",
    icon: FaHeart,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    desc: "Solutions for heartbreak, partner attraction, and love compatibility.",
  },
  {
    id: "relationship",
    title: "Relationship Issues",
    icon: FaUserFriends,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    desc: "Resolve misunderstandings and rebuild trust with your partner.",
  },
  {
    id: "career",
    title: "Career Guidance",
    icon: FaBriefcase,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    desc: "Job promotions, business growth, and career path direction.",
  },
  {
    id: "finance",
    title: "Finance Solutions",
    icon: FaCoins,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    desc: "Debt recovery, wealth stabilization, and investment timing.",
  },
  {
    id: "health",
    title: "Health Concerns",
    icon: FaHeartbeat,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    desc: "Astrological insights on mental stress and physical well-being.",
  },
  {
    id: "marriage",
    title: "Marriage Assistance",
    icon: FaRing,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    desc: "Delay in marriage, Kundali matching, and marital bliss remedies.",
  },
  {
    id: "pregnancy",
    title: "Pregnancy Guidance",
    icon: FaBaby,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    desc: "Childbirth obstacles, auspicious times, and progeny remedies.",
  },
  {
    id: "legal",
    title: "Legal Matters",
    icon: FaGavel,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    desc: "Court cases, property disputes, and enemy protection remedies.",
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Priya S.",
    problem: "Career Guidance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    comment: "I was facing severe career confusion. Their guidance really helped me get clarity. Now I'm in a much better place!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul K.",
    problem: "Relationship Issues",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    comment: "Had relationship issues for months. After talking to their expert on WhatsApp, I got peace of mind. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Anjali M.",
    problem: "Marriage Assistance",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    comment: "Accurate planetary remedies for delayed marriage. We felt genuine support without high costs.",
    rating: 5,
  }
];

export default function Solutions() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = SOLUTION_CATEGORIES.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWhatsAppConsultation = (categoryTitle = "General Problem") => {
    const phoneNumber = "919876543210"; // WhatsApp Contact
    const message = `Namaste 🙏

I would like free guidance for my problem.

📌 *Category*: ${categoryTitle}
💬 *My Problem*: [Please briefly describe your problem here]

Could an experienced astrology expert assist me with remedies? Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=` + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F6E9E3] flex justify-center">
      <div className="w-full max-w-[430px] bg-[#FDE8E4] min-h-screen relative shadow-xl flex flex-col">
        
        {/* Scrollable Content */}
        <div className="pb-28 overflow-y-auto flex-1">
          
          {/* Header Banner - Standard App Header Style */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-b-[32px] px-5 pt-10 pb-7 shadow-md">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="text-white cursor-pointer hover:opacity-80 transition"
                aria-label="Go back"
              >
                <FiArrowLeft size={27} />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  Solutions (Samadhan)
                </h1>
                <p className="text-orange-100 text-sm mt-1">
                  Find answers to life's challenges
                </p>
              </div>
            </div>

            {/* Search Input */}
            <div className="mt-6 bg-white rounded-full h-14 px-5 flex items-center gap-3 shadow-md">
              <FiSearch size={22} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your problem..."
                className="flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm bg-transparent"
              />
              <FiSliders size={21} className="text-gray-400" />
            </div>
          </div>

          {/* Solution Guarantee Card */}
          <div className="mx-4 mt-5 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 rounded-3xl p-4 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1d2340] leading-snug">
                Every problem has a <span className="text-orange-600">solution</span>
              </h2>
              <p className="text-xs text-gray-600 mt-1 max-w-[230px] leading-relaxed">
                Get guidance from our experienced astrology experts on WhatsApp.
              </p>
            </div>
            <div className="text-3xl shrink-0">🪔</div>
          </div>

          {/* Browse by Category Grid */}
          <div className="px-4 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#1d2340]">Browse by Category</h2>
              <span className="text-xs font-bold text-orange-600 cursor-pointer">
                View All →
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {filteredCategories.map((cat) => {
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleWhatsAppConsultation(cat.title)}
                    className="bg-white rounded-2xl p-2.5 flex flex-col items-center justify-center text-center border border-orange-100/70 shadow-xs hover:shadow-md active:scale-95 transition-all h-[104px]"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${cat.bgColor} flex items-center justify-center mb-1.5`}
                    >
                      <IconComp className={cat.color} size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-[#1d2340] leading-tight line-clamp-2">
                      {cat.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Value Props Bar */}
          <div className="mx-4 mt-6 bg-white rounded-3xl border border-orange-100 p-3 shadow-xs">
            <div className="grid grid-cols-4 divide-x divide-gray-100 text-center">
              <div className="px-1 flex flex-col items-center">
                <FiMessageCircle className="text-orange-500 mb-1" size={16} />
                <p className="text-[10px] font-extrabold text-[#1d2340] leading-tight">Free Chat</p>
                <p className="text-[8px] text-gray-500">On WhatsApp</p>
              </div>

              <div className="px-1 flex flex-col items-center">
                <FiUserCheck className="text-orange-500 mb-1" size={16} />
                <p className="text-[10px] font-extrabold text-[#1d2340] leading-tight">Experienced</p>
                <p className="text-[8px] text-gray-500">Astro Experts</p>
              </div>

              <div className="px-1 flex flex-col items-center">
                <FiClock className="text-orange-500 mb-1" size={16} />
                <p className="text-[10px] font-extrabold text-[#1d2340] leading-tight">Quick Response</p>
                <p className="text-[8px] text-gray-500">Within 24 Hours</p>
              </div>

              <div className="px-1 flex flex-col items-center">
                <FiShield className="text-orange-500 mb-1" size={16} />
                <p className="text-[10px] font-extrabold text-[#1d2340] leading-tight">100% Private</p>
                <p className="text-[8px] text-gray-500">& Confidential</p>
              </div>
            </div>
          </div>

          {/* Real People. Real Solutions (Reviews Carousel) */}
          <div className="px-4 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#1d2340]">Real People. Real Solutions.</h2>
              <span className="text-xs font-bold text-orange-600 cursor-pointer">
                View All Reviews →
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="w-[270px] shrink-0 bg-white rounded-2xl p-4 border border-orange-100 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-orange-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#1d2340]">{rev.name}</h4>
                      <p className="text-[10px] text-orange-600 font-medium">{rev.problem}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 italic mt-2.5 line-clamp-3 leading-snug">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center gap-1 text-amber-400 mt-2 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-amber-400" size={12} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Green WhatsApp Consultation CTA Banner */}
          <div className="mx-4 mt-6">
            <div
              onClick={() => handleWhatsAppConsultation("General Guidance")}
              className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-green-200 rounded-3xl p-4 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shrink-0">
                  <FiMessageCircle size={26} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold tracking-wider text-green-700 uppercase">
                    GET YOUR SOLUTION NOW
                  </span>
                  <h3 className="text-sm font-extrabold text-[#1d2340] leading-snug">
                    Chat with our Experts for <span className="text-green-600 uppercase">FREE</span>
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Share your problem on WhatsApp & get guidance.
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white text-green-600 flex items-center justify-center shadow-xs shrink-0">
                <FiChevronRight size={20} />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>
    </div>
  );
}
