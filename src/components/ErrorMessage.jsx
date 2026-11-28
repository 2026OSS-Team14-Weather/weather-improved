import React from "react";
import "./ErrorMessage.css";

const messages = {
    "401" : {
        icon : "🗝️",
        title : "날씨 정보를 가져올 수 없습니다.",
        desc : "API 키 설정을 확인하거나 새로 발급한 경우 1~2시간 후 다시 시도해주세요."
    },
    "404" : {
        icon : "🔍",
        title : "도시를 찾을 수 없습니다.",
        desc : "도시 이름을 확인하고 다시 검색하세요."
    },
    default : {
        icon : "❓",
        title : "알 수 없는 오류가 발생했습니다.",
        desc : "잠시 후 다시 시도해주세요."
    }
}

const ErrorMessage = ({error}) => {
    if(!error) return;
    const msg = messages[error] || messages.default;
    return (
        <div className = "error-box">
            <div className = "error-icon">{msg.icon}</div>
            <div className = "error-title">{msg.title}</div>
            <div className = "error-desc">{msg.desc}</div>
            <div className = "error-plus">오류 유형 : {error}</div>
        </div>
    )
}

export default ErrorMessage;