import React from "react";
import { Text, View, TextInput, SafeAreaView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.SafeAreaView`
  width: 100%;
  padding: 15px;
`;
const Info = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
  margin-bottom: 10px;
`;
const Input = styled.TextInput`
  font-size: 18px;
  color: blue;
  font-weight: 500;
  border: 1px solid black;
  margin-bottom: 10px;
  border-radius: 15px;
`;

export default function App() {
  const [number, setNumber] = React.useState();
  const [array, setArrat] = React.useState([]);
  const [response, setResponse] = React.useState("");

  const storeData = async (value) => {
    let newArray = [...array, ...[value]];
    setArrat((prev) => [...prev, ...[value]]);
    console.log(value, array, newArray);
    await AsyncStorage.setItem("@input", JSON.stringify(newArray));
  };
  const getData = (value) => {
    value > 100
      ? setResponse("შეიყვანეთ 1-დან 100-მდე ციფრი")
      : setResponse("");
    setNumber(value);
    console.log(number);
  };
  React.useEffect(async () => {
    const value = await AsyncStorage.getItem("@input");
    if (value !== null) {
      setArrat(JSON.parse(value));
    }
  }, []);
  return (
    <Container>
      <Wrapper>
        <Info>{response}</Info>
        <Info>შენახულია: {JSON.stringify(array)}</Info>
        <Info>არჩეული ციფრი: {number}</Info>
        <Input
          onChangeText={(n) => getData(n)}
          placeholder="შეიყვანეთ 1-დან 100-მდე ციფრი"
          keyboardType="numeric"
        />
        <Button
          title="Press me"
          onPress={() => {
            storeData(number);
          }}
        />
      </Wrapper>
    </Container>
  );
}
