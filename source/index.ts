import { AfterMemory_func, persona_change } from "./chatroom_funtions";
import { createInterval, setStrict } from "./strict";
import { chatroom_menus_class, dropdown_class, feed_class } from "./class/class";
import * as interfaces from "./interface/interfaces";
import * as env from "./.env/env";

let lastest = "";
createInterval(setStrict((clear)=>{
    if (lastest !== document.URL) {
        if (document.URL.includes("u")) {
            // 사이드바 Element를 가져옴
            const sidebar = document.getElementsByClassName("css-uxwch2 edj5hvk0").item(0);

            // 이미 memoryAfterburner가 있는지 확인
            if (!document.getElementById("memoryAfterburner")) {
                const ma = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
                ma.id = "memoryAfterburner";

                //ma 함수 실행
                ma.addEventListener("click", setStrict(() => AfterMemory_func()));
                ma.childNodes.item(1).textContent = "MemoryAfterburner";

                sidebar.appendChild(ma);
            }

            if (!document.getElementById("personaPanel")) {
                const pe = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
                pe.id = "personaPanel";
                
                const chatMenus = new chatroom_menus_class();
                chatMenus.add(env.persona_name,env.persona_svg_d,() => persona_change(chatMenus));
            
                //pe 함수 실행
                pe.addEventListener("click", setStrict(() => persona_change(chatMenus))); //chatMenus에서 cloneNods 관련 오류 뜸
                pe.childNodes.item(1).textContent = "페르소나";
            
                sidebar.appendChild(pe);
            }
        }
    }
    lastest = document.URL;
}))


/*
// 이미 페르소나가 있는지 확인
if (!document.getElementById("personaPanel")) {
    const pe = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
    pe.id = "personaPanel";
    
    const chatMenus = new chatroom_menus_class();
    chatMenus.add(env.persona_name,env.persona_svg_d,() => persona_change(chatMenus));

    //pe 함수 실행
    pe.addEventListener("click", setStrict(() => persona_change(chatMenus)));
    pe.childNodes.item(1).textContent = "페르소나";

    sidebar.appendChild(pe);
}
*/