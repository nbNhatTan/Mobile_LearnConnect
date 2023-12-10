import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import questions from '../../Components/QuizComponets/questions1.json'
import QuesAnsPair from '../../Components/QuizComponets/QuesAnsPair';
import { writeScore } from '../../Components/QuizComponets/scoreStorage';
import { Button, Container, AppHeader } from '../../Components';
import { Style, ExamQuestionStyle } from '../../style';
import { useTranslation } from "react-i18next";
import { RouteName } from '../../routes';
import axios from "axios";
import { useSelector } from 'react-redux';

const Quiz = (props) => {
  const { token, userLogin } = useSelector(state => state.authReducer) || {};
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { navigation, route } = props;
  const courseId = route?.params?.courseId;
  const { t } = useTranslation();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState({})
  const [test, setTest] = useState();


  const { Colors } = useTheme();
  const ExamQuestionStyles = useMemo(() => ExamQuestionStyle(Colors), [Colors]);

  const handleQuizTraversal = () => {
    if (questionIndex === test.length - 1) {
      navigation.navigate(RouteName.EXAM_MARKSHEET_NUMBER, { score: score, selected: selected, test: test, courseId: courseId });
      return
    }
    setQuestionIndex((questionIndex) => questionIndex + 1);
    setShowNext(true);
  }
  const is_next = () => {
    setShowNext(true);
  }
  const get_Score = (score) => {
    setScore(score);
  }
  const getSelected = (selected) => {
    setSelected(selected);
  }

  const saveUserAnswer = async (valueSelected) => {
    await axios.post(`https://learnconnectapitest.azurewebsites.net/api/user-answer?userId=4&courseId=${courseId}`,
    valueSelected
    )
      .then(res => {
        console.log('Save user answer success')
      })
      .catch(err => console.log('Error at saveUserAnswer(): ', err));
  };

  useEffect(() => {
    const getTest = async () => {
      await axios.get(`https://learnconnectapitest.azurewebsites.net/api/test/get-tests-by-course?courseId=${courseId}`)
        .then(res => {
          setTest(res?.data[0]?.questions);
          console.log('Test: ', res?.data[0]?.questions)
          getUserAnswer(res?.data[0]?.questions);
        })
        .catch(err => console.log('Error at getTest(): ', err));
    };
    getTest();
    const getUserAnswer = async (t) => {
      await axios.get(`https://learnconnectapitest.azurewebsites.net/api/user-answer/get-list-answer-by-course?userId=${userLogin.id}&courseId=${courseId}`)
        .then(res => {
          const resultObject = {};
          t.forEach((item, index)=> {
            const ans = item.answers.filter(a => res?.data.map(i=>i.answerId).includes(a.id))
            if(ans.length >0){
              resultObject[(index + 1).toString()] = ans[0].id;
            }
          })
          setSelected(resultObject)
          if (Object.keys(resultObject).length > 0) {
            navigation.navigate(RouteName.EXAM_MARKSHEET_NUMBER, { score: score, selected: resultObject, test: t , courseId:courseId});
          }
        })
        .catch(err => console.log('Error at getUserAnswer(): ', err));
    };


  }, [])

  return (
    <Container>
      {test ?
        <View style={ExamQuestionStyles.minstyleviewphotograpgy}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={Style.scrollviewstyles}>
            <View style={ExamQuestionStyles.keybordtopviewstyle}>
              <KeyboardAvoidingView enabled>
                <View style={ExamQuestionStyles.minviewsigninscreen}>
                  <QuesAnsPair
                    question={test[questionIndex].question.questionText}
                    answers={test[questionIndex].answers}
                    is_next={is_next}
                    getScore={get_Score}
                    length={test.length}
                    get_selected={getSelected}
                    index={questionIndex + 1}
                    onSubmit={() => navigation.navigate(RouteName.EXAM_MARKSHEET_NUMBER, { score: score, selected: selected, test: test, courseId:courseId })}
                  />
                  <View style={ExamQuestionStyles.buttonflexminview}>
                    <View style={ExamQuestionStyles.submitbuttonstyleset}>
                      {
                        showNext && questionIndex > 0 || (selected[questionIndex] !== undefined && questionIndex > 0) ?
                          <Button onPress={() => setQuestionIndex((index) => index - 1)} title={t("photography_Titles_26")} />
                          : null
                      }
                    </View>
                    <View style={ExamQuestionStyles.submitbuttonstyleset}>
                      <Button onPress={handleQuizTraversal} title={questionIndex === test.length - 1 ? 'end ' : t("photography_Titles_27")} />
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
        :
        <View style={[ExamQuestionStyles.minstyleviewphotograpgy, {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }]}>
          <Text style={{
            fontSize: 16,
            color: 'black'
          }}>This course do not have any practice test</Text>
        </View>
      }
    </Container>
  );
}
export default Quiz;