import React, { useMemo, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, FlatList, } from "react-native";
import { Container, PurchasedHistoryView } from '../../Components';
import { Style, PurchasedHistoryStyle } from "../../style";
import axios from "axios";
import { useSelector } from 'react-redux';

const PurchasedHistoryScreen = (props) => {
  const { token, userLogin } = useSelector(state => state.authReducer) || {};
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { navigation } = props;
  const { Colors } = useTheme();
  const PurchasedHistoryStyles = useMemo(() => PurchasedHistoryStyle(Colors), [Colors]);
	const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getPaymentTransactions = async () => {
      await axios.get(`https://learnconnectapitest.azurewebsites.net/api/payment-transaction/by-user/${userLogin.id}?currentPage=1&pageSize=100`)
        .then(res => {
          console.log('Payment Transactions: ', res?.data?.paymentTransactions);
          setTransactions(res?.data?.paymentTransactions);

        })
        .catch(err => console.log('Error at getPaymentTransactions(): ', err));
    };
    getPaymentTransactions();
  }, []);

  return (
    <Container>
      <View style={PurchasedHistoryStyles.minstyleviewphotograpgy}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.scrollviewstyles}>
          <KeyboardAvoidingView enabled>
            <View style={PurchasedHistoryStyles.minflexview}>
              <View style={PurchasedHistoryStyles.minviewsigninscreen}>
                <View style={PurchasedHistoryStyles.setflex}>
                  {transactions?.map((item, index) => (
                    <PurchasedHistoryView
                      item={item?.paymentTransaction}
                      key={index}
                    />
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
export default PurchasedHistoryScreen;
