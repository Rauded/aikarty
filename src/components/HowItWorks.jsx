import React from 'react';

const steps = [
  {
    number: '1',
    title: 'Upload Content',
    description: 'Paste in your text or upload PDF study materials',
  },
  {
    number: '2',
    title: 'AI Processing',
    description: 'Our AI breaks down content into atomic flashcards',
  },
  {
    number: '3',
    title: 'Save & Organize',
    description: 'Review, customize, and save your generated flashcard decks',
  },
  {
    number: '4',
    title: 'Study & Improve',
    description: 'Study using our smart review system to maximize retention',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-8 bg-zinc-800/50" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-3 rounded-md bg-zinc-700/70 shadow-md flex flex-col items-center max-w-[160px]"
            >
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
                {step.number}
              </div>
              <h3 className="text-base font-semibold mb-1 text-center">{step.title}</h3>
              <p className="text-xs text-zinc-300 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;