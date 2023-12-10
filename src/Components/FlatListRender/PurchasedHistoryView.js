import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, Image } from 'react-native';
import { Button } from '../../Components';
import { PurchasedHistoryStyle } from '../../style';
import { useTranslation } from 'react-i18next';
import {SF, Fonts } from '../../Utiles';

const PurchasedHistoryView = props => {
  const { t } = useTranslation();
  const { item, onPress } = props;
  const { Colors } = useTheme();
  const PurchasedHistoryStyles = useMemo(
    () => PurchasedHistoryStyle(Colors),
    [Colors],
  );

  const getDate = (date) => {
    const e = new Date(date)
    return `${e.getHours()}:${e.getMinutes()} ${e.getDate()}/${e.getMonth() + 1}/${e.getFullYear()}`;
  }

  return (
    <View
      style={PurchasedHistoryStyles.whiteboxwhishlist}
      onPress={() => onPress()}>
      <View style={PurchasedHistoryStyles.flexDirectiwhilist}>
        <View>
          <Image
            style={PurchasedHistoryStyles.setimagestyle}
            resizeMode="cover"
            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/learnconnect-6f324.appspot.com/o/paymentMBImage.png?alt=media&token=2d78908f-35e5-47d6-bf39-99e5f8b57dcb` }}
          />
        </View>
        <View style={PurchasedHistoryStyles.textviewsetwhishlist}>
          <Text style={PurchasedHistoryStyles.historytextstyle}>
            {t(item.courseName)}
          </Text>
          <View style={PurchasedHistoryStyles.flexrowsetusericon}>
            <Text style={PurchasedHistoryStyles.timetexststyle}>
              {t('Total :')}
            </Text>
            <Text style={PurchasedHistoryStyles.settextusert}>
              {t(item.total)}
            </Text>
          </View>
          <View style={PurchasedHistoryStyles.flexrowsetusericon}>
            <Text style={PurchasedHistoryStyles.totaltextprice}>
              {t('Success Date :')}
            </Text>
            <Text style={PurchasedHistoryStyles.settextusert}>
              {t(getDate(item.successDate))}
            </Text>
          </View>
        </View>
      </View>
      <View style={PurchasedHistoryStyles.minviewsetpaymenttype}>
        <View style={PurchasedHistoryStyles.flexrowsetrpayment}>
          {item.transactionId &&
            <Text style={PurchasedHistoryStyles.paymenttypetext}>
              {t('Transaction Number:')}
            </Text>
          }
          <Text style={PurchasedHistoryStyles.settextusert}>
            {t(item.transactionId)}
          </Text>

        </View>
        <View style={PurchasedHistoryStyles.serftbuttonwidth}>
          <Text style={{
            fontSize: SF(20),
            fontFamily: Fonts.Poppins_Medium,
            textAlign: 'center',
            color: `${item.status == 0 ? "green" : item.status == 1 ? "red" : "orange"}`
          }}>
            {t(item.status == 0 ? "Success" : item.status == 1 ? "Error" : "Pending")}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default PurchasedHistoryView;
