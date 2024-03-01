interface TermsProps {
  onHandleSetShowTerms: () => void;
}

const TermsAndService: React.FC<TermsProps> = ({ onHandleSetShowTerms }) => {
  return (
    <section className="text-[1.5rem] absolute top-0 left-0 bg-slate-400 bg-opacity-90 w-full z-10 overflow-scroll">
      <p className="fixed top-2 right-5 text-white font-bold" onClick={onHandleSetShowTerms}>
        CLOSE
      </p>
      <article className="p-4 text-white mt-12 flex flex-col gap-6">
        <h1 className="text-[3rem]">Terms of Service</h1>
        <p>Last updated: Feb 28, 2024</p>
        <h2>Welcome to Finco</h2>
        <p>
          These terms of service outline the rules and regulations for the use of Finco&apos;s
          Website, located at [Website URL].
        </p>
        <h2>
          By accessing this website we assume you accept these terms of service. Do not continue to
          use Finco if you do not agree to take all of the terms of service stated on this page.
        </h2>

        <h2>License</h2>
        <p>
          Unless otherwise stated, Finco and/or its licensors own the intellectual property rights
          for all material on Finco. All intellectual property rights are reserved. You may access
          this from Finco for your own personal use subjected to restrictions set in these terms and
          conditions.
        </p>

        <h2>User Comments</h2>
        <ol>
          <li>This Agreement shall begin on the date hereof.</li>
          <li>
            Certain parts of this website offer the opportunity for users to post and exchange
            opinions and information in certain areas of the website. Finco does not filter, edit,
            publish or review Comments prior to their presence on the website. Comments do not
            reflect the views and opinions of Finco,its agents and/or affiliates. Comments reflect
            the views and opinions of the person who post their views and opinions.
          </li>
        </ol>

        <h2>Content Liability</h2>
        <p>
          We shall not be hold responsible for any content that appears on your Website. You agree
          to protect and defend us against all claims that is rising on your Website. No link(s)
          should appear on any Website that may be interpreted as libelous, obscene or criminal, or
          which infringes, otherwise violates, or advocates the infringement or other violation of,
          any third party rights.
        </p>

        <h2>Your Privacy</h2>
        <p>Please read Privacy Policy</p>

        <h2>Reservation of Rights</h2>
        <p>
          We reserve the right to request that you remove all links or any particular link to our
          Website. You approve to immediately remove all links to our Website upon request.
        </p>

        <h2>Removal of links from our website</h2>
        <p>
          If you find any link on our Website that is offensive for any reason, you are free to
          contact and inform us any moment. We will consider requests to remove links but we are not
          obligated to or so or to respond to you directly.
        </p>

        <h2>Disclaimer</h2>
        <p>
          The limitations and prohibitions of liability set in this Section and elsewhere in this
          disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities
          arising under the disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty.
        </p>

        <p>We will not be liable for any loss or damage of any nature.</p>
      </article>
    </section>
  );
};

export default TermsAndService;
