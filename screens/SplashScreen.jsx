import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const SplashScreen = () => {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Swiper>
          <ScreenOne />
          <ScreenTwo />
          <ScreenThree />
        </Swiper>
      </View>
    </>
  );
};

export const ScreenOne = () => {
  return (
    <View className="flex-1 items-center justify-center relative">
      <Image
        source={require('../assets/moon.jpg')}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="w-72 h-auto flex items-center justify-center p-2 absolute top-36 left-2">
        <Text className="text-4xl font-semibold text-white">
          If you want to see the sunshine, you have to.
          <Text className="text-6xl text-yellow-400">Weather the Storm</Text>
        </Text>
      </View>
    </View>
  );
};

export const ScreenTwo = () => {
  return (
    <View className="flex-1 items-center justify-center relative">
      <Image
        source={require('../assets/moon1.jpg')}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="w-72 h-auto flex items-center justify-center p-2 absolute top-36 left-2">
        <Text className="text-2xl tracking-wider text-yellow-500  ">
          Wherever you go, no matter what the weather,
        </Text>
        <Text className="text-6xl text-white  ">
          Always bring your own Sunshine.
        </Text>
      </View>
    </View>
  );
};

export const ScreenThree = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center relative">
      <Image
        source={require('../assets/sun.jpg')}
        className="w-full h-full"
        resizeMode="cover"
      />
      <TouchableOpacity className="p-2 absolute -top-10 right-2 mt-20">
        <FontAwesome name="th-list" size={28} color={'white'} />
      </TouchableOpacity>
      <Text className="p-2 absolute -top-11 left-2 mt-20 text-3xl text-white">
        Pakistan
      </Text>
      <View className="w-72 h-auto flex items-center justify-center p-2 absolute top-36 left-2 mt-20">
        <Text className="text-5xl tracking-wider text-white  ">
          Search for weather around your country.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="mt-60 py-4 px-14 ml-16 flex flex-row items-center justify-center bg-yellow-600 rounded-lg">
          <Text className="text-xl text-white  ">Let's Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SplashScreen;
