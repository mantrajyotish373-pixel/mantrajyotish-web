import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiSliders,
  FiCheck,
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiMapPin,
  FiUser,
  FiPhone,
  FiMessageCircle,
  FiX,
  FiShield,
  FiTruck,
  FiAward
} from "react-icons/fi";
import Bottomnav from "../component/Bottomnav";

const STORE_PRODUCTS = [
  {
    id: 1,
    title: "5 Mukhi Rudraksha Mala",
    category: "Mala & Beads",
    price: 999,
    oldPrice: 1499,
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80",
    description: "Energized 108+1 natural 5 Mukhi Nepal Rudraksha beads for peace of mind, health, and focus.",
    popular: true,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Natural Yellow Sapphire (Pukhraj)",
    category: "Gemstones",
    price: 3499,
    oldPrice: 4999,
    image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=600&q=80",
    description: "Certified unheated lab-tested yellow sapphire for luck, higher education, and financial wisdom.",
    popular: true,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Shree Yantra (Brass)",
    category: "Yantras",
    price: 1299,
    oldPrice: 1899,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80",
    description: "Authentic heavy brass 3D Shree Yantra for abundance, wealth attraction, and harmony at home.",
    popular: false,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Sphatik (Quartz) Crystal Mala",
    category: "Mala & Beads",
    price: 799,
    oldPrice: 1199,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    description: "Cooling pure original Sphatik beads for mental composure, emotional stability, and prayers.",
    popular: false,
    rating: 4.9,
  },
  {
    id: 5,
    title: "Original Red Coral (Moonga)",
    category: "Gemstones",
    price: 2499,
    oldPrice: 3299,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    description: "Natural Italian Red Coral gemstone for vitality, courage, and overcoming Mangal Dosha.",
    popular: false,
    rating: 4.8,
  },
  {
    id: 6,
    title: "Kuber Yantra Brass Plate",
    category: "Yantras",
    price: 899,
    oldPrice: 1299,
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=600&q=80",
    description: "Specialized Lord Kuber yantra plate to unlock blocked money and open new revenue channels.",
    popular: true,
    rating: 4.9,
  }
];

const CATEGORIES = ["All", "Mala & Beads", "Gemstones", "Yantras"];

export default function AstroStore() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Cart & Checkout state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart Items, 2: Address Form

  const [addressData, setAddressData] = useState({
    fullName: "",
    mobileNumber: "",
    pincode: "",
    houseNo: "",
    streetAddress: "",
    city: "",
    state: "",
  });

  const filteredProducts = STORE_PRODUCTS.filter((prod) => {
    const matchesCat = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesQuery = prod.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleOrderOnWhatsApp = (e) => {
    e.preventDefault();
    if (!addressData.fullName || !addressData.mobileNumber || !addressData.streetAddress) {
      alert("Please fill in your Name, Mobile Number, and Address.");
      return;
    }

    const phoneNumber = "919876543210"; // Updated on demand or standard store WhatsApp contact

    let itemsListStr = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.title}* x ${item.qty} = ₹${(item.price * item.qty).toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = `Namaste 🙏
I would like to place an order from *Astro Store*.

🛍️ *ORDER SUMMARY*:
${itemsListStr}

💵 *TOTAL AMOUNT*: ₹${totalPrice.toLocaleString("en-IN")}

📍 *DELIVERY ADDRESS*:
👤 *Name*: ${addressData.fullName}
📞 *Phone*: ${addressData.mobileNumber}
🏠 *Address*: ${addressData.houseNo ? addressData.houseNo + ", " : ""}${addressData.streetAddress}
🏙️ *City/State*: ${addressData.city}, ${addressData.state} - ${addressData.pincode}

Please confirm my order and let me know the payment details. Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=` + encodeURIComponent(message);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F6E9E3] flex justify-center">
      <div className="w-full max-w-[430px] bg-[#FDE8E4] min-h-screen relative shadow-xl flex flex-col">
        {/* Scrollable View Area */}
        <div className="pb-28 overflow-y-auto flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-orange-400 rounded-b-[32px] px-5 pt-10 pb-7 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="text-white hover:opacity-80 transition"
                  aria-label="Go back"
                >
                  <FiArrowLeft size={26} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-wide">Astro Store</h1>
                  <p className="text-orange-100 text-xs mt-0.5 font-medium">
                    100% Genuine & Energized Astrological Products
                  </p>
                </div>
              </div>

              {/* Cart Header Button */}
              <button
                onClick={() => {
                  setCheckoutStep(1);
                  setIsCartOpen(true);
                }}
                className="relative bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-2xl text-white transition active:scale-95"
              >
                <FiShoppingBag size={22} />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-orange-600 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Search Input */}
            <div className="mt-5 bg-white rounded-full h-13 px-5 flex items-center gap-3 shadow-md border border-orange-100">
              <FiSearch size={20} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Rudraksha, Gemstones, Yantras..."
                className="flex-1 outline-none text-gray-700 placeholder:text-gray-400 text-sm bg-transparent"
              />
              <FiSliders size={18} className="text-gray-400" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="px-4 mt-4 overflow-x-auto scrollbar-none">
            <div className="flex gap-2.5 w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "bg-white text-gray-600 border border-orange-100 hover:border-orange-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Value Highlights */}
          <div className="mx-4 mt-4 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-200/60 p-3 shadow-sm">
            <div className="grid grid-cols-3 divide-x divide-amber-200/70 text-center">
              <div className="px-2 flex flex-col items-center">
                <FiShield size={18} className="text-amber-600 mb-1" />
                <p className="text-[10px] font-bold text-gray-800 leading-tight">100% Original</p>
                <p className="text-[9px] text-gray-500">Lab Certified</p>
              </div>
              <div className="px-2 flex flex-col items-center">
                <FiAward size={18} className="text-amber-600 mb-1" />
                <p className="text-[10px] font-bold text-gray-800 leading-tight">Vedic Ritual</p>
                <p className="text-[9px] text-gray-500">Pre-Energized</p>
              </div>
              <div className="px-2 flex flex-col items-center">
                <FiTruck size={18} className="text-amber-600 mb-1" />
                <p className="text-[10px] font-bold text-gray-800 leading-tight">Fast Delivery</p>
                <p className="text-[9px] text-gray-500">Safe Shipping</p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="px-4 mt-5 grid grid-cols-2 gap-3.5">
            {filteredProducts.map((product) => {
              const inCart = cartItems.find((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-orange-100/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div
                    className="cursor-pointer relative"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.popular && (
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                        BESTSELLER
                      </span>
                    )}
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-xs font-bold text-[#1d2340] line-clamp-2 mt-0.5 cursor-pointer leading-snug"
                      >
                        {product.title}
                      </h3>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-orange-600">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{product.oldPrice.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {inCart ? (
                        <div className="mt-2 flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white text-orange-600 flex items-center justify-center font-bold shadow-sm active:scale-95"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="text-xs font-extrabold text-orange-600">
                            {inCart.qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold shadow-sm active:scale-95"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full mt-2 py-1.5 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-200 hover:border-orange-500 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1"
                        >
                          <FiPlus size={14} /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View Cart Floating Bar (If items exist & modal closed) */}
        {totalItemsCount > 0 && !isCartOpen && (
          <div className="fixed bottom-22 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-4 z-40">
            <button
              onClick={() => {
                setCheckoutStep(1);
                setIsCartOpen(true);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl p-3.5 shadow-xl flex items-center justify-between transition active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <span className="bg-white text-orange-600 text-xs font-extrabold w-7 h-7 rounded-full flex items-center justify-center shadow">
                  {totalItemsCount}
                </span>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">Items in Cart</p>
                  <p className="text-[11px] text-orange-100">Tap to review & checkout</p>
                </div>
              </div>

              <div className="flex items-center gap-1 font-bold text-sm">
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                <span className="text-lg">→</span>
              </div>
            </button>
          </div>
        )}

        {/* Bottom Navigation */}
        <Bottomnav />

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div
              className="absolute inset-0"
              onClick={() => setSelectedProduct(null)}
            />
            <div className="w-full max-w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh] animate-fade-in">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
              >
                <FiX size={18} />
              </button>

              <div className="relative h-56 shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex-1 overflow-y-auto">
                <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wide">
                  {selectedProduct.category}
                </span>
                <h2 className="text-lg font-bold text-[#1d2340] leading-snug mt-0.5">
                  {selectedProduct.title}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xl font-extrabold text-orange-600">
                    ₹{selectedProduct.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{selectedProduct.oldPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    SAVE ₹{selectedProduct.oldPrice - selectedProduct.price}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Description & Astro Benefits
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="mt-4 bg-orange-50 rounded-2xl p-3 border border-orange-100 text-[11px] text-gray-600 space-y-1.5">
                  <p className="flex items-center gap-2">
                    <FiCheck size={14} className="text-orange-500 shrink-0" />
                    <span>Energized by expert Purohits prior to dispatch.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiCheck size={14} className="text-orange-500 shrink-0" />
                    <span>Includes authenticity guarantee certificate.</span>
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3 shrink-0">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-md transition active:scale-95"
                >
                  Add & View Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart & Checkout Drawer/Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-xs">
            <div
              className="absolute inset-0"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="w-full max-w-[430px] bg-white rounded-t-[32px] shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-slide-up">
              {/* Drawer Handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-2.5" />

              {/* Drawer Header */}
              <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <FiShoppingBag className="text-orange-500" size={20} />
                  <h3 className="font-bold text-[#1d2340] text-base">
                    {checkoutStep === 1 ? "Your Shopping Cart" : "Delivery Address"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 flex-1 overflow-y-auto">
                {checkoutStep === 1 ? (
                  cartItems.length === 0 ? (
                    <div className="text-center py-10">
                      <FiShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium text-sm">Your cart is currently empty.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 px-5 py-2 bg-orange-50 text-orange-600 font-bold text-xs rounded-xl"
                      >
                        Explore Store Products
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 object-cover rounded-xl shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#1d2340] truncate">
                              {item.title}
                            </h4>
                            <p className="text-orange-600 text-xs font-extrabold mt-0.5">
                              ₹{(item.price * item.qty).toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-2 py-1 shadow-xs">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-gray-500 hover:text-orange-600"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="text-xs font-bold text-gray-800 w-4 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-gray-500 hover:text-orange-600"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Total Breakdown */}
                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Subtotal</span>
                          <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Delivery</span>
                          <span className="text-green-600 font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-[#1d2340] pt-2 border-t border-gray-200">
                          <span>Total Amount</span>
                          <span className="text-orange-600">₹{totalPrice.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  /* Step 2: Address Form */
                  <form onSubmit={handleOrderOnWhatsApp} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-gray-600 block mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="text"
                          required
                          value={addressData.fullName}
                          onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-orange-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-600 block mb-1">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="tel"
                          required
                          value={addressData.mobileNumber}
                          onChange={(e) => setAddressData({ ...addressData, mobileNumber: e.target.value })}
                          placeholder="10-digit mobile number"
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-orange-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-600 block mb-1">
                        Full Street Address *
                      </label>
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                        <textarea
                          required
                          rows={2}
                          value={addressData.streetAddress}
                          onChange={(e) => setAddressData({ ...addressData, streetAddress: e.target.value })}
                          placeholder="House/Flat No., Apartment, Colony, Landmark"
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-orange-500 focus:bg-white resize-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-gray-600 block mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={addressData.city}
                          onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                          placeholder="City"
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-orange-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-600 block mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={addressData.pincode}
                          onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                          placeholder="6-digit Pincode"
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-orange-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Drawer Footer Actions */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
                  {checkoutStep === 1 ? (
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Add Address</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="px-4 py-3 bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleOrderOnWhatsApp}
                        className="flex-1 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                      >
                        <FiMessageCircle size={20} />
                        <span>Place Order on WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
