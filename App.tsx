import React, {useCallback} from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Text, TouchableHighlight, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

//type은 공식문서를 보고 해보자. react navigation
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;
// 매개변수 return값 변수에다가 타입을 붙인것
function HomeScreen({navigation}: HomeScreenProps) {
  //매개변수
  const onClick = useCallback(() => {
    //react native에서의 화면 전화하는 방법 참조속성은 Screen name
    navigation.navigate('Details');
  }, [navigation]);

  return (
    <>
      <View
        style={{
          flex: 2,
          backgroundColor: 'yellow',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        {/* 웬만하면 PRessable 쓰자 차이가 andorid, ios가 달라질 수있기때문에 대도록이면 pressable을 쓰고 option사용 */}
        <Pressable
          onPress={onClick}
          // web에서하는 padding 20 30 이 안됨 그래서 paddingLeft paddingTop이렇게 일일이 줘야함.
          //그나마 left right -> paddingHorizontal  top bottom ->paddingVertical 이 있다.
          style={{padding: 20, backgroundColor: 'blue'}}>
          {/* react native는 View에 주면 폰트색안바뀜 Text자체에 컬러를 줘야함. */}
          <Text style={{color: 'white'}}>Home Screen</Text>
          {/* Text는 항상 Text component로 감싸줘야함 */}
        </Pressable>
      </View>
      <View
        style={{
          flex: 5,
          backgroundColor: 'orange',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Second</Text>
      </View>
    </>
  );
}

//navigation prop는 어디서 전달했나?
//Screen의 component에 넣은 component는 Screen comonent에서
// value component에게 navigation ,router라는 props를 전달.
function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

// 실제로 이렇게 생김.
// const Stack = ()  {
//   return <View></View>
// }

// const Navigator = ()  {
//   return <View></View>
// }

// const Screen = ()  {
//   return <View></View>
// }

// Stack.Navigation = Navigator;
// Stack.Screen = Screen;
const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    // react navigation 작동
    <NavigationContainer>
      {/* screen을 그룹으로 묶어 sceen을 왓다갓다 하게 해줌. default화면은 Home화면 */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Overview', headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          // component={DetailsScreen}
        >
          {/* 추가적인 props들을 넘기고 싶을때 사용 위방식이 시각적으로 좋음. */}
          {props => <DetailsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
