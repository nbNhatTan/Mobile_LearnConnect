import React, { useMemo, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { LessonsTabStyle, Style } from '../../style';
import { Container, VectorIcons, LessonsTabViews, Spacing, Button } from '../../Components';
import { SH, SF } from '../../Utiles';

const LessonsTab = (props) => {
  const { Colors } = useTheme();
  const LessonsTabStyles = useMemo(() => LessonsTabStyle(Colors), [Colors]);
  const { onPress, listLecture, lectureLearned, onPressTest } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  let learned = lectureLearned
  if (!lectureLearned) {
    learned = {
      lectureLearned: 0,
      progress: 0
    }
  }

  return (
    <Container>
      <View style={LessonsTabStyles.overviewtabminview}>
        <View>
          {listLecture?.map((item, index) => (
            <LessonsTabViews
              key={index}
              item={item}
              isLock={index >= learned.lectureLearned}
              onPress={() => {
                if (index >= learned.lectureLearned) {
                  setModalVisible(true)
                } else {
                  onPress(item)
                }
              }}
            />
          ))}
        </View>
        <Spacing space={SH(20)} />
        <Button title={"Practice Test"} onPress={() => {
          if (learned.lectureLearned !== listLecture.length) {
            setModalVisible(true)
          } else {
            onPressTest()
          }
        }} icon={<VectorIcons
          icon="EvilIcons"
          size={SF(32)}
          name={learned.lectureLearned === listLecture.length ? 'unlock' : 'lock'}
          color='white'
        />} />
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible && learned.lectureLearned > 0}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <View style={Style.setbgcolorgrsay}>
            <View style={Style.CenteredView}>
              <View style={Style.ModalView}>
                {
                  <View style={Style.setroundcenter}>
                    <View style={[Style.checkiconright, { borderColor: Colors.theme_backgound }]}>
                      <VectorIcons icon="AntDesign" style={Style.setbackgroundicon} color="red" name="close" size={40} />
                    </View>
                  </View>
                }
                <View style={Style.registertextset}>
                  <Text style={Style.settext}>{"You have not completed the previous lecture."}</Text>
                </View>
                <View style={Style.buttonminview} >
                  <View style={Style.setokbutton}>
                    {/* <Button title={cancelButtonText}
                      onPress={() => { onPressCancel() }}
                    /> */}
                  </View>
                  <View style={Style.setokbutton}>
                    <Button title={"Close"}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    </Container>
  );
}
export default LessonsTab;





