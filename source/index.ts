import { AfterMemory_func } from "./chatroom_funtions";
import * as env from "./.env/env";

//디버그 초기설정
if (localStorage.getItem(env.local_IsDebug) == null){
    localStorage.setItem(env.local_IsDebug,JSON.stringify({
        IsDebug: false
    }))
}

//Gemini api key 스토리지 초기설정
if (localStorage.getItem(env.local_Gemini_api_key) == null){
    localStorage.setItem(env.local_Gemini_api_key,JSON.stringify({
        key : "AIzaSyD5p_Oiva9nIq7e23rk-Zt7vGpDdfkaDVc",
        model : "gemini-2.0-flash",
        limit: 20,
        select: null,
        prompt: null
    }))
}

let lastest = "";
setInterval(()=>{
    if (lastest != document.URL){
        if (document.URL.includes("u")){
            const sidebar = document.getElementsByClassName("css-uxwch2 edj5hvk0").item(0);
            const sidebatList = sidebar.childNodes.item(0);
            const ma = sidebatList.cloneNode(true);
            ma.addEventListener("click",()=>{
                AfterMemory_func();
            });
            ma.childNodes.item(1).textContent = "MemoryAfterburner";
            sidebar.appendChild(ma);
        }
    }
    lastest = document.URL;
})