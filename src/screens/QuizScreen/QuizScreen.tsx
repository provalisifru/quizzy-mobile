import {Text, View, TouchableOpacity, Alert, Modal} from 'react-native';
import AppButton from '../../components/Button/AppButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeadingWithoutInvitation from '../../feature/HeadingWithoutInvitation/HeadingWithoutInvitation';
import {AnswersContext} from '../../../App';
import {useContext, useEffect, useState} from 'react';
import QuizLogic from './QuizLogic/QuizLogic';

interface QuizScreenProps {
  navigation: any;
}

const QuizScreen = ({navigation}: QuizScreenProps) => {
  const {allAnswers, setAllAnswers, answers, checked, writtenAnswer, quizInfo} =
    useContext(AnswersContext);

  const [hintUsed, setHintUsed] = useState(false);
  const [flag, setFlag] = useState(false);

  const [index, setIndex] = useState(0);

  let quizLength = quizInfo?.questions.length - 1;
  let buttonText = 'Next';

  if (index === quizLength) {
    buttonText = 'Finish';
  }

  const showHint = () => {
    if (!flag) {
      if (!hintUsed) {
        setHintUsed(true);
        setFlag(true);
      }
    }
  };

  return (
    <View className="bg-primary h-full">
      <HeadingWithoutInvitation navigation={navigation} />
      <View className="bg-secondary rounded-xl m-2">
        <Text className="text-black font-bold self-center m-2 text-[28px]">
          Football players quiz
        </Text>
        <View className="flex flex-row items-center m-auto mb-6">
          {hintUsed ? (
            <Icon name="lightbulb-o" size={40} color="gray" />
          ) : (
            <TouchableOpacity onPress={showHint}>
              <Icon name="lightbulb-o" size={40} color="black" />
            </TouchableOpacity>
          )}

          <Text className="mx-6 text-black text-[24px]">9:36</Text>
          <TouchableOpacity>
            <Icon name="star-half-o" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View className="bg-white w-[90%] m-auto rounded-xl">
          {flag ? (
            <Text className="self-center text-[20px] font-bold">
              {quizInfo?.questions[index].hint}
            </Text>
          ) : null}

          <QuizLogic index={index} />
        </View>
        <AppButton
          onPress={() => {
            setFlag(false);
            switch (quizInfo?.questions[index].type) {
              case 'single':
                setAllAnswers([...allAnswers, checked]);
                break;
              case 'text':
                setAllAnswers([...allAnswers, writtenAnswer]);
                break;
              case 'multi':
                setAllAnswers([...allAnswers, answers]);
              default:
                break;
            }
            if (index === quizLength) {
              navigation.navigate('EndScreen', {quizId: quizInfo.id});
            } else {
              setIndex(index + 1);
            }
          }}
          text={buttonText}
          textStyle="text-white text-[25px]"
          styles="bg-primary p-[5px] my-6 self-center w-[130px] text-[25px] rounded-[12px]"
        />
      </View>
    </View>
  );
};

export default QuizScreen;
