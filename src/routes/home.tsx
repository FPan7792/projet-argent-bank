import HomeReinsurance from "../components/HomeReinssurance";
import { featureItems } from "../datas/datas";
import "../styles/index.css";

import iconChat from "../assets/img/icon-chat.png";
import iconMoney from "../assets/img/icon-money.png";
import iconSecurity from "../assets/img/icon-security.png";

export const Home = () => {
  const icons = [iconChat, iconMoney, iconSecurity];

  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {featureItems.map((item, index) => (
          <HomeReinsurance key={index} item={item} icon={icons[index]} />
        ))}
      </section>
    </main>
  );
};
export default Home;
