import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { PetListScreen } from "../screens/Pet/PetListScreen";
import { BookingScreen } from "../screens/Booking/BookingScreen";
import { BookingHistoryScreen } from "../screens/Booking/BookingHistoryScreen";
import { ShopHomeScreen } from "../screens/Shop/ShopHomeScreen";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { useBookings } from "../context/BookingContext";
import { useCart } from "../context/CartContext";
import { colors } from "../components/theme";

export type MainTabParamList = {
  Home: undefined;
  Pets: undefined;
  Booking: undefined;
  Appointments: undefined;
  Shop: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const icons: Record<keyof MainTabParamList, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Home: "home-variant",
  Pets: "paw",
  Booking: "plus-circle",
  Appointments: "calendar-month",
  Shop: "storefront-outline",
  Profile: "account-circle-outline",
};

export function MainTabNavigator() {
  const { bookings } = useBookings();
  const { itemCount } = useCart();
  const upcomingCount = bookings.filter((booking) => booking.status === "upcoming").length;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.teal,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 9, fontWeight: "700", marginBottom: 3 },
        tabBarStyle: { height: 62, paddingTop: 6, borderTopColor: colors.border, backgroundColor: "#fff" },
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
      <Tab.Screen name="Pets" component={PetListScreen} options={{ title: "Thú cưng" }} />
      <Tab.Screen name="Booking" component={BookingScreen} options={{ title: "Đặt lịch" }} />
      <Tab.Screen name="Appointments" component={BookingHistoryScreen} options={{ title: "Lịch hẹn", tabBarBadge: upcomingCount || undefined, tabBarBadgeStyle: { backgroundColor: colors.orange, fontSize: 9 } }} />
      <Tab.Screen name="Shop" component={ShopHomeScreen} options={{ title: "Cửa hàng", tabBarBadge: itemCount || undefined, tabBarBadgeStyle: { backgroundColor: colors.orange, fontSize: 9 } }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Tài khoản" }} />
    </Tab.Navigator>
  );
}
