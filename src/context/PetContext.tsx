import React, { createContext, useContext, useMemo, useState } from "react";
import { mockPets } from "../assets/mockData";
import { HealthRecord, Pet } from "../types";

interface PetContextValue {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (petId: string) => void;
  addHealthRecord: (petId: string, record: HealthRecord) => void;
}

const PetContext = createContext<PetContextValue | undefined>(undefined);

export function PetProvider({ children }: React.PropsWithChildren) {
  const [pets, setPets] = useState(mockPets);
  const value = useMemo(
    () => ({
      pets,
      addPet: (pet: Pet) => setPets((previous) => [pet, ...previous]),
      updatePet: (pet: Pet) => setPets((previous) => previous.map((item) => item.id === pet.id ? pet : item)),
      deletePet: (petId: string) => setPets((previous) => previous.filter((pet) => pet.id !== petId)),
      addHealthRecord: (petId: string, record: HealthRecord) =>
        setPets((previous) => previous.map((pet) => pet.id === petId
          ? { ...pet, healthRecords: [record, ...pet.healthRecords] }
          : pet)),
    }),
    [pets],
  );
  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePets() {
  const context = useContext(PetContext);
  if (!context) throw new Error("usePets phải được dùng bên trong PetProvider");
  return context;
}
