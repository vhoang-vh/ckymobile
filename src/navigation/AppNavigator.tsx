import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTabNavigator } from "./MainTabNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { AddPetScreen } from "../screens/Pet/AddPetScreen";
import { HealthRecordScreen } from "../screens/Pet/HealthRecordScreen";
import { BookingHistoryScreen } from "../screens/Booking/BookingHistoryScreen";
import { CheckoutScreen } from "../screens/Booking/CheckoutScreen";
import { BookingSuccessScreen } from "../screens/Booking/BookingSuccessScreen";
import { CartScreen } from "../screens/Shop/CartScreen";
import { ProductDetailScreen } from "../screens/Shop/ProductDetailScreen";
import { EditProfileScreen } from "../screens/Profile/EditProfileScreen";

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  AddPet: undefined;
  HealthRecord: { petId: string };
  BookingHistory: undefined;
  Checkout: { total: number };
  BookingSuccess: undefined;
  Cart: undefined;
  ProductDetail: { productId: string };
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="AddPet" component={AddPetScreen} />
      <Stack.Screen name="HealthRecord" component={HealthRecordScreen} />
      <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
