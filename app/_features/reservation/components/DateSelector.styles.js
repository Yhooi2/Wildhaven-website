// DateSelector Styles - Colocation approach
export const DAY_PICKER_CLASS_NAMES = {
  day: "text-center text-primary-100",
  day_button:
    "hover:bg-accent-600 hover:rounded-full hover:text-primary-800 text-primary-200 w-8 h-8",
  selected: "bg-accent-500 rounded-full text-primary-800",
  disabled: "text-accent-600 opacity-50 cursor-not-allowed",
  month_caption: "font-bold text-lg text-primary-100 text-center mb-3",
  month_grid: "",
  chevron: "fill-primary-100",
  root: "flex flex-col lg:flex-row min-w-max",
  months: "flex flex-col lg:flex-row gap-2",
};

export const MODIFIERS_CLASS_NAMES = {
  booked:
    "!bg-red-500/20 !text-red-300 rounded-full line-through cursor-not-allowed",
  range_start:
    "!bg-accent-500 !text-primary-800 !rounded-l-full !rounded-r-none hover:!text-primary-800 focus:!text-primary-800",
  range_end:
    "!bg-accent-500 !text-primary-800 !rounded-r-full !rounded-l-none hover:!text-primary-800 focus:!text-primary-800",
  range_middle:
    "!bg-accent-500 !text-primary-800 !rounded-none hover:!text-primary-800 focus:!text-primary-800",
};
