import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView, Image, KeyboardAvoidingView, FlatList, TouchableOpacity, } from "react-native";
import { Container, VectorIcons, InstructorDetailView, Rating, Spacing } from '../../Components';
// import images from '../../index';
import { Style, InstructorsDetaileStyle } from "../../style";
import { InstructorDetailData, SF, SH } from "../../Utiles";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from 'react-redux';
import { RouteName } from "../../routes";

const InstructorsDetaileScreen = (props) => {
  const { navigation, route } = props;
  const { token } = useSelector(state => state.authReducer) || {};
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const InstructorsDetaileStyles = useMemo(() => InstructorsDetaileStyle(Colors), [Colors]);
  const mentor = route?.params?.data;
  const [mentorCourses, setMentorCourses] = useState([]);
  const [totalEnrollment, setTotalEnrollment] = useState(0);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const getMentorCourses = async () => {
      await axios.get(`https://learnconnectapitest.azurewebsites.net/api/course/get-courses-by-mentor?mentorId=${mentor.mentorInfo.id}&currentPage=1&pageSize=100`)
        .then(res => {
          console.log('Mentor Course: ', res?.data?.courses);
          setMentorCourses(res?.data.courses);

        })
        .catch(err => console.log('Error at getMentorCourses(): ', err));
    };
    getMentorCourses();

  }, []);

  useEffect(() => {
    let total = 0;
    mentorCourses.forEach(course => {
      total += course.totalEnrollment;
    });
    setTotalEnrollment(total);
  }, [mentorCourses])
  return (
    <Container>
      <View style={InstructorsDetaileStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewInstructorsDetaileStyles}>
          <KeyboardAvoidingView enabled>
            <View style={InstructorsDetaileStyles.minflexview}>
              <View style={InstructorsDetaileStyles.minviewsigninscreen}>
                <View style={InstructorsDetaileStyles.justicenterview}>
                  <Image style={InstructorsDetaileStyles.imagsetstyle} resizeMode="cover" source={{ uri: `${mentor.userInfo.profilePictureUrl}`}} />
                </View>
                <Text style={InstructorsDetaileStyles.texctstyles}>{t(mentor.userInfo.fullName)}</Text>
                <Spacing space={SH(10)} />
                <Rating
                  imageSize={20}
                  ratingCount={5}
                  value={mentor.mentorInfo.averageRating}
                  readonly
                  tintColor={Colors.lavender_blush_colors}
                />

                <View style={InstructorsDetaileStyles.minflexviewstyle}>
                  <View style={{ paddingLeft: "12%" }}>
                    <TouchableOpacity style={InstructorsDetaileStyles.bgcolorwhiteset}>
                      <VectorIcons icon="AntDesign" name="copy1" size={SF(27)} color={Colors.theme_backgound} />
                    </TouchableOpacity>
                    <Text style={InstructorsDetaileStyles.texctstyles}>{mentorCourses.length}</Text>
                    <Text style={InstructorsDetaileStyles.corsestextstyle}>{t("Instructor_Title_19")}</Text>
                  </View>
                  <View style={{ paddingRight: "12%" }}>
                    <TouchableOpacity style={InstructorsDetaileStyles.bgcolorwhiteset}>
                      <VectorIcons icon="FontAwesome" name="users" size={27} color={Colors.theme_backgound} />
                    </TouchableOpacity>
                    <Text style={InstructorsDetaileStyles.texctstyles}>{totalEnrollment}</Text>
                    <Text style={InstructorsDetaileStyles.corsestextstyle}>{t("Instructor_Title_20")}</Text>
                  </View>
                  {/* <View>
                    <TouchableOpacity style={InstructorsDetaileStyles.bgcolorwhiteset}>
                      <VectorIcons icon="FontAwesome5" name="users" size={30} color={Colors.theme_backgound} />
                    </TouchableOpacity>
                    <Text style={InstructorsDetaileStyles.texctstyles}>135</Text>
                    <Text style={InstructorsDetaileStyles.corsestextstyle}>{t("Instructor_Title_21")}</Text>
                  </View> */}
                </View>
                <View>
                  <Text style={InstructorsDetaileStyles.paregraphtext}>{t(mentor.mentorInfo.description)}</Text>
                </View>
                <Spacing space={SH(20)} />
                <View>
                  <View
                    showsHorizontalScrollIndicator={false}
                    style={InstructorsDetaileStyles.setflex}
                  >
                    {mentorCourses?.map((item, index) => (
                      <InstructorDetailView
                        key={index}
                        item={item}
                        onPress={() => navigation.navigate(RouteName.COURSES_DETAILS_SCREEN, {
                          data: item.id,
                          heart: false
                        })}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Container>
  );
};
export default InstructorsDetaileScreen;
