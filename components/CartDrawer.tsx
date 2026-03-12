
import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowLeft, CheckCircle, Phone, MessageCircle, ChevronRight, User, MapPin, Clock } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onOrderComplete: () => void;
  onGoToInventory: () => void;
}

type Step = 'cart' | 'checkout' | 'confirmed';

interface OrderForm {
  name: string;
  phone: string;
  address: string;
  deliveryTime: string;
}

const DELIVERY_TIMES = [
  'ASAP (20–30 mins)',
  'In 1 hour',
  'Tonight 6–9 PM',
  'Tomorrow morning',
];

const WHATSAPP_NUMBER = '254700000000';

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQuantity, onOrderComplete, onGoToInventory }: CartDrawerProps) {
  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState<OrderForm>({ name: '', phone: '', address: '', deliveryTime: DELIVERY_TIMES[0] });
  const [errors, setErrors] = useState<Partial<OrderForm>>({});

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const validate = (): boolean => {
    const e: Partial<OrderForm> = {};
    if (!form.name.trim())                      e.name = 'Please enter your name.';
    if (!/^07\d{8}$|^\+2547\d{8}$/.test(form.phone.trim())) e.phone = 'Enter a valid Kenyan number (e.g. 0712 345678).';
    if (!form.address.trim())                   e.address = 'Please enter your delivery address.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `🥃 *New Laffitty Order*`,
      ``,
      `*Customer:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      `*Address:* ${form.address}`,
      `*Delivery:* ${form.deliveryTime}`,
      ``,
      `*Order:*`,
      ...items.map(i => `• ${i.name} x${i.quantity} — KSh ${(i.price * i.quantity).toLocaleString()}`),
      ``,
      `*Total: KSh ${total.toLocaleString()}*`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep('confirmed');
  };

  const handleClose = () => {
    onClose();
    // reset after drawer slides out
    setTimeout(() => {
      setStep('cart');
      setForm({ name: '', phone: '', address: '', deliveryTime: DELIVERY_TIMES[0] });
      setErrors({});
    }, 500);
  };

  const handleNewOrder = () => {
    onOrderComplete();
    handleClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] transition-transform duration-500 shadow-2xl flex flex-col rounded-l-[40px] border-l border-slate-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* ── STEP 1: CART ── */}
        {step === 'cart' && (
          <>
            <div className="p-8 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-2xl font-bold tracking-tight font-heading">
                  Your <span className="text-primary-gold italic">Stash</span>
                </h2>
                <p className="text-sm font-normal text-slate-400 mt-0.5">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              <button onClick={handleClose} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-8 space-y-5 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-6">
                  <div className="p-10 bg-slate-50 rounded-full">
                    <ShoppingBag size={64} className="opacity-20" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">Your cart is empty.</p>
                  <button onClick={onGoToInventory} className="bg-black text-white px-10 py-4 rounded-2xl text-sm font-semibold hover:bg-primary-gold hover:text-black transition-all">
                    Browse Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="font-semibold text-sm text-slate-900 mb-1 leading-snug">{item.name}</h4>
                      <p className="text-vibrant-amber font-bold text-sm">KSh {(item.price * item.quantity).toLocaleString()}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-1 py-1">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-black hover:shadow-sm transition-all">
                            <Minus size={13} />
                          </button>
                          <span className="text-sm font-semibold text-slate-800 w-5 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, +1)} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:text-black hover:shadow-sm transition-all">
                            <Plus size={13} />
                          </button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="p-1.5 text-slate-300 hover:text-laffitty-red transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 bg-slate-50/50 rounded-tl-[40px] space-y-5 border-t border-slate-100 shrink-0">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-normal">Grand Total</span>
                <span className="text-2xl font-bold text-black">KSh {total.toLocaleString()}</span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={() => setStep('checkout')}
                className="w-full bg-black text-white font-semibold py-4 text-sm tracking-wide hover:bg-primary-gold hover:text-black transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-xl rounded-2xl flex items-center justify-center gap-2"
              >
                Place Order <ChevronRight size={16} />
              </button>
              <p className="text-xs text-slate-400 text-center font-normal">Delivery to Ngong Rd / Kilimani in ~22 mins</p>
            </div>
          </>
        )}

        {/* ── STEP 2: CHECKOUT FORM ── */}
        {step === 'checkout' && (
          <>
            <div className="p-8 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep('cart')} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-black">
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight font-heading">Delivery <span className="text-primary-gold italic">Details</span></h2>
                  <p className="text-sm text-slate-400 mt-0.5">KSh {total.toLocaleString()} · {items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto px-8 space-y-5 no-scrollbar pb-4">

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <User size={12} /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Kamau"
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className={`w-full bg-slate-50 border-2 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all ${errors.name ? 'border-laffitty-red' : 'border-slate-200 focus:border-primary-gold'}`}
                />
                {errors.name && <p className="text-xs text-laffitty-red">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Phone size={12} /> Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0712 345678"
                  value={form.phone}
                  onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                  className={`w-full bg-slate-50 border-2 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all ${errors.phone ? 'border-laffitty-red' : 'border-slate-200 focus:border-primary-gold'}`}
                />
                {errors.phone && <p className="text-xs text-laffitty-red">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <MapPin size={12} /> Delivery Address
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Apartment 4B, Valley Arcade, Kilimani"
                  value={form.address}
                  onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))}
                  className={`w-full bg-slate-50 border-2 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition-all resize-none ${errors.address ? 'border-laffitty-red' : 'border-slate-200 focus:border-primary-gold'}`}
                />
                {errors.address && <p className="text-xs text-laffitty-red">{errors.address}</p>}
              </div>

              {/* Delivery time */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Clock size={12} /> Preferred Delivery Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {DELIVERY_TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, deliveryTime: t }))}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                        form.deliveryTime === t
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-semibold text-slate-400 mb-3">Order Summary</p>
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span className="text-slate-600">{i.name} <span className="text-slate-400">×{i.quantity}</span></span>
                    <span className="font-semibold text-slate-800">KSh {(i.price * i.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between">
                  <span className="text-sm font-semibold text-slate-700">Total</span>
                  <span className="text-sm font-bold text-black">KSh {total.toLocaleString()}</span>
                </div>
              </div>
            </form>

            <div className="p-8 border-t border-slate-100 shrink-0">
              <button
                onClick={handleSubmit}
                className="w-full bg-black text-white font-semibold py-4 text-sm tracking-wide hover:bg-primary-gold hover:text-black transition-all active:scale-95 shadow-xl rounded-2xl"
              >
                Place Order
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">Payment on delivery · Cash or M-Pesa</p>
            </div>
          </>
        )}

        {/* ── STEP 3: CONFIRMATION ── */}
        {step === 'confirmed' && (
          <div className="flex-grow flex flex-col items-center justify-center px-8 py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary-gold/10 flex items-center justify-center">
              <CheckCircle size={40} className="text-primary-gold" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-heading tracking-tight">Order <span className="text-primary-gold italic">Confirmed!</span></h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Thanks, <span className="font-semibold text-slate-700">{form.name}</span>! Your order is being prepared.
                Expected delivery: <span className="font-semibold text-slate-700">{form.deliveryTime.toLowerCase()}</span>.
              </p>
            </div>

            {/* Summary card */}
            <div className="w-full bg-slate-50 rounded-2xl p-5 text-left space-y-2">
              <p className="text-xs font-semibold text-slate-400 mb-3">Your Order</p>
              {items.map(i => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{i.name} <span className="text-slate-400">×{i.quantity}</span></span>
                  <span className="font-semibold">KSh {(i.price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between">
                <span className="text-sm font-semibold text-slate-700">Total</span>
                <span className="text-sm font-bold text-black">KSh {total.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 mt-1 space-y-1">
                <p className="text-xs text-slate-400">📍 {form.address}</p>
                <p className="text-xs text-slate-400">📱 {form.phone}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="w-full space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-4 rounded-2xl text-sm hover:opacity-90 transition-all active:scale-95 shadow-lg"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <a
                href="tel:+254700000000"
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-4 rounded-2xl text-sm hover:bg-slate-200 transition-all"
              >
                <Phone size={16} /> Call Us
              </a>
              <button
                onClick={handleNewOrder}
                className="w-full text-slate-400 text-sm font-medium hover:text-black transition-colors pt-1"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
