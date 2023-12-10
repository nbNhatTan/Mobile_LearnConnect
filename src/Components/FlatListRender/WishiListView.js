/* eslint-disable no-undef */
import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MyCoursesTabStyle, CoursesStyle } from '../../style';
import { VectorIcons } from '../CommonComponets';
import { useTranslation } from 'react-i18next';
import { SF } from '../../Utiles';
import { Rating } from 'react-native-ratings';

import {useSelector} from 'react-redux';
import axios from 'axios';

const WishiListView = props => {
  const { item, onPress } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const MyCoursesTabStyles = useMemo(() => MyCoursesTabStyle(Colors), [Colors]);
  const CoursesStyles = useMemo(() => CoursesStyle(Colors), [Colors]);
  const {token, userLogin} = useSelector(state => state.authReducer) || {};
  const [heartIcon, setHeartIcon] = useState(true);

  const handlePressHeart = (heartSet) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const addFavoriteCourse = async () => {
			await axios.post(`https://learnconnectapitest.azurewebsites.net/api/favorite-course`,
				{
					favoriteCourseId: item.course.id,
          userId: userLogin.id
				}
			)
			  .then(res => {
				console.log('Set Heart Success: ', res?.data);
				setHeartIcon(true);
			  })
			  .catch(err => console.log('Error at addFavoriteCourse(): ', err));
		};
		const removeFavoriteCourse = async () => {
			await axios.delete(`https://learnconnectapitest.azurewebsites.net/api/favorite-course/un-set-favorite?userId=${userLogin.id}&courseId=${item.course.id}`)
			  .then(res => {
				console.log('UnSet Heart Success: ', res?.data);
				setHeartIcon(false);
			  })
			  .catch(err => console.log('Error at addFavoriteCourse(): ', err));
		};
		if(heartSet){
			addFavoriteCourse();
		} else {
			removeFavoriteCourse();
		};
	}

  return (
    <TouchableOpacity
      onPress={() => onPress(heartIcon)}
      style={CoursesStyles.whiteboxwhishlist}>
      <View style={CoursesStyles.flexDirectiwhilist} key={item.id}>
        <View>
          <Image
            style={CoursesStyles.imagesetios}
            resizeMode="cover"
            source={{ uri: item.course.imageUrl }}
          />
        </View>
        <View style={CoursesStyles.textviewsetwhishlist}>
          <View style={MyCoursesTabStyles.flexrowheart}>
            <Text style={MyCoursesTabStyles.designfonttext}>{t(item.course.name)}</Text>
            {heartIcon ?
              <TouchableOpacity onPress={() => handlePressHeart(false)}>
                <VectorIcons
                  icon="AntDesign"
                  size={SF(25)}
                  name="heart"
                  style={MyCoursesTabStyles.setheart}
                />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => handlePressHeart(true)}>
                <VectorIcons
                  icon="AntDesign"
                  size={SF(25)}
                  name="hearto"
                  style={MyCoursesTabStyles.setheart}
                />
              </TouchableOpacity>
            }
          </View>
          <Text style={CoursesStyles.setreviewstext}>{t(item.course.shortDescription)}</Text>
          <View style={MyCoursesTabStyles.videoandtextsetup}>
            <View style={MyCoursesTabStyles.settimevideo}>
              <VectorIcons
                icon="AntDesign"
                size={SF(15)}
                name="clockcircleo"
                style={MyCoursesTabStyles.clockimage}
              />
              <Text style={MyCoursesTabStyles.timevodeoset}>
                {t(`${Math.floor(item.course.contentLength / 60)}h${item.course.contentLength % 60}p`)}
              </Text>
            </View>
          </View>
          <View style={MyCoursesTabStyles.flexrowheartsettwo}>
            <View>
              <Rating
                type='custom'
                ratingColor={Colors.amber_color}
                ratingBackgroundColor={'gainsboro'}
                ratingCount={5}
                imageSize={17}
                startingValue={item.course.averageRating}
                style={{ color: 'transparent', }}
                isDisabled={false}
                readonly
              />
            </View>
            <Text style={MyCoursesTabStyles.dolardigittext}>
              {t(item.course.price === 0 ? 'Free' : item.course.price + '₫')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default WishiListView;
