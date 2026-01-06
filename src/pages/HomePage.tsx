import React from 'react';
import Section1 from '../components/home/Section1';
// import Section2 from '../components/home/Section2';
import Section3 from '../components/home/Section3';
import Section4 from '../components/home/Section4';
import Section5 from '../components/home/Section5';
import Section6 from '../components/home/Section6';

const HomePage: React.FC = () => {
  return (
    <div data-reactroot="" id="__next">
      <main className="css-y8aj3r e1jq4geh0" id="main-content">
        <Section1 />
        {/* <Section2 /> */}
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </main>
    </div>
  );
}

export default HomePage;
