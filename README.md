# my-react-mobile-datepicker

A simple and customizable **mobile date picker** for React projects with support for multiple languages (`en`, `ar`, `ku`).

---

## Features
* Mobile-friendly and scrollable date picker
* Supports **English**, **Arabic**, and **Kurdish** months
* Easily customizable via props
* Lightweight and less number of dependencies (as React and styled-components)

---

## Installation

```bash
npm install my-react-mobile-datepicker
```

or with yarn:

```bash
yarn add my-react-mobile-datepicker
```

---

## Usage

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
        maxYear={2030 || new Date().getFullYear()}
        lang="en" // "ar" or "ku"
        onChange={(date) => setSelectedDate(date)}
        onClose={() => console.log("Picker closed")}
      />
    </div>
  );
};

export default App;
```

---

## Props

| Prop        | Type                           | Default                    | Description                       |
| ----------- | ------------------------------ | -------------------------- | --------------------------------- |
| `value`     | `Date`                         | `new Date()`               | Initial selected date             |
| `minYear`   | `number`                       | `1970`                     | Minimum selectable year           |
| `maxYear`   | `number`                       | `new Date().getFullYear()` | Maximum selectable year           |
| `lang`      | `"en" \| "ar" \| "ku"`         | `"en"`                     | Language for months               |
| `onChange`  | `(date: Date \| null) => void` | `undefined`                | Callback fired on date selection  |
| `onClose`   | `() => void`                   | `undefined`                | Callback fired when picker closes |
| `className` | `string`                       | `undefined`                | Add custom CSS class for styling  |

---

## Methods

* **Clear selected date**: Click the **Clear** button inside the picker
* **Save selected date**: Click the **Save** button to trigger `onChange`

---

## Languages

Supported months for `lang` prop:

* **English:** January → December
* **Arabic:** يناير → ديسمبر
* **Kurdish:** کانونی دووەم → کانونی یەکەم

---

## Styling

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

## License

MIT © [Razan Aboushi](https://github.com/razan-aboushi)
