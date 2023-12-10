import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import { Container, VectorIcons } from '../../Components';
import { Style, NotificationStyle } from '../../style';
import { useTranslation } from "react-i18next";
import { SF, Fonts } from '../../Utiles';
import axios from "axios";
import { useSelector } from 'react-redux';


const NotificationScreen = () => {
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const NotificationStyles = useMemo(() => NotificationStyle(Colors), [Colors]);
  const { token, userLogin } = useSelector(state => state.authReducer) || {};
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      await axios.get(`https://learnconnectapitest.azurewebsites.net/api/notification/byUserId/${userLogin.id}`)
        .then(res => {
          console.log('Notifications: ', res?.data);
          setNotifications(res?.data);
        })
        .catch(err => console.log('Error at getNotification(): ', err));
    };
    getNotification();

  }, []);

  const getTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const now = Date.now();
    const tmp = (now - date.getTime()) / 1000;

    let timeString = `${tmp} second${tmp > 1 ? "s" : ""} ago`;
    if (tmp > 604800) {
      return timeString = `${Math.floor(tmp / 604800)} week${Math.floor(tmp / 604800) > 1 ? "s" : ""} ago`;
    } else if (tmp > 86400) {
      return timeString = `${Math.floor(tmp / 86400)} day${Math.floor(tmp / 86400) > 1 ? "s" : ""} ago`;
    } else if (tmp > 3600) {
      return timeString = `${Math.floor(tmp / 3600)} hours${Math.floor(tmp / 3600) > 1 ? "s" : ""} ago`;
    } else if (tmp > 60) {
      return timeString = `${Math.floor(tmp / 60)} minute${Math.floor(tmp / 60) > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <Container>
      <View style={NotificationStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <KeyboardAvoidingView enabled>
            <View style={NotificationStyles.keybordtopviewstyle}>
              <View style={NotificationStyles.minflexview}>
                <View style={NotificationStyles.minviewsigninscreen}>
                  {notifications?.map((item, index) => (
                    <TouchableOpacity style={NotificationStyles.whiteboxwhishlist} key={index}>
                      <View style={NotificationStyles.flexDirectiwhilist}>
                        <View style={NotificationStyles.notificationimageview}>
                          <VectorIcons name="notifications" icon="Ionicons" color={Colors.white_text_color} size={SF(32)} />
                        </View>
                        <View style={NotificationStyles.textviewsetwhishlist}>
                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                            <Text style={{
                              fontSize: SF(18),
                              fontFamily: Fonts.Poppins_Bold,
                              color: Colors.black_text_color,
                              width: '75%'
                            }}>{t(item.title)}</Text>
                            <Text style={{
                              fontSize: SF(14),
                              fontFamily: Fonts.DMSans_Medium,
                              color: Colors.gray_text_color,
                              width: '25%'
                            }}>{t(getTime(item.timeStamp))}</Text>
                          </View>

                          <Text style={NotificationStyles.dolardigittext}>{t(item.description)}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Container>
  );
};
export default NotificationScreen;
