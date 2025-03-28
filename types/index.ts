import { KeyboardTypeOptions } from "react-native";

export interface MaintenanceCardProps {
  item: any;
  onRefresh: () => void;
}

export interface ExpenseCardHomeProps {
  onRefresh: () => void;
  item: any;
}

export interface FlatCardProps {
  item: any;
}

export interface ExpenseCardProps {
  item: any;
}

export interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  textStyles?: string;
  containerStyles?: string;
  loader?: boolean;
  width?: string;
}

export interface CustomBottomSheetModalProps {
  children: React.ReactNode;
}

export interface FormFieldProps {
  title?: string;
  keypad?: KeyboardTypeOptions;
  labelStyle?: string;
  inputStyles?: string;
  value: string;
  handleChange?: (e: any) => void;
}

export interface ProgressSummaryProps {
  title: string;
  progress: number;
}

export interface StatsData {
  amount: number;
  maintenanceReceived: number;
  expensesCleared: number;
}

export interface GlobalContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface GlobalContextProviderProps {
  children: React.ReactNode;
}
