import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import { PetProvider } from "./src/context/PetContext";
import { BookingProvider } from "./src/context/BookingContext";
import { CartProvider } from "./src/context/CartContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PetProvider>
          <BookingProvider>
            <CartProvider>
              <NavigationContainer>
                <StatusBar style="dark" />
                <AppNavigator />
              </NavigationContainer>
            </CartProvider>
          </BookingProvider>
        </PetProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
