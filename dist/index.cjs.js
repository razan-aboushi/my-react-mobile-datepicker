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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

  .item.selected {
    color: #000;
    font-weight: bold;
    border-top: 1px solid #007aff;
    border-bottom: 1px solid #007aff;
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

const MobileDatePicker = ({ value, minYear = 1970, maxYear = new Date().getFullYear(), lang = "en", onChange, onClose, className, }) => {
    // If value is null or undefined, fallback to today
    const initialDate = value || new Date();
    const [year, setYear] = react.useState(initialDate.getFullYear());
    const [month, setMonth] = react.useState(initialDate.getMonth());
    const [day, setDay] = react.useState(initialDate.getDate());
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
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
    return (jsxRuntime.jsxs(MobileDatePickerContainer, { className: className, children: [jsxRuntime.jsxs("div", { className: "header", children: [year, "/", month + 1, "/", day] }), jsxRuntime.jsxs("div", { className: "picker", children: [jsxRuntime.jsx("div", { className: "column", children: years.map((y) => (jsxRuntime.jsx("div", { className: `item ${y === year ? "selected" : ""}`, onClick: () => setYear(y), children: y }, y))) }), jsxRuntime.jsx("div", { className: "column", children: months.map((m, idx) => (jsxRuntime.jsx("div", { className: `item ${idx === month ? "selected" : ""}`, onClick: () => setMonth(idx), children: m }, m))) }), jsxRuntime.jsx("div", { className: "column", children: dayList.map((d) => (jsxRuntime.jsx("div", { className: `item ${d === day ? "selected" : ""}`, onClick: () => setDay(d), children: d }, d))) })] }), jsxRuntime.jsxs("div", { className: "footer", children: [jsxRuntime.jsx("div", { className: "btn clearBtn", onClick: handleClear, children: lang === "en" ? "Clear" : lang === "ku" ? "پاک کردن" : "حذف" }), jsxRuntime.jsx("div", { className: "btn saveBtn", onClick: handleSave, children: lang === "en" ? "Save" : lang === "ku" ? "ذخیره" : "حفظ" })] })] }));
};

exports.MobileDatePicker = MobileDatePicker;
exports.getMonths = getMonths;
