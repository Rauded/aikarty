import React from 'react';

const Pricing = () => {
  return (
    <section className="">
      <div className="">
        <h2 className="">Start Learning Smarter</h2>
        <p className="">
          Choose the plan that fits your study needs
        </p>
        <div className="">
          {/* Free Plan */}
          <div className="">
            <div className="">
              <h3 className="">Free Plan</h3>
              <p className="">Get started with no cost</p>
            </div>
            <div className="">
              <ul className="">
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Generate up to 3 flashcard sets per month</span>
                </li>
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Basic spaced repetition</span>
                </li>
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Save and organize your flashcards</span>
                </li>
              </ul>
              <button className="">
                Start Free
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="">
            <div className="">
              RECOMMENDED
            </div>
            <div className="">
              <h3 className="">Premium Plan</h3>
              <p className="">Unlimited learning potential</p>
              <div className="">$5/month</div>
            </div>
            <div className="">
              <ul className="">
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Unlimited flashcard generation</span>
                </li>
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Advanced AI atomicity customization</span>
                </li>
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Priority PDF processing</span>
                </li>
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Enhanced spaced repetition algorithms</span>
                </li>
                <li className="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>Detailed study statistics and progress tracking</span>
                </li>
              </ul>
              <button className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
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