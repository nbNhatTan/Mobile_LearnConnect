import React, {useMemo} from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Spacing, VectorIcons} from '../CommonComponets';
import {SF, SH} from '../../Utiles';
import {useTranslation} from 'react-i18next';
import {ProfileStyles} from '../../style';
import { Rating } from 'react-native-ratings';

const InstructorListView = props => {
  const {t} = useTranslation();
  const {item, onPress} = props;
  const {Colors} = useTheme();
  const ProfileStyle = useMemo(() => ProfileStyles(Colors), [Colors]);

  return (
    <TouchableOpacity
      style={ProfileStyle.marginrightsetwidth}
      onPress={() => onPress()}>
      <View style={ProfileStyle.profilebgwhiteset}>
        <View>
          <View style={ProfileStyle.centimagebottomview}>
            <View style={ProfileStyle.centerviewstyle}>
              <Image
                style={ProfileStyle.imagsetstyle}
                resizeMode="cover"
                source={{
                  uri: `${item.userInfo.profilePictureUrl}`,
                }}
              />
              {/* <Text style={ProfileStyle.centerviewstyletwostyle}>
                <VectorIcons
                  icon="Octicons"
                  name="dot-fill"
                  size={SF(37)}
                  color={item.colors}
                />
              </Text> */}
            </View>
          </View>
          <Spacing space={SH(7)} />
          <Rating
            type='custom'
            ratingColor={Colors.amber_color}
            ratingBackgroundColor={'white'}
            ratingCount={5}
            imageSize={17}
            startingValue={item.mentorInfo.averageRating}
            style={{ color: 'transparent', }}
            isDisabled={false}
            readonly
            />
          <Text style={ProfileStyle.jobtextstyle}>{t(item.userInfo.fullName)}</Text>
          <Text style={ProfileStyle.textsetsimple}>{t(item.userInfo.email)}</Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default InstructorListView;
