import React from 'react';
import styled from 'styled-components';
import banner from '../assets/Images/banner-img.png';
import b1 from '../assets/Images/b-1.png';
import b2 from '../assets/Images/b-2.png';
import b3 from '../assets/Images/b-3.png';
import b4 from '../assets/Images/b-4.png';
import b5 from '../assets/Images/b-5.png';
import emoji1 from '../assets/Images/emoji-1.png';
import emoji2 from '../assets/Images/emoji-2.png';

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fef6e4;
  padding: 50px 5rem;
  font-family: Montserrat, sans-serif;
  word-spacing: 2px;
`;

const Col = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 4.5rem;
  font-weight: 750;
  display: flex;
  align-items: center;
  margin: 10px 0 10px 2rem;
`;

const TitleBlue = styled(Title)`
  color: #011958;
`;

const TitlePink = styled(Title)`
  color: #f582ae;
`;

const Emoji = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 10px;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  color: #333;
  max-width: 500px;
  margin: 20px 0;
`;

const ExploreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  background-color: #f582ae;
  border-radius: 999px;
  color: #0b0c10;
  font-size: 16px;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  padding: 10px;
  border: none;
  &:hover {
    background-color: #f56c94;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const BannerPosition = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerImg = styled.img`
  width: 80%;
  position: relative;
`;

const PositionedImage = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  &:nth-child(2) { top: 5rem; left: 10%; }
  &:nth-child(3) { top: 5rem; right: 10%; }
  &:nth-child(4) { bottom: 0rem; left: -18%;width:20rem;height:20rem;transform:rotate(120deg) }
  &:nth-child(5) { bottom: 8rem; right: 5%; }
  &:nth-child(6) { top: -3rem; right: 40%; }
  &:nth-child(7) { bottom: -2rem; right: 40%; }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Col>
        <span>FOODS WITH RECIPES</span>
        <TitleBlue>
          GOOD <Emoji src={emoji1} />TASTE
        </TitleBlue>
        <TitlePink>
          GOOD <Emoji src={emoji2} />SENSE
        </TitlePink>
        <Paragraph>
          Discover delicious recipes and culinary inspiration to elevate your cooking experience. Let's get cooking!
        </Paragraph>
        <ExploreButton><a href='/recipe-list' style={{textDecoration:'none',color:'#000'}}>Explore</a></ExploreButton>
      </Col>
      <Col>
        <ImgContainer>
          <BannerPosition>
            <BannerImg src={banner} />
            <PositionedImage src={b1} />
            <PositionedImage src={b2} />
            <PositionedImage src={b3} />
            <PositionedImage src={b4} />
            <PositionedImage src={b5} />
            <PositionedImage src={b2} />
          </BannerPosition>
        </ImgContainer>
      </Col>
    </HomeContainer>
  );
};

export default Home;