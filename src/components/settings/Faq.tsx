const faqData = [
  {
    question: 'What is React?',
    answer:
      "React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.",
  },
  {
    question: 'Why should I use React?',
    answer:
      "React allows developers to create large web applications that can change data, without reloading the page. It's fast, scalable, and simple. It works only on user interfaces in the application, which corresponds to the view in the MVC template.",
  },
  {
    question: 'What are React Hooks?',
    answer:
      'Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks are functions that let you “hook into” React state and lifecycle features from function components.',
  },
  {
    question: 'What is JSX?',
    answer:
      'JSX stands for JavaScript XML. It is a syntax extension for JavaScript. JSX allows you to write HTML elements in JavaScript and place them in the DOM without any createElement() and/or appendChild() methods.',
  },
  {
    question: 'What is a component in React?',
    answer:
      'Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML via a render function. Components come in two types, Class components and Function components.',
  },
];

const Faq: React.FC = () => {
  return (
    <div className="text-[1.25rem]">
      {faqData.map((faq, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3 className="font-bold">{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Faq;
