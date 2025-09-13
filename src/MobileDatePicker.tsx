import React, { FC, useState } from "react";
import { getMonths } from "./months";
import { MobileDatePickerContainer } from "./styles.styled";

type Props = {
  value?: Date;
  minYear?: number;
  maxYear?: number;
  lang?: "en" | "ar" | "ku";
  onChange?: (date: Date | null) => void;
  onClose?: () => void;
  className?: string;
};

const MobileDatePicker: FC<Props> = ({
  value,
  minYear = 1970,
  maxYear = new Date().getFullYear(),
  lang = "en",
  onChange,
  onClose,
  className,
}) => {
  // If value is null or undefined, fallback to today
  const initialDate = value || new Date();

  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [day, setDay] = useState(initialDate.getDate());

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  );

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayList = Array.from({ length: daysInMonth }, (_, r) => r + 1);
  const months = getMonths(lang);

  const handleSave = () => {
    const d = new Date(year, month, day);
    onChange?.(d);
    onClose?.();
  };

  const handleClear = () => {
    onChange?.(null);
    onClose?.();
    // Reset to today after clearing
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setDay(today.getDate());
  };

  return (
    <MobileDatePickerContainer className={className}>
      <div className="header">
        {year}/{month + 1}/{day}
      </div>

      <div className="picker">
        {/* Year */}
        <div className="column">
          {years.map((y) => (
            <div
              key={y}
              className={`item ${y === year ? "selected" : ""}`}
              onClick={() => setYear(y)}
            >
              {y}
            </div>
          ))}
        </div>

        {/* Month */}
        <div className="column">
          {months.map((m, idx) => (
            <div
              key={m}
              className={`item ${idx === month ? "selected" : ""}`}
              onClick={() => setMonth(idx)}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Day */}
        <div className="column">
          {dayList.map((d) => (
            <div
              key={d}
              className={`item ${d === day ? "selected" : ""}`}
              onClick={() => setDay(d)}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="btn clearBtn" onClick={handleClear}>
          {lang === "en" ? "Clear" : lang === "ku" ? "پاک کردن" : "حذف"}
        </div>
        <div className="btn saveBtn" onClick={handleSave}>
          {lang === "en" ? "Save" : lang === "ku" ? "ذخیره" : "حفظ"}
        </div>
      </div>
    </MobileDatePickerContainer>
  );
};

export default MobileDatePicker;
