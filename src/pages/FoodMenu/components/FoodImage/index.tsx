import React from 'react';

export interface FoodImageProps {
  cover: string | undefined;
  className?: string;
}

export const FoodImage: React.FC<FoodImageProps> = ({ cover, className }) => {
  if (!cover) {
    return null;
  }
  return <img src={`/images/${cover}`} alt="Food item" className={className} />;
};
