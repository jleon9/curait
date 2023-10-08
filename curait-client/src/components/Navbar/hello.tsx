import React, { FC } from 'react';

interface TitleProps {
  className: string;
  title: string;
  subtitle?: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};

export default Title;