import React from 'react';
import Link from 'next/link';
import SignInButton from '../components/SignInButton'; // Adjust the path as necessary

function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome to the C2DeFi Zone! <br />
      </h1>
      <Link href="/api/auth/login"> {/* Update href to your login route */}
        <a>
          <SignInButton />
        </a>
      </Link>
      <p>
        After thirteen years on Wall Street, I've taken a bold step into the world of Blockchain Development, concentrating on Decentralized Finance or DeFi. This transition has marked a significant shift from traditional finance to the cutting-edge sector where I am now contributing to the development of the future of our financial systems.
        Through this blog, I aim to leverage my deep-seated knowledge in traditional finance to illuminate the transformative world of DeFi. Expect to find discussions on the parallels between established financial frameworks and decentralized models, explorations of current DeFi topics, a curation of resources that have been pivotal to my learning, and strategic advice to help you avoid the obstacles that could impede your journey.
      </p>
    </div>
  );
}

export default HomePage;
