import { AfterMemory_func, openPersonaMenu } from "./chatroom_funtions";
import { createInterval, setStrict } from "./strict";
import { chatroom_menus_class, dropdown_class, feed_class } from "./class/class";
import * as interfaces from "./interface/interfaces";
import * as env from "./.env/env";

let lastest = "";
createInterval(setStrict((clear)=>{
    if (lastest !== document.URL) {
        if (document.URL.includes("u")) {
            // 사이드바 Element를 가져옴
            const sidebar = document.getElementsByClassName("css-uxwch2 edj5hvk0").item(0) as HTMLElement;

            // 이미 memoryAfterburner가 있는지 확인
            if (!document.getElementById("memoryAfterburner")) {
                const ma = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
                ma.id = "memoryAfterburner";

                //ma 함수 실행
                ma.childNodes.item(1).textContent = "MemoryAfterburner";
                ma.addEventListener("click", setStrict(() => AfterMemory_func()));
                
                sidebar.appendChild(ma);
            }

            // 이미 페르소나가 있는지 확인
            if (!document.getElementById("personaPanel")) {
                const pe = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
                pe.id = "personaPanel";
                
    
                //pe 함수 실행
                pe.childNodes.item(1).textContent = "페르소나";
                pe.addEventListener("click", setStrict(() => openPersonaMenu(pe)));
                
                sidebar.appendChild(pe);
            }
        }
    }
    lastest = document.URL;
}))

//퍼블리시
/*
createInterval(setStrict((clear)=>{
    if (lastest !== document.URL) {
        if (document.URL.includes("my")) {
            
        }
    }
    lastest = document.URL;
}))
*/