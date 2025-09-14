import React, { FC, useRef, useState, useEffect } from "react";
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
  isAppearTheDataInTheHeader?: boolean;
  dashOrSlashBetweenTheDate?: string;
  dateFormat?: "YYYY-MM-DD" | "DD/MM/YYYY" | "MM-DD-YYYY";
  minDate?: Date;
  maxDate?: Date;
  isAppearClearButton?: boolean;
};

const MobileDatePicker: FC<Props> = ({
  value,
  minYear = 1970,
  maxYear = new Date().getFullYear(),
  lang = "en",
  onChange,
  onClose,
  className,
  isAppearTheDataInTheHeader = true,
  isAppearClearButton = true,
  dashOrSlashBetweenTheDate = "/",
  dateFormat = "YYYY-MM-DD",
  minDate,
  maxDate,
}) => {
  const initialDate = value || new Date();
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [day, setDay] = useState(initialDate.getDate());
  const yearRef = useRef<HTMLDivElement | null>(null);
  const monthRef = useRef<HTMLDivElement | null>(null);
  const dayRef = useRef<HTMLDivElement | null>(null);

  const scrollToSelected = (
    ref: React.RefObject<HTMLDivElement | null>,
    selectedIndex: number,
  ) => {
    if (!ref.current) return;
    const itemHeight = 40;
    const pickerHeight = 200;
    const offset = pickerHeight / 2 - itemHeight / 2;
    ref.current.scrollTo({
      top: selectedIndex * itemHeight - offset,
      behavior: "smooth",
    });
  };

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  );
  const months = getMonths(lang);

  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const dayList = Array.from(
    { length: daysInMonth(year, month) },
    (_, r) => r + 1,
  );

  const isDateAllowed = (y: number, m: number, d: number) => {
    const candidate = new Date(y, m, d);
    if (minDate && candidate < minDate) return false;
    if (maxDate && candidate > maxDate) return false;
    return true;
  };

  // Check if any day exists in a month
  const isMonthAllowed = (y: number, m: number) => {
    const days = daysInMonth(y, m);
    for (let d = 1; d <= days; d++) {
      if (isDateAllowed(y, m, d)) return true;
    }
    return false;
  };

  // Check if any month exists in a year
  const isYearAllowed = (y: number) => {
    for (let m = 0; m < 12; m++) {
      if (isMonthAllowed(y, m)) return true;
    }
    return false;
  };

  const formatDate = () => {
    switch (dateFormat) {
      case "DD/MM/YYYY":
        return `${day}${dashOrSlashBetweenTheDate}${month + 1}${dashOrSlashBetweenTheDate}${year}`;
      case "MM-DD-YYYY":
        return `${month + 1}${dashOrSlashBetweenTheDate}${day}${dashOrSlashBetweenTheDate}${year}`;
      default:
        return `${year}${dashOrSlashBetweenTheDate}${month + 1}${dashOrSlashBetweenTheDate}${day}`;
    }
  };

  const handleSave = () => {
    const d = new Date(year, month, day);
    if (isDateAllowed(year, month, day)) {
      onChange?.(d);
      onClose?.();
    }
  };

  const handleClear = () => {
    onChange?.(null);
    onClose?.();
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setDay(today.getDate());
  };

  useEffect(() => {
    scrollToSelected(yearRef, years.indexOf(year));
  }, [year]);

  useEffect(() => {
    scrollToSelected(monthRef, month);
  }, [month]);

  useEffect(() => {
    scrollToSelected(dayRef, day - 1);
  }, [day]);

  return (
    <MobileDatePickerContainer id="mobileDatePicker" className={className}>
      {isAppearTheDataInTheHeader && (
        <div className="header">{formatDate()}</div>
      )}

      <div className="picker">
        <div className="column" ref={yearRef}>
          {years.map((y) => {
            const allowed = isYearAllowed(y);
            return (
              <div
                key={y}
                className={`item ${y === year ? "selected" : ""} ${!allowed ? "disabled" : ""}`}
                onClick={() => allowed && setYear(y)}
              >
                {y}
              </div>
            );
          })}
        </div>

        <div className="column" ref={monthRef}>
          {months.map((m, idx) => {
            const allowed = isMonthAllowed(year, idx);
            return (
              <div
                key={m}
                className={`item ${idx === month ? "selected" : ""} ${!allowed ? "disabled" : ""}`}
                onClick={() => allowed && setMonth(idx)}
              >
                {m}
              </div>
            );
          })}
        </div>

        <div className="column" ref={dayRef}>
          {dayList.map((d) => {
            const allowed = isDateAllowed(year, month, d);
            return (
              <div
                key={d}
                className={`item ${d === day ? "selected" : ""} ${!allowed ? "disabled" : ""}`}
                onClick={() => allowed && setDay(d)}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer">
        {isAppearClearButton && (
          <div className="btn clearBtn" onClick={handleClear}>
            {lang === "en" ? "Clear" : lang === "ku" ? "پاک کردن" : "حذف"}
          </div>
        )}
        <div className="btn saveBtn" onClick={handleSave}>
          {lang === "en" ? "Save" : lang === "ku" ? "ذخیره" : "حفظ"}
        </div>
      </div>
    </MobileDatePickerContainer>
  );
};

export default MobileDatePicker;
