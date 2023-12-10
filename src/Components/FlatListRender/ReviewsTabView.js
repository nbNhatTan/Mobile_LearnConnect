import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ReviewsTabStyle } from '../../style';
import { useTranslation } from "react-i18next";
import { Rating } from 'react-native-ratings';


const ReviewsTabView = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    const { Colors } = useTheme();
    const ReviewsTabStyles = useMemo(() => ReviewsTabStyle(Colors), [Colors]);

    console.log("item", item);

    const getDate = (date) => {
        const e = new Date(date)
        return `${e.getHours()}:${e.getMinutes()} ${e.getDate()}/${e.getMonth() + 1}/${e.getFullYear()}`;
      }

    return (
        <TouchableOpacity style={ReviewsTabStyles.whiteboxwhishlist}>
            <View style={ReviewsTabStyles.reviewflex}>
                <Image style={ReviewsTabStyles.setreviesstyleimage} resizeMode='cover'
                    source={{uri: `${item.userRatingInfo.imageUser}`,}} />
                <View style={ReviewsTabStyles.textviewsetwhishlist}>
                    <View style={ReviewsTabStyles.flexratingandtext}>
                        <Text style={ReviewsTabStyles.datetextrstyle}>{getDate(item.ratingCourseInfo.timeStamp)}</Text>
                        <View style={ReviewsTabStyles.iconview}>
                            <Rating
                                type='custom'
                                ratingColor={Colors.amber_color}
                                ratingBackgroundColor={'white'}
                                ratingCount={5}
                                imageSize={17}
                                startingValue={item.ratingCourseInfo.rating1}
                                style={{ color: 'transparent', }}
                                isDisabled={false}
                                readonly
                            />
                        </View>
                    </View>
                    <Text style={ReviewsTabStyles.dolardigittext}>{t(item.userRatingInfo.fullName)}</Text>
                </View>
            </View>
            <Text style={ReviewsTabStyles.setdollardtextset}>{t(item.ratingCourseInfo.comment)}</Text>
        </TouchableOpacity>
    );
}
export default ReviewsTabView;