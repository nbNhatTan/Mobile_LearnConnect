import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import { Text, View, FlatList, Image } from "react-native";
import { CoursesDetailStyle } from '../../style';
import { Container} from '../../Components';
import { useTranslation } from "react-i18next";

const LectureDetailTab = (props) => {
    const { t } = useTranslation();
    const { onPress, lecture } = props;
    const { Colors } = useTheme();
    const CoursesDetailStyles = useMemo(() => CoursesDetailStyle(Colors), [Colors]);
    return (
        <Container>
            <View style={CoursesDetailStyles.overviewtabminview}>
                <Text style={CoursesDetailStyles.textstylesfonts}>{t(lecture.title)}</Text>
                <Text style={[CoursesDetailStyles.loremlongparegraph, {height:450}]}>{t(lecture.content)}</Text>
                
            </View>
        </Container>
    );
}
export default LectureDetailTab;





