import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorNum = styled.h1`
  font-size: 10rem;
  color: #d14d4d;
  margin-bottom: 0;
`;

const ErrorText = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-top: 0;
`;

const ErrorDescription = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-top: 2rem;
`;

const ErrorImg = styled.img`
  width: 10rem;
  height: 10rem;
  animation: ${rotate} 2s linear infinite;
`;

const NotFoundPage = () => {
  return (
    <ErrorContainer>
      <ErrorImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaArLOc0Pk34mIe9aXGm3QlsiC2psYrdh7GA&usqp=CAU" alt="404 error" />
      <br/>
      <br/>
      <ErrorNum>404</ErrorNum>
      <br/>
      <ErrorText>Page Not Found</ErrorText>
      <ErrorDescription>
        We're sorry, but the page you're looking for can't be found.
      </ErrorDescription>
    </ErrorContainer>
  );
};

export default NotFoundPage;
