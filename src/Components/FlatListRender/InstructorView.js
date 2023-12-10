import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import { HomeStyles } from '../../style';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

const InstructorView = (props) => {
    const { t } = useTranslation();
    const { item, onPress } = props;
    const { Colors } = useTheme();
    const HomeStyle = useMemo(() => HomeStyles(Colors), [Colors]);

    return (
        <TouchableOpacity style={HomeStyle.whiteshadowimgbottomtwo} onPress={() => onPress()} key={item.id}>
            <View style={HomeStyle.flexiconviewsetIntructer}>
                <Image style={HomeStyle.instructorimage} resizeMode='cover' source={{ uri: `${item.userInfo.profilePictureUrl}`, }} />
            </View>
            <Text
                style={HomeStyle.usernametext}>
                {t(item.userInfo.fullName)}
            </Text>
            <Text
                style={HomeStyle.usernamejobtext}>
                {t(item.userInfo.email)}
            </Text>
            <View style={HomeStyle.flexrowstyleset}>
                <Rating
                    type='custom'
                    ratingColor={Colors.amber_color}
                    ratingBackgroundColor={'gainsboro'}
                    ratingCount={5}
                    imageSize={17}
                    startingValue={item.mentorInfo.averageRating}
                    style={{ color: 'transparent', }}
                    isDisabled={false}
                    readonly
                    />
                <Text style={HomeStyle.usernamerenkintexttwo}>
                    {/* {t(item.mentorInfo.description)} */}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
export default InstructorView;