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
