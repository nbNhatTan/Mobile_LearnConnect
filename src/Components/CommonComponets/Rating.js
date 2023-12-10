import React from "react";
import { Rating } from 'react-native-ratings';
import { Colors } from '../../Utiles';

function RatingScreen(props) {
  const { ratingCount, imageSize, tintColor, value } = props;
  return (
    <Rating
      type='custom'
      ratingColor={Colors.amber_color}
      ratingBackgroundColor={Colors.chinese_silver}
      ratingCount={ratingCount}
      tintColor={tintColor}
      imageSize={imageSize}
      startingValue={value}
      isDisabled={false}
    />
  );
};
export default RatingScreen;