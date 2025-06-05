import { KeyboardTypeOptions } from "react-native";

export interface MaintenanceCardProps {
  item: any;
}

export interface ExpenseCardHomeProps {
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


export interface GlobalContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  statusUpdate: boolean;
  setStatusUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export interface expense {
  expenseName: string;
  payee: string;
  variable: boolean;
  amount?: number;
  thisMonth: boolean;
}