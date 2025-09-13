'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
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
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  font-family: sans-serif;
  user-select: none;

  .header {
    text-align: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
    font-weight: bold;
    color: #007aff;
  }

  .picker {
    display: flex;
    justify-content: space-around;
    padding: 16px 0;
    height: 150px;
    overflow: hidden;
    position: relative;
  }

  .picker::before,
  .picker::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: #007aff;
  }

  .picker::before {
    top: 50%;
    transform: translateY(-20px);
  }

  .picker::after {
    top: 50%;
    transform: translateY(20px);
  }

  .column {
    flex: 1;
    text-align: center;
    font-size: 18px;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .item {
    height: 40px;
    line-height: 40px;
    scroll-snap-align: center;
    color: #999;
    cursor: pointer;
  }

  .item.disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .item.selected {
    color: #000;
    font-weight: bold;
  }

  .footer {
    display: flex;
    border-top: 1px solid #eee;
  }

  .btn {
    flex: 1;
    padding: 12px;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
  }

  .btn.saveBtn {
    color: #007aff;
    border-left: 1px solid #eee;
  }

  .btn.clearBtn {
    color: #ff3b30;
  }
`;

const MobileDatePicker = ({ value, minYear = 1970, maxYear = new Date().getFullYear(), lang = "en", onChange, onClose, className, isAppearTheDataInTheHeader = true, isAppearClearButton = true, dashOrSlashBetweenTheDate = "/", dateFormat = "YYYY-MM-DD", minDate, maxDate, }) => {
    const initialDate = value || new Date();
    const [year, setYear] = react.useState(initialDate.getFullYear());
    const [month, setMonth] = react.useState(initialDate.getMonth());
    const [day, setDay] = react.useState(initialDate.getDate());
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    const months = getMonths(lang);
    const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
    const dayList = Array.from({ length: daysInMonth(year, month) }, (_, r) => r + 1);
    const isDateAllowed = (y, m, d) => {
        const candidate = new Date(y, m, d);
        if (minDate && candidate < minDate)
            return false;
        if (maxDate && candidate > maxDate)
            return false;
        return true;
    };
    // Check if any day exists in a month
    const isMonthAllowed = (y, m) => {
        const days = daysInMonth(y, m);
        for (let d = 1; d <= days; d++) {
            if (isDateAllowed(y, m, d))
                return true;
        }
        return false;
    };
    // Check if any month exists in a year
    const isYearAllowed = (y) => {
        for (let m = 0; m < 12; m++) {
            if (isMonthAllowed(y, m))
                return true;
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
    return (jsxRuntime.jsxs(MobileDatePickerContainer, { className: className, children: [isAppearTheDataInTheHeader && (jsxRuntime.jsx("div", { className: "header", children: formatDate() })), jsxRuntime.jsxs("div", { className: "picker", children: [jsxRuntime.jsx("div", { className: "column", children: years.map((y) => {
                            const allowed = isYearAllowed(y);
                            return (jsxRuntime.jsx("div", { className: `item ${y === year ? "selected" : ""} ${!allowed ? "disabled" : ""}`, onClick: () => allowed && setYear(y), children: y }, y));
                        }) }), jsxRuntime.jsx("div", { className: "column", children: months.map((m, idx) => {
                            const allowed = isMonthAllowed(year, idx);
                            return (jsxRuntime.jsx("div", { className: `item ${idx === month ? "selected" : ""} ${!allowed ? "disabled" : ""}`, onClick: () => allowed && setMonth(idx), children: m }, m));
                        }) }), jsxRuntime.jsx("div", { className: "column", children: dayList.map((d) => {
                            const allowed = isDateAllowed(year, month, d);
                            return (jsxRuntime.jsx("div", { className: `item ${d === day ? "selected" : ""} ${!allowed ? "disabled" : ""}`, onClick: () => allowed && setDay(d), children: d }, d));
                        }) })] }), jsxRuntime.jsxs("div", { className: "footer", children: [isAppearClearButton && (jsxRuntime.jsx("div", { className: "btn clearBtn", onClick: handleClear, children: lang === "en" ? "Clear" : lang === "ku" ? "پاک کردن" : "حذف" })), jsxRuntime.jsx("div", { className: "btn saveBtn", onClick: handleSave, children: lang === "en" ? "Save" : lang === "ku" ? "ذخیره" : "حفظ" })] })] }));
};

exports.MobileDatePicker = MobileDatePicker;
exports.getMonths = getMonths;
