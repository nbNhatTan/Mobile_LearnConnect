import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity, } from 'react-native';
import { ExamQuestionStyle } from '../../style';
import { useNavigation } from '@react-navigation/native';
import { VectorIcons, Button } from '../../Components';
import { SF } from '../../Utiles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";

const QuesAnsPair = (props) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const { options, answers, is_next, index, getScore, get_selected, length, question, onSubmit } = props;
    const [selected, setSelected] = useState({});
    const [score, setScore] = useState({});
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [isTimerStart, setIsTimerStart] = useState(1);
    const [timer, setTimer] = useState(609);
    const [start, setStart] = useState(true);
    const [finalscore, setFinalscore] = useState();
    const tick = useRef();

    useEffect(() => {
        var arr = Object.values(score)
        let temp = 0;
        for (let i = 0; i < arr.length; i++) {
            temp = temp + arr[i]
        }
        setFinalscore(temp)
        getScore(finalscore);
        get_selected(selected)

    }, [score, index])

    const handleNext = async (selectedAns, achieved_score) => {
        setSelected({ ...selected, [index]: selectedAns });
        setScore({ ...score, [index]: achieved_score });
        is_next();
    }
    const { Colors } = useTheme();
    const ExamQuestionStyles = useMemo(() => ExamQuestionStyle(Colors), [Colors]);

    function RadioButton({ selectedOption, onSelect }) {
        return (
            <View style={ExamQuestionStyles.buttonContainer}>
                {
                    answers.map((ans, i) => {
                        return (
                            <View key={i} style={[ExamQuestionStyles.buttonContainer, { flexDirection: 'row' }]}>
                                <TouchableOpacity
                                    style={ExamQuestionStyles.radiobuttonsetstyle}
                                    onPress={() => {
                                        onSelect(ans.id)
                                        handleNext(ans.id, ans.isCorrect ? 1 : 0)
                                    }}>
                                    <View style={ExamQuestionStyles.radiobuttonsetstyles}>
                                            <View style={ExamQuestionStyles.radiobuttonlableview}>
                                                {selected[index] === ans.id && <View style={ExamQuestionStyles.lableradionstyle}></View>}
                                            </View>
                                        <View style={ExamQuestionStyles.answersContainer}>
                                            <View>
                                                <Text style={ExamQuestionStyles.answerText}>{ans.answerText}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
        );
    }
    const onSelect = (item) => {
        setSelectedOption(item);
    };
    useEffect(() => {
        if (start) {
            tick.current = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        }

        return () => clearInterval(tick.current);
    }, [start]);
    const toggleStart = () => {
        setStart(!start);
    };
    const dispSecondsAsMins = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const seconds_ = seconds % 60;
        return (mins <= 0 ? "00" : mins.toString()) + ":" + (seconds_ <= 0 ? "00" : (seconds_ < 10 ? "0":"") + seconds_.toString());
    };
    return (
        <View style={ExamQuestionStyles.minviewsigninscreen}>
            <View style={ExamQuestionStyles.propsminview}>
                <View>
                    <Text style={ExamQuestionStyles.volortext}>{index}/{length}</Text>
                </View>
                <TouchableOpacity style={ExamQuestionStyles.flexrowsetpushicon} onPress={() => {
                    setTimer(!timer);
                }}>
                    {isTimerStart == 1 ?
                        <TouchableOpacity
                            onPress={() => { setIsTimerStart(0), toggleStart() }}
                        >
                            <VectorIcons
                                icon="Entypo"
                                size={SF(25)}
                                name="controller-paus"
                                style={ExamQuestionStyles.pushiconstyle}

                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => { setIsTimerStart(1), toggleStart() }}
                        >
                            <VectorIcons
                                icon="Entypo"
                                size={SF(25)}
                                name="controller-play"
                                style={ExamQuestionStyles.pushiconstyle}
                            />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity>
                        <Text style={ExamQuestionStyles.volortext}>{dispSecondsAsMins(timer)}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={ExamQuestionStyles.submitbuttonstyleset}>
                    <Button onPress={onSubmit} title={t("photography_Titles_28")}
                        buttonStyle={ExamQuestionStyles.buttonset}
                        buttonTextStyle={ExamQuestionStyles.buttonTextStyleSignWithNumber2}
                    />
                </View>
            </View>
            <View style={ExamQuestionStyles.questionContainer}>
                <View style={ExamQuestionStyles.flexsetadd}>
                    <Text style={ExamQuestionStyles.textcolorset1}>{index}</Text>
                    <Text style={ExamQuestionStyles.textcolorset}>
                        {question}
                    </Text>
                </View>
                <View style={ExamQuestionStyles.optionview}>
                    <RadioButton
                        selectedOption={selectedOption}
                        onSelect={onSelect}
                        options={options}
                        formHorizontal={false}
                        value={"selectedOption"}
                    />
                </View>
            </View>
        </View>
    );
}
export default QuesAnsPair;