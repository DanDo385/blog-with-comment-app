//pages/index.tsx
import Container from "../components/container";
import Image from "next/image";

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Welcome to the C2DeFi Zone! <br />
          </h1>
          <p>
          After thirteen years on Wall Street, where I worked in Institutional Sales, Hedge Funds, and Fixed Income Portfolio Management, I've taken a bold step into the world of Blockchain Development, concentrating on Decentralized Finance or DeFi. This transition has marked a significant shift from traditional finance to the cutting-edge sector where I am now contributing to the development of the future of our financial systems.
          Through this blog, I aim to leverage my deep-seated knowledge in traditional finance to illuminate the transformative world of DeFi. Expect to find discussions on the parallels between established financial frameworks and decentralized models, explorations of current DeFi topics, a curation of resources that have been pivotal to my learning, and strategic advice to help you avoid the obstacles that could impede your journey.
          </p>

          <p>If you would like to support this page, please take the time to visit this page to check out new content, spread the link to others, and engage in disucssion my commenting on posts when I have that functionality running.</p>
        </div>
      </Container>

      <div className="container max-w-4xl m-auto px-4 mt-20">
        <Image
          src="/desk.jpg"
          alt="my desk"
          width={1920 / 2}
          height={1280 / 2}
        />
      </div>
    </>
  );
}

export default HomePage;
