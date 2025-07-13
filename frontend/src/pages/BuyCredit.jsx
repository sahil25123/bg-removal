import React from 'react';
import { assets, plans } from '../assets/assets';
import { useContext } from 'react';
import AppContext from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BuyCredit = () => {
  
  const { backendUrl, loadCreditsData, getToken } = useContext(AppContext);
  
  const navigate = useNavigate();
  // console.log(backendUrl);

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        const token = await getToken();
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } });
          if (data.success) {
            loadCreditsData();
            navigate('/');
            toast.success('Credit added');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorPay = async (planId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(`${backendUrl}/api/user/pay-razor`, { planId }, {
        headers: { token }
      });

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="min-h-[80vh] py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <button className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm mb-6">
            Our Plans
          </button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose the plan
            </span>{' '}
            that's right for you
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get credits to remove backgrounds from your images with our AI-powered tool
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden border ${
                item.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
              }`}
            >
              {item.popular && (
                <div className="bg-blue-600 text-white text-xs font-semibold py-1 px-4 text-center uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-4">
                  <img
                    src={assets.logo_icon}
                    alt="Plan icon"
                    className="w-10 h-10 mr-3"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{item.desc}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">${item.price}</span>
                  <span className="text-gray-500"> / {item.credits} credits</span>
                </div>
                
                <button onClick={() => paymentRazorPay(item.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    item.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors shadow-sm hover:shadow-md`}
                >
                  {item.popular ? 'Get Started' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {[
              {
                question: "How do credits work?",
                answer: "Each credit allows you to remove the background from one image. Credits never expire."
              },
              {
                question: "Can I get a refund?",
                answer: "Yes, we offer a 30-day money-back guarantee on all plans."
              },
              {
                question: "Do you offer team plans?",
                answer: "Yes, contact our sales team for custom enterprise solutions."
              }
            ].map((item, index) => (
              <div key={index} className="p-6">
                <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyCredit;