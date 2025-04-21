/**
 * This file defines a React component called Pricing.
 * A "pricing" component is a section of a website that shows users the different plans or options they can choose from, usually with a list of features and a button to sign up.
 * This Pricing component displays two plans: a Free Plan and a Premium Plan, each with their own features and a button to get started.
 *
 * Usage example:
 * <Pricing />
 */

import React from 'react';

/**
 * The Pricing component doesn't take any props.
 * It simply displays information about the available plans.
 */
const Pricing = () => {
  return (
    // The <section> element is used to group the pricing content together.
    <section className="">
      <div className="">
        {/* This is the main heading for the pricing section. */}
        <h2 className="">Start Learning Smarter</h2>
        {/* This is a short description under the heading. */}
        <p className="">
          Choose the plan that fits your study needs
        </p>
        <div className="">
          {/* Free Plan */}
          <div className="">
            <div className="">
              {/* The name of the plan */}
              <h3 className="">Free Plan</h3>
              {/* A short description of the plan */}
              <p className="">Get started with no cost</p>
            </div>
            <div className="">
              {/* This is a list of features included in the Free Plan. */}
              <ul className="">
                <li className="">
                  {/* The SVG below is a checkmark icon, used to show that this feature is included. */}
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
              {/* This button lets the user start with the Free Plan. */}
              <button className="">
                Start Free
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="">
            <div className="">
              {/* This label shows that the Premium Plan is recommended. */}
              RECOMMENDED
            </div>
            <div className="">
              {/* The name of the plan */}
              <h3 className="">Premium Plan</h3>
              {/* A short description of the plan */}
              <p className="">Unlimited learning potential</p>
              {/* The price of the Premium Plan */}
              <div className="">$5/month</div>
            </div>
            <div className="">
              {/* This is a list of features included in the Premium Plan. */}
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
              {/* This button lets the user sign up for the Premium Plan.
                  The SVG here is a small icon of a credit card. */}
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

// This line makes the Pricing component available for use in other files.
export default Pricing;