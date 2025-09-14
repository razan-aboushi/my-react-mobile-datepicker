# my-react-mobile-datepicker

A simple and customizable **mobile date picker** for React projects with support for multiple languages (`en`, `ar`, `ku`).

![Mobile Date Picker](https://github.com/razan-aboushi/my-react-mobile-datepicker/blob/main/myDatePicker.png?raw=true)

![Mobile Date Picker](https://github.com/razan-aboushi/my-react-mobile-datepicker/blob/main/datePickerImg.png?raw=true)

---
## ✨ Features
- 📱 **Mobile-friendly** and scrollable date picker
- 🌍 Supports **English**, **Arabic**, and **Kurdish** months
- 🎨 Easily customizable via props
- ⚡ Lightweight (React + styled-components only)
- 🚫 Supports disabling specific dates, months, or years with `minDate` and `maxDate`
- 🧹 Optional **Clear button** to reset the selected date

---

## 📦 Installation

Using **npm**:
```bash
npm install my-react-mobile-datepicker
````

Using **yarn**:

```bash
yarn add my-react-mobile-datepicker
```

---

## 🚀 Usage

```tsx
import React, { useState } from "react";
import { MobileDatePicker } from "my-react-mobile-datepicker";

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <h1>Selected Date: {selectedDate?.toDateString()}</h1>
      <MobileDatePicker
        value={selectedDate}
        minYear={1970}
        maxYear={2030}
        lang="en" // also supports "ar" or "ku"
        minDate={new Date(2000, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        onChange={(date) => setSelectedDate(date)}
        onClose={() => console.log("Picker closed")}
        appearTheDataInTheHeader={true}
        dashOrSlashBetweenTheDate="/"
        dateFormat="YYYY-MM-DD"
        isAppearClearButton={true} // 👈 shows the Clear button
      />
    </div>
  );
};

export default App;
```

---

## ⚙️ Props

| Prop                        | Type                                           | Default                    | Description                                                           |
| --------------------------- | ---------------------------------------------- | -------------------------- | --------------------------------------------------------------------- |
| `value`                     | `Date`                                         | `new Date()`               | Currently selected date                                               |
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
| `isAppearClearButton`       | `boolean`                                      | `true`                     | If `true`, shows the **Clear** button to reset the selected date      |

---

## 🛠 Methods

* **Clear selected date** → Click the **Clear** button inside the picker
* **Save selected date** → Click the **Save** button (triggers `onChange`)

---

## 🌍 Languages

Supported month names for the `lang` prop:

* **English:** January → December
* **Arabic:** يناير → ديسمبر
* **Kurdish:** کانونی دووەم → کانونی یەکەم

---

## 🎨 Styling

You can customize the picker using `className` or by overriding the styled-components styles.

Example:

```tsx
<MobileDatePicker className="customDatepicker" />
```

```css
.customDatepicker .item.selected {
  color: red;
  font-weight: bold;
}
```

---

## 📜 License

MIT © [Razan Aboushi](https://github.com/razan-aboushi)