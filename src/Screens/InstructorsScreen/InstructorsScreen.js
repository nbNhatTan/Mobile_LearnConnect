import React, { useMemo, useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, FlatList, KeyboardAvoidingView, } from "react-native";
import { Container, InstructorListView } from '../../Components';
import { InstructerData } from '../../Utiles';
import { Style, ProfileStyles } from "../../style";
import { RouteName } from "../../routes";
import axios from "axios";
import { useSelector } from 'react-redux';

const InstructorsProfileScreen = (props) => {
  const { token } = useSelector(state => state.authReducer) || {};
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { navigation } = props;
  const { Colors } = useTheme();
  const ProfileStyle = useMemo(() => ProfileStyles(Colors), [Colors]);
	const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const getListMentor = async () => {
      await axios.get(`https://learnconnectapitest.azurewebsites.net/api/mentor/get-mentors`)
        .then(res => {
          console.log('List mentor: ', res?.data);
          setMentors(res?.data);
        })
        .catch(err => console.log('Error at getListMentor(): ', err));
    };
    getListMentor();
  }, []);

  return (
    <Container>
      <View style={ProfileStyle.minstyleviewphotograpgy}>
       
          <KeyboardAvoidingView enabled>
            <View style={ProfileStyle.minflexview}>
              <View style={ProfileStyle.minviewsigninscreen}>
                <FlatList
                  data={mentors}
                  renderItem={({ item }) => (<InstructorListView
                    item={item}
                    onPress={() =>
                      navigation.navigate(
                        RouteName.INSTRUCTOR_DETAILS_SCREEN,{
                          data: item,
                        }
                      )
                    }
                  />)}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                >
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Style.scrollviewstyles}>
                  </ScrollView>
                </FlatList>
              </View>
            </View>
          </KeyboardAvoidingView>
        {/* </ScrollView> */}
      </View>
    </Container>
  );
};
export default InstructorsProfileScreen;
