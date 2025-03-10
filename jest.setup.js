import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// Mock AsyncStorage for Jest
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
