import { AfterMemory_func } from "./chatroom_funtions";
import * as env from "./.env/env";

let lastest = "";
setInterval(() => {
    if (lastest !== document.URL) {
        if (document.URL.includes("u")) {
            // 사이드바 Element를 가져옴
            const sidebar = document.getElementsByClassName("css-uxwch2 edj5hvk0").item(0) as HTMLElement;

            // 이미 memoryAfterburner가 있는지 확인
            if (!document.getElementById("memoryAfterburner")) {
                const ma = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
                ma.id = "memoryAfterburner";

                // ma 함수 실행
                ma.addEventListener("click", () => {
                AfterMemory_func();
                });
                ma.childNodes.item(1).textContent = "MemoryAfterburner";

                sidebar.appendChild(ma);
            }
        }
    }
    lastest = document.URL;
})

/*
let lastest = "";
setInterval(()=>{
    if(lastest != document.URL){
        if (document.URL.includes("u"))
        {
            const sidebar = document.getElementsByClassName("css-uxwch2 edj5hvk0").item(0);
            const sidebarList = sidebar.childNodes.item(0);
            const ma = sidebarList.cloneNode(true);
            ma.addEventListener("click",()=>{
                AfterMemory_func();
            });
            ma.childNodes.item(1).textContent = "MemoryAfterburner";

            sidebar.appendChild(ma);
        }
    }
    lastest = document.URL;
})
*/




