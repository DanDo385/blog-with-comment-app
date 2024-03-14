// pages/index.tsx
import SignInButton from '../components/SignInButton'; // Adjust the path as necessary

function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the C2DeFi Zone!</h1>
      <SignInButton />
      <p>
        Join us in the C2DeFi Zone to discuss latest about Web Developement, Blockchain, and DeFi.
      </p>
    </div>
  );
}

export default HomePage;