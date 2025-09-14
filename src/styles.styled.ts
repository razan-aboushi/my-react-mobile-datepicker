import styled from "styled-components";

export const MobileDatePickerContainer = styled.div`
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
    }

    .picker {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 8px;
        height: 200px;
        position: relative;
    }

    .picker::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 40px;
        transform: translateY(-50%);
        border-top: 1px solid #007aff;
        border-bottom: 1px solid #007aff;
        pointer-events: none;
        z-index: 1;
    }

    .column {
        flex: 1;
        text-align: center;
        font-size: 18px;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .column::-webkit-scrollbar {
        display: none;
    }

    .item {
        height: 40px;
        line-height: 40px;
        scroll-snap-align: center;
        color: #b0b0b0;
        cursor: pointer;
        transition: color 0.2s ease, font-size 0.2s ease;
        will-change: transform;
        -webkit-tap-highlight-color: transparent;
    }

    .item.selected {
        color: #000;
        font-weight: 600;
        font-size: 19px;
    }

    .footer {
        display: flex;
        border-top: 1px solid #e0e0e0;
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