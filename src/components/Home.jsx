import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import One from "./One";

const Home = () => {
  return (
    <div>
      <div className="grid md:grid-cols-4 p-10 gap-8">
        <One />
        <Two />
        <Three />
        <Four />
      </div>
    </div>
  );
};

export default Home;
