import styled from "styled-components";

export const MobileDatePickerContainer = styled.div`
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

  .item.disabled {
    color: #ccc;
    cursor: not-allowed;
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
