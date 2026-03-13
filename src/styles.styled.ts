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