import * as React from 'react';
import { View, Vibration } from 'react-native';
import { Styles } from '../styles/GlobalStyles';
import Button from './Button';

export default function Keyboard() {
  const [firstNumber, setFirstNumber] = React.useState('');
  const [secondNumber, setSecondNumber] = React.useState('');
  const [operation, setOperation] = React.useState('');
  const [result, setResult] = React.useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      Vibration.vibrate(50);
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    Vibration.vibrate(130);
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber('');
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setResult(null);
  };

  const getResult = () => {
    switch (operation) {
      case '+':
        clear();
        setResult(parseInt(secondNumber) + parseInt(firstNumber));
        break;
      case '-':
        clear();
        setResult(parseInt(secondNumber) - parseInt(firstNumber));
        break;
      case '*':
        clear();
        setResult(parseInt(secondNumber) * parseInt(firstNumber));
        break;
      case '/':
        clear();
        setResult(parseInt(secondNumber) / parseInt(firstNumber));
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View style={Styles.row}>
        <Button title='C' isGray onPress={clear} />
        <Button
          title='+/-'
          isGray
          onPress={() => handleOperationPress('+/-')}
        />
        <Button title='％' isGray onPress={() => handleOperationPress('％')} />
        <Button title='÷' isBlue onPress={() => handleOperationPress('/')} />
      </View>
      <View style={Styles.row}>
        <Button title='7' onPress={() => handleNumberPress('7')} />
        <Button title='8' onPress={() => handleNumberPress('8')} />
        <Button title='9' onPress={() => handleNumberPress('9')} />
        <Button title='×' isBlue onPress={() => handleOperationPress('*')} />
      </View>
      <View style={Styles.row}>
        <Button title='4' onPress={() => handleNumberPress('4')} />
        <Button title='5' onPress={() => handleNumberPress('5')} />
        <Button title='6' onPress={() => handleNumberPress('6')} />
        <Button title='-' isBlue onPress={() => handleOperationPress('-')} />
      </View>
      <View style={Styles.row}>
        <Button title='1' onPress={() => handleNumberPress('1')} />
        <Button title='2' onPress={() => handleNumberPress('2')} />
        <Button title='3' onPress={() => handleNumberPress('3')} />
        <Button title='+' isBlue onPress={() => handleOperationPress('+')} />
      </View>
      <View style={Styles.row}>
        <Button title='.' onPress={() => handleNumberPress('.')} />
        <Button title='0' onPress={() => handleNumberPress('0')} />
        <Button
          title='⌫'
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title='=' isBlue onPress={() => getResult()} />
      </View>
    </View>
  );
}
