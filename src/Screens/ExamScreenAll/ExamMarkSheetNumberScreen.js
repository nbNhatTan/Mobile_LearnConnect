import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView, KeyboardAvoidingView, FlatList, TouchableOpacity, } from "react-native";
import { Container, VectorIcons,AppHeader } from '../../Components';
import { Style, ExamMarksheetStyle } from "../../style";
import { useTranslation } from "react-i18next";
import { SF } from '../../Utiles';
import { RouteName } from '../../routes';
import axios from "axios";
import { useSelector } from 'react-redux';

const ExamMarkSheetNumberScreen = (props) => {
    const { token, userLogin } = useSelector(state => state.authReducer) || {};
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { t } = useTranslation();
    const { route } = props;
    const score = route?.params?.score;
    const selected = route?.params?.selected;
    const test = route?.params?.test;
    const courseId = route?.params?.courseId;
    const total = test?.length;
    const valueSelected = Object.values(selected)
    const keysSelected = Object.keys(selected);

    if(valueSelected.length > 0) {
        const saveUserAnswer = async () => {
            await axios.post(`https://learnconnectapitest.azurewebsites.net/api/user-answer?userId=4&courseId=${courseId}`,
            valueSelected
            )
              .then(res => {
                console.log('Save user answer success')
              })
              .catch(err => console.log('Error at saveUserAnswer(): ', err));
          };
          saveUserAnswer();
    }

    let count = 0;
    const generateItems = () => {
        const resultArray = [];
        for (let i = 1; i <= total; i++) {
            if(keysSelected.includes(`${i}`)){
                const ansCorrect = test[i-1].answers.find(a => a.isCorrect).id;
                if(ansCorrect === valueSelected[i-1]){
                    count++;
                    resultArray.push({key: parseInt(i, 10), isSelect: true, isCorrect: true});
                }else{
                    resultArray.push({key: parseInt(i, 10), isSelect: true, isCorrect: false});
                }                
            }else{
                resultArray.push({key: parseInt(i, 10), isSelect: false, isCorrect: false});
            }
            
          }
        console.log(resultArray)
        return resultArray;
    }
    const tmp = generateItems();

    const { Colors } = useTheme();
    const ExamMarksheetStyles = useMemo(() => ExamMarksheetStyle(Colors), [Colors]);
    return (
        <Container>
            <View style={ExamMarksheetStyles.minstyleviewphotograpgy}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={Style.scrollviewstyles}>
                    <View style={ExamMarksheetStyles.keybordtopviewstyle}>
                        <KeyboardAvoidingView enabled>
                            <View style={ExamMarksheetStyles.minflexview}>
                                <View style={ExamMarksheetStyles.minviewsigninscreen}>
                                    <View style={ExamMarksheetStyles.questionview}>
                                        <TouchableOpacity style={ExamMarksheetStyles.questionpapewrset}>
                                            <Text style={ExamMarksheetStyles.boxintitle}>{t(`Your score: ${Math.round(count/total*100)}`)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={ExamMarksheetStyles.boxstyleminview}>
                                        <View style={ExamMarksheetStyles.whiteboxwhishlist}>
                                            <View style={ExamMarksheetStyles.minviewaboxin}>
                                                <View style={ExamMarksheetStyles.dotsetview}>
                                                    <View style={ExamMarksheetStyles.dotcolorset}></View>
                                                    <Text style={ExamMarksheetStyles.textcolorset}>{t("Correct Answer")}</Text>
                                                </View>
                                                <View style={ExamMarksheetStyles.dotsetview}>
                                                    <View style={ExamMarksheetStyles.wrongdot}></View>
                                                    <Text style={ExamMarksheetStyles.textcolorset}>{t("Incorrect Answer")}</Text>
                                                </View>
                                            </View>
                                            <View style={ExamMarksheetStyles.minviewaboxin}>
                                                <View style={ExamMarksheetStyles.dotsetview}>
                                                    <View style={ExamMarksheetStyles.notvisiteddot}></View>
                                                    <Text style={ExamMarksheetStyles.textcolorset}>{t("Exam_question_4")}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={ExamMarksheetStyles.mcqminviewset}>
                                            <View style={ExamMarksheetStyles.whiteboxwhishlistmcq}>
                                                <View>
                                                    <View style={ExamMarksheetStyles.bgvolorsetphysic}>
                                                        <Text style={ExamMarksheetStyles.physistextset}>{t("Exam_question_8")}</Text>
                                                    </View>
                                                    <View style={ExamMarksheetStyles.container}>
                                                        <FlatList
                                                            data={tmp}
                                                            renderItem={({ item }) =>
                                                                <View style={ExamMarksheetStyles.widthsetround}>
                                                                    <View style={ExamMarksheetStyles.GridViewContainer}>
                                                                        {/* <TouchableOpacity style={item < 18 ? ExamMarksheetStyles.bgvolosetdigitall : item < 20 ? ExamMarksheetStyles.bgvolosetdigitalltwo : item < 22 ? ExamMarksheetStyles.bgvolosetdigitallthree : ExamMarksheetStyles.bgvolosetdigitallfour}> */}
                                                                        <TouchableOpacity style={item.isSelect ? 
                                                                            item.isCorrect ? 
                                                                                ExamMarksheetStyles.bgvolosetdigitall 
                                                                                : 
                                                                                ExamMarksheetStyles.bgvolosetdigitalltwo 
                                                                            : ExamMarksheetStyles.bgvolosetdigitallthree}>
                                                                            <Text style={ExamMarksheetStyles.GridViewTextLayout} onPress={()=>{}} > {item.key}
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            }
                                                            numColumns={5}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
};

export default ExamMarkSheetNumberScreen;
