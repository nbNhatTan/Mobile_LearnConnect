import React, { useState, useMemo } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { ColorpickerStyle } from '../../style';
import { color_picker_set_action } from "../../redux/action/CommonAction";
import { useDispatch } from "react-redux";
import { Button, Spacing } from '../../Components';
import { RouteName } from '../../routes';
import images from '../../index';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import { SH, Colors } from '../../Utiles';

const ColorPickerset = (props) => {

  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState(Colors.theme_backgound);
  const dispatch = useDispatch();
  const onColorChange = (selectedColor) => {
    setCurrentColor(selectedColor);
  };
  const navigation = useNavigation();
  return (
    <View>
      <View style={ColorpickerStyle.CenteredViewtwo}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={ColorpickerStyle.CenteredView}>
            <View style={ColorpickerStyle.ModalView}>
              <View style={ColorpickerStyle.SetHeight}>
                <View
                  style={[
                    { backgroundColor: currentColor, borderRadius: SH(7) },
                  ]}
                >
                  <Text style={ColorpickerStyle.setcolorwhite}>{currentColor}</Text>
                  <ColorPicker
                    color={currentColor}
                    onColorChange={onColorChange}
                    onColorSelected={Colors.theme_backgound}
                    thumbSize={50}
                    noSnap={true}
                    defaultProps={true}
                    row={false}
                    gapSize={0}
                    discreteLength={0}
                    sliderHidden={true}
                    discrete={true}
                  />
                </View>
              </View>
              <View style={ColorpickerStyle.setbuttonwidth}>
                <Button title={t("Ok")}
                  buttonStyle={{ backgroundColor: currentColor }}
                  onPress={async () => { await dispatch(color_picker_set_action(currentColor)); setModalVisible(false); navigation.replace(RouteName.HOME_SCREEN) }}
                />
                <Spacing space={SH(10)} />
                <Button title={t("Cancel")}
                  buttonStyle={{ backgroundColor: 'lightgray' }}
                  onPress={() => { setModalVisible(false) }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={ColorpickerStyle.PaddingRight} onPress={() => setModalVisible(true)}>
          <Image style={ColorpickerStyle.colorpickerpickerimagwidth} resizeMode='contain' source={images.Color_Picker_Image} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default ColorPickerset;