import React, { useMemo, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import apartments from "./assets/data/appartments.json";
import CustomMarker from "./components/CustomMarker";
import AppartmentListItem from "./components/ApartmentListItem";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Apartment = (typeof apartments)[0];

export default function App() {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  const [mapRegion, setMapRegion] = useState({
    latitude: 15.974631,
    longitude: 108.252293,
    latitudeDelta: 0.0482,
    longitudeDelta: 0.0221,
  });
  const snapPoints = useMemo(() => [70, "50%", "90%"], []);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          // initialRegion={mapRegion}
          region={mapRegion}
        >
          {apartments.map((apartment) => (
            <CustomMarker
              key={apartment.id}
              apartment={apartment}
              onPress={() => setSelectedApartment(apartment)}
            />
          ))}
        </MapView>
        {selectedApartment && (
          <AppartmentListItem
            apartment={selectedApartment}
            containerStyle={styles.selectedContainer}
          />
        )}
        <BottomSheet index={0} snapPoints={snapPoints}>
          <View style={{ flex: 1 }}>
            <Text style={styles.listTitle}>Hơn {apartments.length} chỗ ở</Text>

            <BottomSheetFlatList
              data={apartments}
              contentContainerStyle={{ gap: 10, padding: 10 }}
              renderItem={({ item }) => <AppartmentListItem apartment={item} />}
            />
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  listTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
  selectedContainer: {
    position: "absolute",
    bottom: 90,
    right: 5,
    left: 5,
  },
});
