import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {theme} from '../theme';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import {debounce} from 'lodash';
import {fetchLocations, fetchWeatherForecast} from '../API/api';
import {weatherImages} from '../constants';
import {getData, storeData} from '../storage/savePreviousWeatherSearch';
const HomeScreen = () => {
  const [isShow, setIsShow] = useState(false);
  const [locations, setLocation] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const {current, location} = weather;
  const handleSearchFunc = value => {
    if (value.length > 3) {
      fetchLocations({cityName: value}).then(data => {
        setLocation(data);
      });
    }
  };
  const handleLocationFunc = loc => {
    setLocation([]);
    setIsShow(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc?.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
    });
  };
  const handleTextDebounce = useCallback(debounce(handleSearchFunc, 1200), []);
  useEffect(() => {
    fetchMWeathereDetailsOnAppMount();
  }, []);
  const fetchMWeathereDetailsOnAppMount = async () => {
    let myCity = await getData('city');
    let cityName = 'Islamabad';
    if (myCity) cityName = myCity;
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };
  return (
    <View className="flex-1 relative">
      {/* Status Bar Component */}
      <StatusBar
        barStyle="white"
        hidden={false}
        backgroundColor="#083139"
        translucent={true}
      />
      {/* BackGround Image Component */}

      <Image
        blurRadius={50}
        source={require('../assets/images/bg.png')}
        className="absolute w-full h-full"
      />

      {/* Content Component*/}
      {loading ? (
        <View className="flex flex-1 flex-row items-center justify-center">
          <ActivityIndicator size="large" color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          <View className="mx-4 relative z-50 " style={{height: '7%'}}>
            {/* Search Component*/}
            <View
              className="flex-row justify-end items-center rounded-full"
              style={{
                backgroundColor: isShow ? theme.bgWhite(0.2) : 'transparent',
              }}>
              {isShow ? (
                <>
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search for City"
                    placeholderTextColor={'lightgray'}
                    className="pl-6 h-14 flex-1 text-base text-white"
                  />
                </>
              ) : null}

              <TouchableOpacity
                onPress={() => setIsShow(!isShow)}
                className="rounded-full p-3 m-1"
                style={{backgroundColor: theme.bgWhite(0.3)}}>
                <AntDesign name="search1" size={23} color={'white'} />
              </TouchableOpacity>
            </View>

            {/* Locations Suggestion Component*/}

            {locations.length > 0 && isShow ? (
              <>
                <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                  {locations.map((loc, index) => {
                    // To Remove Border From Last Locations Suggestion value start
                    let showBorder = index + 1 != locations.length;
                    let borderClass = showBorder
                      ? 'border-b-2 border-gray-100'
                      : '';
                    // To Remove Border From Last Locations Suggestion value end
                    return (
                      <TouchableOpacity
                        onPress={() => handleLocationFunc(loc)}
                        key={index}
                        className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass} `}>
                        <FontAwesome
                          name="map-marker"
                          size={24}
                          color={'gray'}
                        />
                        <Text className="text-black ml-2 text-lg">
                          {loc?.name}, {loc?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            ) : null}
          </View>

          {/* Forecast Section component */}
          <ScrollView className="pt-20" showsVerticalScrollIndicator={false}>
            <View className="flex justify-around flex-1 mb-2 mx-4">
              <Text className="text-white text-center text-2xl font-bold mb-2">
                {location?.name},{' '}
                <Text className="text-lg font-semibold text-gray-300">
                  {location?.country}
                </Text>
              </Text>
            </View>
            <View className="flex-row justify-center my-4">
              <Image
                className="w-48 h-48"
                source={weatherImages[current?.condition?.text]}
              />
            </View>
            <View className="my-3">
              <Text className="text-center font-bold text-white text-5xl ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center tracking-widest text-white text-xl">
                {current?.condition?.text}
              </Text>
            </View>

            {/* Climate Cndition code start */}
            <View className="flex-row items-center justify-between mx-6 my-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/wind.png')}
                  className="h-4 w-4"
                />
                <Text className="text-white text-base font-semibold">
                  {' '}
                  {current?.wind_kph}km
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/drop.png')}
                  className="h-4 w-4"
                />
                <Text className="text-white text-base font-semibold">
                  {current?.humidity}%
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require('../assets/icons/sun.png')}
                  className="h-4 w-4"
                />
                <Text className="text-white text-base font-semibold">
                  {' '}
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
            {/* Climate Cndition code end */}

            {/* Next Days Updates  code start */}
            <View className="mb-2 space-y-3 my-6">
              <View className="flex-row items-center mx-5 space-x-2 mb-5">
                <FontAwesome6 name="calendar-days" size={23} color={'white'} />
                <Text className="text-white text-base ">Daily Forecast</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                }}>
                {weather?.forecast?.forecastday?.map((item, index) => {
                  const date = new Date(item.date);
                  const options = {weekday: 'long'};
                  let dayName = date.toLocaleDateString('en-US', options);
                  dayName = dayName.split(',')[0];
                  return (
                    <View
                      key={index}
                      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                      style={{backgroundColor: theme.bgWhite(0.15)}}>
                      <Image
                        source={
                          weatherImages[item?.day?.condition?.text || 'other']
                        }
                        className="w-11 h-11"
                      />
                      <Text className="text-white">{dayName}</Text>
                      <Text className="text-white text-xl font-semibold">
                        {item?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}

                {/* );
          })} */}
              </ScrollView>
            </View>
            {/* Next Days Updates  code end */}
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
