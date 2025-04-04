import { AfterMemory_func } from "./chatroom_funtions";
import { createInterval, setStrict } from "./strict";

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

                // ma 함수 실행
                ma.addEventListener("click", setStrict(() => AfterMemory_func()));
                ma.childNodes.item(1).textContent = "MemoryAfterburner";

                sidebar.appendChild(ma);
            }
        }
    }
    lastest = document.URL;
}))


