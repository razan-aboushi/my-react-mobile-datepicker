# my-react-mobile-datepicker

A high-performance, **infinite-scrolling** mobile date picker for React and TypeScript. Designed to mimic the premium, fluid feel of native iOS and Android pickers with zero-lag optimization.

![Mobile Date Picker](https://github.com/razan-aboushi/my-react-mobile-datepicker/blob/main/myDatePicker.png?raw=true)

![Mobile Date Picker](https://github.com/razan-aboushi/my-react-mobile-datepicker/blob/main/datePickerImg.png?raw=true)

---

## 🚀 Features

* **Infinite Scroll Illusion:** Seamless looping for months and days—no more hitting boundaries.
* **Blazing Performance:** Memoized architecture handles thousands of elements at 60fps.
* **Momentum Swiping:** Supports touch gestures with automatic snapping to the selected value.
* **Full Keyboard Accessibility:** Navigate columns with `Tab` and adjust values with `Arrow Keys`.
* **TypeScript Native:** Built with strictly typed interfaces for a better developer experience.
* **Multilingual:** Out-of-the-box support for English (`en`), Arabic (`ar`), and Kurdish (`ku`).

---

## Installation

```bash
npm install my-react-mobile-datepicker
```

```

---

The picker provides a dual-argument `onChange` callback, returning both a standard JS `Date` object and a pre-formatted string based on your settings.

import React, { useState } from "react";
import { MobileDatePicker } from "my-react-mobile-datepicker";

const App = () => {
     const [selectedDate, setSelectedDate] = useState(null);

   const handleDateChange = (dateObj, formattedString) => {
        console.log('Final Formatted Date:', formattedString); 
        console.log('Raw Date Object:', dateObj);
        setSelectedDate(dateObj); 
    };


  return (
   <div>
      <MobileDatePicker
        value={selectedDate}
        minYear={1970}
        maxYear={2030}
        lang="en"
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        onChange={(date) => setSelectedDate(date)}
        onClose={() => console.log("Picker closed")}
        appearTheDataInTheHeader={true}
        dashOrSlashBetweenTheDate="/"
        dateFormat="YYYY-MM-DD"
      />
    </div>
  );
};

export default App;

```

---

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date | string | null` | `new Date()` | Initial date. Supports Date objects or ISO strings. |
| `lang` | `"en" | "ar" | "ku"` | `"en"` | Language for months and button labels. |
| `minYear` | `number` | `1970` | The starting year in the scroll list. |
| `maxYear` | `number` | `today + 10` | The ending year in the scroll list. |
| `minDate` | `Date | string` | `undefined` | Restricts selection to dates after this value. |
| `maxDate` | `Date | string` | `undefined` | Restricts selection to dates before this value. |
| `dateFormat` | `string` | `"YYYY-MM-DD"` | Formats: `YYYY-MM-DD`, `DD/MM/YYYY`, `MM-DD-YYYY`. |
| `dashOrSlash...` | `string` | `"-"` | Separator for the header and returned string. |
| `onChange` | `function` | `undefined` | Fired on save. Returns `(dateObj, formattedStr)`. |
| `isAppearClearButton` | `boolean` | `true` | Toggle the "Clear" action button. |
| `isAppear...Header` | `boolean` | `true` | Toggle the live date preview at the top. |
| Prop                        | Type                                           | Default                    | Description                                                           |
| --------------------------- | ---------------------------------------------- | -------------------------- | --------------------------------------------------------------------- |
| `value`                     | `Date`                                         | `new Date()`               | Initial selected date                                                 |
| `minYear`                   | `number`                                       | `1970`                     | Minimum selectable year                                               |
| `maxYear`                   | `number`                                       | `new Date().getFullYear()` | Maximum selectable year                                               |
| `minDate`                   | `Date`                                         | `undefined`                | Minimum selectable date (disables earlier dates, months, and years)   |
| `maxDate`                   | `Date`                                         | `undefined`                | Maximum selectable date (disables later dates, months, and years)     |
| `lang`                      | `"en" \| "ar" \| "ku"`                         | `"en"`                     | Language for month names                                              |
| `dateFormat`                | `"YYYY-MM-DD" \| "DD/MM/YYYY" \| "MM-DD-YYYY"` | `"YYYY-MM-DD"`             | Format of the date displayed in the header                            |
| `dashOrSlashBetweenTheDate` | `string`                                       | `"/"`                      | Character to use between date parts in the formatted date             |
| `onChange`                  | `(date: Date \| null) => void`                 | `undefined`                | Callback fired when a date is selected                                |
| `onClose`                   | `() => void`                                   | `undefined`                | Callback fired when the picker closes                                 |
| `className`                 | `string`                                       | `undefined`                | Add a custom CSS class for styling                                    |
| `appearTheDataInTheHeader`  | `boolean`                                      | `true`                     | If `true`, displays the formatted date in the header above the picker |

---

## ⌨️ Accessibility

This picker is built for everyone. When a column is focused via keyboard:

* **ArrowUp / ArrowDown**: Changes the selected value.
* **Enter**: Saves the selection and triggers `onChange`.
* **Tab**: Moves focus between Year, Month, and Day columns.

---

## 🎨 Styling & Customization

Target the following classes to override the default look:

* `.item.selected`: The currently centered item in the blue border.
* `.item.disabled`: Dates restricted by `minDate` or `maxDate`.
* `.column:focus-visible`: Highlight shown during keyboard navigation.
* `.saveBtn` / `.clearBtn`: Action buttons in the footer.

---

## Languages Supported

* **English (en):** January ... December
* **Arabic (ar):** يناير ... ديسمبر
* **Kurdish (ku):** کانوونی دووەم ... کانوونی یەکەم

---

## License

MIT © [Razan Aboushi](https://github.com/razan-aboushi)
