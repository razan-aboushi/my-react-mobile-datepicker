# my-react-mobile-datepicker

A high-performance, **infinite-scrolling** mobile date picker for React and TypeScript. Designed to mimic the premium, fluid feel of native iOS and Android pickers with zero-lag optimization.

![Mobile Date Picker](https://github.com/razan-aboushi/my-react-mobile-datepicker/blob/main/myDatePicker.png?raw=true)

![Mobile Date Picker](https://github.com/razan-aboushi/my-react-mobile-datepicker/blob/main/datePickerImg.png?raw=true)

The npm package is available at: https://www.npmjs.com/package/my-react-mobile-datepicker
---

## 🚀 Features

* **Infinite Scroll Illusion:** Seamless circular looping for months and days—no more hitting boundaries.
* **Blazing Performance:** Memoized architecture handles thousands of elements at 60fps without UI blocking.
* **Momentum Swiping:** Optimized scroll detection with automatic snapping to the selected value.
* **Full Keyboard Accessibility:** Navigate columns with `Tab` and adjust values with `Arrow Keys`.
* **TypeScript Native:** Built with strictly typed interfaces for a safer developer experience.
* **Multilingual:** Out-of-the-box support for English (`en`), Arabic (`ar`), and Kurdish (`ku`).

---

## Installation

```bash
npm install my-react-mobile-datepicker

```

---

The picker provides a dual-argument `onChange` callback, returning both a standard JS `Date` object (ideal for logic/APIs) and a pre-formatted string (ideal for UI display).

```tsx
import React, { useState } from "react";
import { MobileDatePicker } from "my-react-mobile-datepicker";

const App = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [dateString, setDateString] = useState<string>("");

    const handleDateChange = (dateObj: Date | null, formattedString?: string) => {
        setSelectedDate(dateObj);
        if (formattedString) setDateString(formattedString);

        console.log('Raw Date Object:', dateObj);
        console.log('Formatted Date String:', formattedString);
    };

    return (
        <div>
            <h1>Selected: {dateString || "Please select a date"}</h1>
            <MobileDatePicker
                value={selectedDate}
                minYear={1970}
                maxYear={2050}
                lang="en" // "en" | "ar" | "ku"
                minDate={new Date(2000, 0, 1)}
                maxDate={new Date(2030, 11, 31)}
                onChange={handleDateChange}
                onClose={() => console.log("Picker closed")}
                isAppearTheDataInTheHeader={true}
                dashOrSlashBetweenTheDate="-"
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
| `value` | `Date | string | null` | `new Date()` | Initial selected date. Supports Date objects or ISO strings. |
| `minYear` | `number` | `1970` | The starting year in the scroll list. |
| `maxYear` | `number` | `today + 10` | The ending year in the scroll list. |
| `minDate` | `Date | string` | `undefined` | Disables selection of any date before this value. |
| `maxDate` | `Date | string` | `undefined` | Disables selection of any date after this value. |
| `lang` | `"en" | "ar" | "ku"` | `"en"` | Language for months and button labels. |
| `dateFormat` | `string` | `"YYYY-MM-DD"` | Formats: `YYYY-MM-DD`, `DD/MM/YYYY`, `MM-DD-YYYY`. |
| `dashOrSlash...` | `string` | `"-"` | The character used between date parts in the formatted string. |
| `onChange` | `Function` | `undefined` | Callback returns `(dateObj: Date, formattedStr: string)`. |
| `onClose` | `Function` | `undefined` | Callback fired when the picker is closed or saved. |
| `isAppearClearButton` | `boolean` | `true` | Toggle the "Clear" action button in the footer. |
| `isAppear...Header` | `boolean` | `true` | Toggle the live-updating date preview in the header. |
| `className` | `string` | `undefined` | Add a custom CSS class for external styling. |

---

## ⌨️ Accessibility

Navigate the picker entirely via keyboard:

1. **Tab** into a column (Year, Month, or Day).
2. Use **ArrowUp / ArrowDown** to change the selected value.
3. Press **Enter** to save the selection and trigger `onChange`.

---

## 🎨 Styling & Customization

Target the following classes in your CSS to override the default appearance:

* `.item.selected`: The currently centered item inside the selection border.
* `.item.disabled`: Dates restricted by `minDate` or `maxDate`.
* `.column:focus-visible`: The highlight effect shown during keyboard focus.
* `.saveBtn` / `.clearBtn`: The action buttons in the footer.

---

## Languages Supported

* **English (en):** January → December
* **Arabic (ar):** يناير → ديسمبر
* **Kurdish (ku):** کانوونی دووەم → کانوونی یەکەم

---

## License

MIT © [Razan Aboushi](https://github.com/razan-aboushi)