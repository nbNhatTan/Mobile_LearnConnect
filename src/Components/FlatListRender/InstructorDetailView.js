import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { CoursesStyle } from '../../style';
import { useTranslation } from 'react-i18next';
import { Rating } from 'react-native-ratings';

const InstructorDetailView = props => {
    const { t } = useTranslation();
    const { item, onPress } = props;
    const { Colors } = useTheme();
    const CoursesStyles = useMemo(() => CoursesStyle(Colors), [Colors]);

    return (
        <TouchableOpacity
            style={CoursesStyles.whiteboxwhishlist}
            onPress={() => onPress()}>
            <View style={CoursesStyles.flexDirectiwhilist}>
                <View>
                    <Image
                        style={CoursesStyles.imagesetios}
                        resizeMode="cover"
                        source={{ uri: `${item.imageUrl}`, }}
                    />
                </View>
                <View style={CoursesStyles.textviewsetwhishlist}>
                    {/* <View style={CoursesStyles.flexrowheart}> */}
                    <Text style={CoursesStyles.designfonttext}>{t(item.name)}</Text>
                    <Text style={CoursesStyles.setreviewstext}>{t(item.shortDescription)}</Text>
                    <View style={CoursesStyles.setstartanddolardtext}>
                        <View style={CoursesStyles.stariconview}>
                            <Rating
                                type='custom'
                                ratingColor={Colors.amber_color}
                                ratingBackgroundColor={'gainsboro'}
                                ratingCount={5}
                                imageSize={17}
                                startingValue={item.averageRating}
                                style={{ color: 'transparent', }}
                                isDisabled={false}
                                readonly
                            />
                        </View>
                        <View>
                            <Text style={CoursesStyles.dolardigittext}>
                                {t(item.price === 0 ? 'Free' : item.price + '₫')}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default InstructorDetailView;
