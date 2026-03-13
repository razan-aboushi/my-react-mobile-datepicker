'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var styled = require('styled-components');

const monthsMap = {
    en: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    ar: [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ],
    ku: [
        "کانونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران",
        "تەمموز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم"
    ],
};
const getMonths = (lang = "en") => {
    return monthsMap[lang] || monthsMap["en"];
};

const MobileDatePickerContainer = styled.div `
    width: 100%;
    max-width: 320px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    user-select: none;
    overflow: hidden;

    .header {
        text-align: center;
        padding: 16px;
        border-bottom: 1px solid #e0e0e0;
        font-weight: 600;
        color: #007aff;
        font-size: 16px;
        background: #fff;
        position: relative;
        z-index: 10;
    }

    .picker {
        display: flex;
        justify-content: space-between;
        height: 200px;
        position: relative;
        overflow: hidden;
        background: #fff;
        mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
    }

    .picker::before {
        content: '';
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        height: 40px;
        border-top: 1px solid #007aff;
        border-bottom: 1px solid #007aff;
        pointer-events: none;
        z-index: 2;
    }

    .column {
        flex: 1;
        text-align: center;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        -ms-overflow-style: none;
        scrollbar-width: none;
        outline: none;
    }

    .column::before,
    .column::after {
        content: '';
        display: block;
        height: 80px;
        flex-shrink: 0;
    }

    .column::-webkit-scrollbar {
        display: none;
    }

    .item {
        height: 40px;
        line-height: 40px;
        scroll-snap-align: center;
        color: #b0b0b0;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        -webkit-tap-highlight-color: transparent;
    }

    .item.selected {
        color: #007aff;
        font-weight: 700;
        font-size: 18px;
        transform: scale(1.05);
    }

    .item.disabled {
        opacity: 0.2;
        pointer-events: none;
    }

    .footer {
        display: flex;
        border-top: 1px solid #e0e0e0;
        background: #fff;
        position: relative;
        z-index: 10;
    }

    .btn {
        flex: 1;
        padding: 14px;
        text-align: center;
        cursor: pointer;
        font-weight: 600;
        font-size: 16px;
        transition: background-color 0.2s ease;
    }

    .btn:active {
        background-color: #f0f0f0;
    }

    .btn.saveBtn {
        color: #007aff;
        border-left: 1px solid #e0e0e0;
    }

    .btn.clearBtn {
        color: #ff3b30;
    }
`;

const MULTIPLIER = 40;
const PickerItem = React.memo(({ label, index, isSelected, isDisabled, onSelect }) => (jsxRuntime.jsx("div", { className: `item ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`, onClick: () => !isDisabled && onSelect(index), children: label })));
PickerItem.displayName = "PickerItem";
const MobileDatePicker = ({ value, minYear = 1970, maxYear = new Date().getFullYear() + 10, lang = "en", onChange, onClose, className, isAppearTheDataInTheHeader = true, isAppearClearButton = true, dashOrSlashBetweenTheDate = "-", dateFormat = "YYYY-MM-DD", minDate, maxDate, }) => {
    const initialDate = React.useMemo(() => {
        const d = value ? new Date(value) : new Date();
        return isNaN(d.getTime()) ? new Date() : d;
    }, [value]);
    const [year, setYear] = React.useState(initialDate.getFullYear());
    const [monthIndex, setMonthIndex] = React.useState(12 * (MULTIPLIER / 2) + initialDate.getMonth());
    const initialMaxDays = React.useMemo(() => new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 0).getDate(), [initialDate]);
    const [dayIndex, setDayIndex] = React.useState(initialMaxDays * (MULTIPLIER / 2) + initialDate.getDate() - 1);
    const yearRef = React.useRef(null);
    const monthRef = React.useRef(null);
    const dayRef = React.useRef(null);
    const scrollTimeout = React.useRef(null);
    const prevProps = React.useRef({ year: initialDate.getFullYear(), month: initialDate.getMonth(), day: initialDate.getDate() });
    const realMonth = monthIndex % 12;
    const maxDays = new Date(year, realMonth + 1, 0).getDate();
    const realDay = (dayIndex % maxDays) + 1;
    const years = React.useMemo(() => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i), [minYear, maxYear]);
    const baseMonths = React.useMemo(() => getMonths(lang), [lang]);
    const infiniteMonths = React.useMemo(() => Array.from({ length: 12 * MULTIPLIER }, (_, i) => baseMonths[i % 12]), [baseMonths]);
    const infiniteDays = React.useMemo(() => Array.from({ length: maxDays * MULTIPLIER }, (_, i) => (i % maxDays) + 1), [maxDays]);
    const parsedMin = React.useMemo(() => minDate ? new Date(minDate).getTime() : null, [minDate]);
    const parsedMax = React.useMemo(() => maxDate ? new Date(maxDate).getTime() : null, [maxDate]);
    const isDateAllowed = React.useCallback((y, m, d) => {
        const time = new Date(y, m, d).getTime();
        if (parsedMin && time < parsedMin)
            return false;
        if (parsedMax && time > parsedMax)
            return false;
        return true;
    }, [parsedMin, parsedMax]);
    const formatDate = React.useCallback(() => {
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
    const handleScroll = React.useCallback((e, setIndexFunc, isYear = false) => {
        const target = e.target;
        if (scrollTimeout.current)
            clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            const index = Math.round(target.scrollTop / 40);
            setIndexFunc(isYear ? (years[index] || years[0]) : prev => prev !== index ? index : prev);
        }, 150);
    }, [years]);
    const scrollToSelected = (ref, selectedIndex) => {
        if (ref.current)
            ref.current.scrollTo({ top: selectedIndex * 40, behavior: "smooth" });
    };
    const handleKeyDown = (e, type) => {
        if (e.key === "Enter")
            return handleSave();
        if (e.key !== "ArrowUp" && e.key !== "ArrowDown")
            return;
        e.preventDefault();
        const dir = e.key === "ArrowDown" ? 1 : -1;
        if (type === "year") {
            const nextYear = years[years.indexOf(year) + dir];
            if (nextYear)
                setYear(nextYear);
        }
        else if (type === "month") {
            setMonthIndex(prev => prev + dir);
        }
        else if (type === "day") {
            setDayIndex(prev => prev + dir);
        }
    };
    React.useEffect(() => {
        const prev = prevProps.current;
        if (prev.year !== year || prev.month !== realMonth) {
            const targetDay = Math.min(prev.day, maxDays);
            setDayIndex(maxDays * (MULTIPLIER / 2) + targetDay - 1);
            prevProps.current = { year, month: realMonth, day: targetDay };
        }
        else if (prev.day !== realDay) {
            prevProps.current = { year, month: realMonth, day: realDay };
        }
    }, [year, realMonth, realDay, maxDays]);
    React.useEffect(() => scrollToSelected(yearRef, years.indexOf(year)), [year, years]);
    React.useEffect(() => scrollToSelected(monthRef, monthIndex), [monthIndex]);
    React.useEffect(() => scrollToSelected(dayRef, dayIndex), [dayIndex]);
    return (jsxRuntime.jsxs(MobileDatePickerContainer, { id: "mobileDatePicker", className: className, children: [isAppearTheDataInTheHeader && jsxRuntime.jsx("div", { className: "header", children: formatDate() }), jsxRuntime.jsxs("div", { className: "picker", children: [jsxRuntime.jsx("div", { className: "column", ref: yearRef, tabIndex: 0, onScroll: (e) => handleScroll(e, setYear, true), onKeyDown: (e) => handleKeyDown(e, "year"), children: years.map((y) => (jsxRuntime.jsx(PickerItem, { label: y, index: y, isSelected: y === year, isDisabled: false, onSelect: setYear }, `year-${y}`))) }), jsxRuntime.jsx("div", { className: "column", ref: monthRef, tabIndex: 0, onScroll: (e) => handleScroll(e, setMonthIndex), onKeyDown: (e) => handleKeyDown(e, "month"), children: infiniteMonths.map((m, idx) => (jsxRuntime.jsx(PickerItem, { label: m, index: idx, isSelected: idx === monthIndex, isDisabled: false, onSelect: setMonthIndex }, `month-${idx}`))) }), jsxRuntime.jsx("div", { className: "column", ref: dayRef, tabIndex: 0, onScroll: (e) => handleScroll(e, setDayIndex), onKeyDown: (e) => handleKeyDown(e, "day"), children: infiniteDays.map((d, idx) => (jsxRuntime.jsx(PickerItem, { label: d, index: idx, isSelected: idx === dayIndex, isDisabled: !isDateAllowed(year, realMonth, d), onSelect: setDayIndex }, `day-${idx}`))) })] }), jsxRuntime.jsxs("div", { className: "footer", children: [isAppearClearButton && (jsxRuntime.jsx("div", { className: "btn clearBtn", onClick: handleClear, children: lang === "en" ? "Clear" : lang === "ku" ? "پاک کردن" : "حذف" })), jsxRuntime.jsx("div", { className: "btn saveBtn", onClick: handleSave, children: lang === "en" ? "Save" : lang === "ku" ? "ذخیره" : "حفظ" })] })] }));
};

exports.MobileDatePicker = MobileDatePicker;
exports.getMonths = getMonths;
