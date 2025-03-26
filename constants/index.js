import icons from "./icons";

const maintenanceSlips = [
  {
    flat_id: 1,
    flat_number: "SF-1",
    rooms: 2,
    maintenance: 300,
    owner_no: "03001234567",
    owner_name: "Ali",
    slip_no: "123456",
    status: "pending",
  },
  {
    flat_id: 2,
    flat_number: "SF-2",
    rooms: 2,
    maintenance: 300,
    owner_no: "03001234799",
    owner_name: "Ahmed",
    slip_no: "789101",
    status: "pending",
  },
  {
    flat_id: 3,
    flat_number: "SF-3",
    rooms: 2,
    maintenance: 300,
    owner_no: "03001234567",
    owner_name: "Amjad Bawa",
    slip_no: "123456",
    status: "paid",
  },
  {
    flat_id: 4,
    flat_number: "SF-4",
    rooms: 3,
    maintenance: 300,
    owner_no: "03001234567",
    owner_name: "Munaf Bakali",
    slip_no: "123456",
    status: "paid",
  },
  {
    flat_id: 5,
    flat_number: "SF-5",
    rooms: 2,
    maintenance: 300,
    owner_no: "03001234567",
    owner_name: "Rashida",
    slip_no: "123456",
    status: "pending",
  },
  {
    flat_id: 6,
    flat_number: "SF-6",
    rooms: 2,
    maintenance: 300,
    owner_no: "03001234567",
    owner_name: "xyz",
    slip_no: "123456",
    status: "pending",
  },
];

const expenseSlips = [
  {
    expense_id: "1",
    expense: "WaterBoy",
    amount: 3000,
    variable: false,
    status: "pending",
    name: "Malik Zaada",
  },
  {
    expense_id: "2",
    expense: "Sweeper",
    amount: 2200,
    variable: false,
    status: "pending",
    name: "Abdullah",
  },
  {
    expense_id: "3",
    expense: "Electricity Bill",
    variable: true,
    status: "pending",
    name: "K.Electric",
  },
];

const flats = [
  {
    flat_id: "1",
    flat_number: "SF-1",
    rooms: 2,
    owner_name: "Zohra",
    owner_no: "03001234567",
  },
  {
    flat_id: "2",
    flat_number: "SF-2",
    rooms: 2,
    owner_name: "Sohail",
    owner_no: "03001234567",
  },
  {
    flat_id: "3",
    flat_number: "SF-3",
    rooms: 2,
    owner_name: "Amjad Bawa",
    owner_no: "03001234567",
  },
  {
    flat_id: "4",
    flat_number: "SF-4",
    rooms: 3,
    owner_name: "Munaf Bakali",
    owner_no: "03001234567",
  },
  {
    flat_id: "5",
    flat_number: "SF-5",
    rooms: 2,
    owner_name: "Rashida",
    owner_no: "03001234567",
  },
  {
    flat_id: "6",
    flat_number: "SF-6",
    rooms: 2,
    owner_name: "Shumaila",
    owner_no: "03001234567",
  },
  {
    flat_id: "7",
    flat_number: "SF-7",
    rooms: 2,
    owner_name: "Salman Galani",
    owner_no: "03001234567",
  },
  {
    flat_id: "8",
    flat_number: "SF-8",
    rooms: 2,
    owner_name: "Asim Bakali",
    owner_no: "03001234567",
  },
  {
    flat_id: "9",
    flat_number: "SF-9",
    rooms: 3,
    owner_name: "Moin Ibrahim",
    owner_no: "03001234567",
  },
  {
    flat_id: "10",
    flat_number: "SF-10",
    rooms: 2,
    owner_name: "Waseem Haroon",
    owner_no: "03001234567",
  },
  {
    flat_id: "11",
    flat_number: "SF-11 & SF-12",
    rooms: 4,
    owner_name: "Maroof Dadani",
    owner_no: "03001234567",
  },
];

const expenses = [
  {
    expense_id: "1",
    expense: "WaterBoy",
    amount: 3000,
    variable: false,
    thisMonth: false,
    name: "Malik Zaada",
  },
  {
    expense_id: "2",
    expense: "Sweeper",
    amount: 2200,
    variable: false,
    thisMonth: false,
    name: "Abdullah",
  },
  {
    expense_id: "3",
    expense: "Electricity Bill",
    variable: true,
    thisMonth: false,
    name: "K.Electric",
  },
];


export { icons, maintenanceSlips, expenseSlips, flats, expenses };
