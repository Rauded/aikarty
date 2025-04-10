import React from 'react';

const Pricing = () => {
  return (
    <section className="py-16 bg-zinc-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Start Learning Smarter</h2>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto text-zinc-300">
          Choose the plan that fits your study needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-lg bg-zinc-700 shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold">Free Plan</h3>
              <p className="mt-2 text-indigo-600 dark:text-indigo-400">Get started with no cost</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Generate up to 3 flashcard sets per month</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Basic spaced repetition</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Save and organize your flashcards</span>
                </li>
              </ul>
              <button className="w-full mt-6 py-3 px-4 rounded-md text-center bg-zinc-600 hover:bg-zinc-500 text-white">
                Start Free
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="rounded-lg bg-indigo-900 shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="p-6 border-b border-indigo-200 dark:border-indigo-800">
              <h3 className="text-2xl font-bold">Premium Plan</h3>
              <p className="mt-2 text-indigo-600 dark:text-indigo-400">Unlimited learning potential</p>
              <div className="text-center text-2xl font-bold">$5/month</div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Unlimited flashcard generation</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Advanced AI atomicity customization</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Priority PDF processing</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Enhanced spaced repetition algorithms</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Detailed study statistics and progress tracking</span>
                </li>
              </ul>
              <button className="w-full mt-6 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-center flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card mr-2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                Sign Up & Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;