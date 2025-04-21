/**
 * CallToAction component
 * Renders a promotional section encouraging users to start a free trial.
 * Includes a heading, description, and a link to the generation page.
 * Usage: <CallToAction />
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Functional component for the call-to-action section.
 * No props required. Purely presentational.
 */
const CallToAction = () => (
  <section className="">
    <div className="">
      <div className="">
        <h2 className="">
          Start your free trial today
        </h2>
        <p className="">
          Try Flowbite Platform for 30 days. No credit card required.
        </p>
        <Link
          to="/generate"
          className=""
        >
          Free trial for 30 days
        </Link>
      </div>
    </div>
  </section>
);

export default CallToAction;