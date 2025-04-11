import React from 'react';
import { Link } from 'react-router-dom';

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