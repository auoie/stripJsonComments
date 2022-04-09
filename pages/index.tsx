import type { NextPage } from "next";
import { ThemeToggle } from "../components/ThemeToggle";

const Home: NextPage = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">Hi</div>
      <ThemeToggle />
    </div>
  );
};

export default Home;
