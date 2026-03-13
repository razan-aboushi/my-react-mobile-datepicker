import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import {getMonths, Lang} from "./months";
import { MobileDatePickerContainer } from "./styles.styled";

export interface MobileDatePickerProps {
  value?: Date | string | number | null;
  minYear?: number;
  maxYear?: number;
  lang?: Lang;
  onChange?: (date: Date | null, formattedString?: string) => void;
  onClose?: () => void;
  className?: string;
  isAppearTheDataInTheHeader?: boolean;
  isAppearClearButton?: boolean;
  dashOrSlashBetweenTheDate?: string;
  dateFormat?: string;
  minDate?: Date | string | number;
  maxDate?: Date | string | number;
}

export interface PickerItemProps {
  label: string | number;
  index: number;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: React.Dispatch<React.SetStateAction<number>> | ((index: number) => void);
}

const MULTIPLIER = 40;

const PickerItem = React.memo(({ label, index, isSelected, isDisabled, onSelect }: PickerItemProps) => (
    <div
      className={`item ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
      onClick={() => !isDisabled && onSelect(index)}
    >
      {label}
    </div>
));

PickerItem.displayName = "PickerItem";

  const MobileDatePicker: React.FC<MobileDatePickerProps> = ({
  value,
  minYear = 1970,
  maxYear = new Date().getFullYear() + 10,
  lang = "en",
  onChange,
  onClose,
  className,
  isAppearTheDataInTheHeader = true,
  isAppearClearButton = true,
  dashOrSlashBetweenTheDate = "-",
  dateFormat = "YYYY-MM-DD",
  minDate,
  maxDate,
}) => {
  const initialDate = useMemo(() => {
    const d = value ? new Date(value) : new Date();
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);

  const [year, setYear] = useState<number>(initialDate.getFullYear());
  const [monthIndex, setMonthIndex] = useState<number>(12 * (MULTIPLIER / 2) + initialDate.getMonth());

  const initialMaxDays = useMemo(() => new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 0).getDate(), [initialDate]);
  const [dayIndex, setDayIndex] = useState<number>(initialMaxDays * (MULTIPLIER / 2) + initialDate.getDate() - 1);

  const yearRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevProps = useRef({ year: initialDate.getFullYear(), month: initialDate.getMonth(), day: initialDate.getDate() });

  const realMonth = monthIndex % 12;
  const maxDays = new Date(year, realMonth + 1, 0).getDate();
  const realDay = (dayIndex % maxDays) + 1;

  const years = useMemo(() => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i), [minYear, maxYear]);
  const baseMonths = useMemo(() => getMonths(lang), [lang]);
  const infiniteMonths = useMemo(() => Array.from({ length: 12 * MULTIPLIER }, (_, i) => baseMonths[i % 12]), [baseMonths]);
  const infiniteDays = useMemo(() => Array.from({ length: maxDays * MULTIPLIER }, (_, i) => (i % maxDays) + 1), [maxDays]);

  const parsedMin = useMemo(() => minDate ? new Date(minDate).getTime() : null, [minDate]);
  const parsedMax = useMemo(() => maxDate ? new Date(maxDate).getTime() : null, [maxDate]);

  const isDateAllowed = useCallback((y: number, m: number, d: number) => {
    const time = new Date(y, m, d).getTime();
    if (parsedMin && time < parsedMin) return false;
    if (parsedMax && time > parsedMax) return false;
    return true;
  }, [parsedMin, parsedMax]);

  const formatDate = useCallback(() => {
    const m = String(realMonth + 1).padStart(2, "0");
    const d = String(realDay).padStart(2, "0");

    switch (dateFormat) {
      case "DD/MM/YYYY": return `${d}${dashOrSlashBetweenTheDate}${m}${dashOrSlashBetweenTheDate}${year}`;
      case "MM-DD-YYYY": return `${m}${dashOrSlashBetweenTheDate}${d}${dashOrSlashBetweenTheDate}${year}`;
      default: return `${year}${dashOrSlashBetweenTheDate}${m}${dashOrSlashBetweenTheDate}${d}`;
    }
  }, [realMonth, realDay, year, dateFormat, dashOrSlashBetweenTheDate]);

  const handleSave = () => {
    if (isDateAllowed(year, realMonth, realDay)) {
      onChange?.(new Date(year, realMonth, realDay), formatDate());
      onClose?.();
    }
  };

  const handleClear = () => {
    onChange?.(null);
    onClose?.();
    const today = new Date();
    setYear(today.getFullYear());
    setMonthIndex(12 * (MULTIPLIER / 2) + today.getMonth());
    setDayIndex(new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() * (MULTIPLIER / 2) + today.getDate() - 1);
  };

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>, setIndexFunc: React.Dispatch<React.SetStateAction<number>>, isYear = false) => {
    const target = e.target as HTMLDivElement;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const index = Math.round(target.scrollTop / 40);
      setIndexFunc(isYear ? (years[index] || years[0]) : prev => prev !== index ? index : prev);
    }, 150);
  }, [years]);

  const scrollToSelected = (ref: React.RefObject<HTMLDivElement | null>, selectedIndex: number) => {
    if (ref.current) ref.current.scrollTo({ top: selectedIndex * 40, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, type: "year" | "month" | "day") => {
    if (e.key === "Enter") return handleSave();
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;

    if (type === "year") {
      const nextYear = years[years.indexOf(year) + dir];
      if (nextYear) setYear(nextYear);
    } else if (type === "month") {
      setMonthIndex(prev => prev + dir);
    } else if (type === "day") {
      setDayIndex(prev => prev + dir);
    }
  };

  useEffect(() => {
    const prev = prevProps.current;
    if (prev.year !== year || prev.month !== realMonth) {
      const targetDay = Math.min(prev.day, maxDays);
      setDayIndex(maxDays * (MULTIPLIER / 2) + targetDay - 1);
      prevProps.current = { year, month: realMonth, day: targetDay };
    } else if (prev.day !== realDay) {
      prevProps.current = { year, month: realMonth, day: realDay };
    }
  }, [year, realMonth, realDay, maxDays]);

  useEffect(() => scrollToSelected(yearRef, years.indexOf(year)), [year, years]);
  useEffect(() => scrollToSelected(monthRef, monthIndex), [monthIndex]);
  useEffect(() => scrollToSelected(dayRef, dayIndex), [dayIndex]);

  return (
      <MobileDatePickerContainer id="mobileDatePicker" className={className}>
        {isAppearTheDataInTheHeader && <div className="header">{formatDate()}</div>}

        <div className="picker">
          <div className="column" ref={yearRef} tabIndex={0} onScroll={(e) => handleScroll(e, setYear, true)} onKeyDown={(e) => handleKeyDown(e, "year")}>
            {years.map((y) => (
                <PickerItem key={`year-${y}`} label={y} index={y} isSelected={y === year} isDisabled={false} onSelect={setYear} />
            ))}
          </div>

          <div className="column" ref={monthRef} tabIndex={0} onScroll={(e) => handleScroll(e, setMonthIndex)} onKeyDown={(e) => handleKeyDown(e, "month")}>
            {infiniteMonths.map((m, idx) => (
                <PickerItem key={`month-${idx}`} label={m} index={idx} isSelected={idx === monthIndex} isDisabled={false} onSelect={setMonthIndex} />
            ))}
          </div>

          <div className="column" ref={dayRef} tabIndex={0} onScroll={(e) => handleScroll(e, setDayIndex)} onKeyDown={(e) => handleKeyDown(e, "day")}>
            {infiniteDays.map((d, idx) => (
                <PickerItem key={`day-${idx}`} label={d} index={idx} isSelected={idx === dayIndex} isDisabled={!isDateAllowed(year, realMonth, d)} onSelect={setDayIndex} />
            ))}
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