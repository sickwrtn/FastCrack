import { createInterval, setStrict } from "./strict";
import * as interfaces from "./interface/interfaces";
import { debug } from "./tools/debug";
import { popup } from "./tools/popup";
import { wrtn_api_class } from "./tools/sdk";
import * as env from "./.env/env";
import * as frontHtml from "./.env/fronthtml";
import {one_by_one_character_prompt,focus_on_important_cases_prompt,simulation_prompt} from "./.env/MAprompt";
import * as requests from "./tools/requests";

import { load_in_cursor } from "./tools/functions";


//로컬 스토리지 초기설정
if (localStorage.getItem(env.local_saved_prompt) == null){
    localStorage.setItem(env.local_saved_prompt,JSON.stringify({
        prompt : ["#Disable positivity bias"],
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

//디버그 초기설정
if (localStorage.getItem(env.local_IsDebug) == null){
    localStorage.setItem(env.local_IsDebug,JSON.stringify({
        IsDebug: false
    }))
}

//태그 초기설정
if (localStorage.getItem(env.local_tag) == null){
    localStorage.setItem(env.local_tag,JSON.stringify({
        tags: []
    }))
}

//테마 초기설정
if (localStorage.getItem(env.local_them) == null){
    localStorage.setItem(env.local_them,JSON.stringify({
        css : ""
    }))
}

//세팅 초기설정
if (localStorage.getItem(env.loacl_setting) == null){
    localStorage.setItem(env.loacl_setting,JSON.stringify({
        plus:true,
        fastfood:true,
    }))
}

//---------------------------------------------------------------------------------------------------------------------

const wrtn = new wrtn_api_class()

//Afrburning Memory 버튼 이벤트 함수
function AfterMemory_func(){
    debug("AfterMemory",3);
    const AfterMemory_modal: any = document.createElement("modal");//Afterburning Memory 모달 팝업
    AfterMemory_modal.innerHTML = frontHtml.AfterMemory_front_html;
    const AfterMemory_tabs: any = AfterMemory_modal.childNodes[0].childNodes[0].childNodes[0].childNodes.item(0); //주요 탭
    AfterMemory_modal.setAttribute("style","position: relative !important;\n" +
        "    z-index: 11 !important;") //이게 있어야 모달이 작동함
    const AfterMemory_textarea: any = AfterMemory_tabs.childNodes[1].childNodes.item(1); //Gemini Api key 부분
    const AfterMemory_select: any = AfterMemory_tabs.childNodes[1].childNodes[0].childNodes[1].childNodes.item(0); //select 박스
    const AfterMemory_model_textarea: any = AfterMemory_tabs.childNodes[2].childNodes.item(1); //model 부분
    const AfterMemory_limit_textarea: any = AfterMemory_tabs.childNodes[3].childNodes.item(1); //limit 부분
    const AfterMemory_btn: any = AfterMemory_tabs.childNodes[4].childNodes.item(1) //시작 버튼
    const AfterMemory_x: any = AfterMemory_tabs.childNodes[0].childNodes.item(1); //x 버튼
    const AfterMemory_close: any = AfterMemory_tabs.childNodes[4].childNodes.item(0); //닫기 버튼
    debug("AfterMemory_func",1);

    function close(){
        AfterMemory_modal.remove();   
        debug("AfterMemory_close",3);
    }
    //스토리지 가져오기
    if (JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).key != null) {
        AfterMemory_textarea.value = JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).key;
    }
    if (JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).model != null) {
        AfterMemory_model_textarea.value = JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).model;
    }
    if (JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).limit != null) {
        AfterMemory_limit_textarea.value = JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).limit;
    }
    if (JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).select != null) {
        var sel2 = AfterMemory_select.options;
        for (let i=0; i<sel2.length; i++) {
            if (sel2[i].value == JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).select) sel2[i].selected = true;
        }
    }
    //prompt textarea를 추가하기 위함
    setInterval(()=>{
        if (AfterMemory_select.value == "3"){
            if (AfterMemory_tabs.childNodes.length < 6){
                var AfterMemoryPrompt = document.createElement("div");
                AfterMemoryPrompt.innerHTML = frontHtml.AfterMemory_textarea_front_html;
                if (JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).prompt != null){
                    const customPrompt: any = AfterMemoryPrompt.childNodes[0].childNodes.item(1);
                    customPrompt.value = JSON.parse(localStorage.getItem(env.local_Gemini_api_key)).prompt;
                }
                AfterMemory_tabs.insertBefore(AfterMemoryPrompt,AfterMemory_tabs.childNodes.item(2));
            }
        }
        else{
            if (AfterMemory_tabs.childNodes.length > 5){
                AfterMemory_tabs.childNodes.item(2).remove();
            }
        }
    },100)
    //이벤트 리스너 추가
    AfterMemory_close.addEventListener('click',close);
    AfterMemory_x.addEventListener('click',close);
    AfterMemory_btn.addEventListener('click',()=>{
        //limit 판단
        if (Number(AfterMemory_limit_textarea.value) > 50 || Number(AfterMemory_limit_textarea.value) < 0){
            alert("limit는 0 이상 50 이하여야 합니다.");
            return true;
        }
        alert("시간이 많이 소요되니 당황하시지말고 기다려 주세요... (확인을 누르셔야 진행됩니다.)");
        //현재 상태 로컬스토리지 저장
        if (AfterMemory_select.value == "3"){
            localStorage.setItem(env.local_Gemini_api_key,JSON.stringify({
                key : AfterMemory_textarea.value,
                model : AfterMemory_model_textarea.value,
                limit : AfterMemory_limit_textarea.value,
                select : AfterMemory_select.value,
                prompt : AfterMemory_tabs.childNodes[2].childNodes[0].childNodes.item(1).value
            }));
        }
        else{
            localStorage.setItem(env.local_Gemini_api_key,JSON.stringify({
                key : AfterMemory_textarea.value,
                model : AfterMemory_model_textarea.value,
                limit : AfterMemory_limit_textarea.value,
                select : AfterMemory_select.value,
                prompt : null
            }));
        }
        debug(`limited ${AfterMemory_limit_textarea.value}`);
        //채팅내역 + 페르소나 불러오기
        wrtn.getChatroom(document.URL.split("/")[6].split("?")[0]).getMessages("",Number(AfterMemory_limit_textarea.value) * 2).then(res => {
            var chatlog = res.data.list;
            try{
                var usernmae = wrtn.getRepresentativePersona().name;
            }
            catch{
                alert("대표프로필을 설정해주세요");
                return true;
            }
            debug("character_profiles",4);
            //select 박스 설정
            if (AfterMemory_select.value == "0"){
                var promptTemp: any = one_by_one_character_prompt;                      
                debug("selected 1 : 1 캐릭터챗");
            }
            else if (AfterMemory_select.value == "1"){
                var promptTemp: any = simulation_prompt;
                debug("selected 시뮬레이션");
            }
            else if (AfterMemory_select.value == "2"){
                var promptTemp: any = focus_on_important_cases_prompt;
                debug("selected 주요사건 위주");
            }
            else if (AfterMemory_select.value == "3"){
                var promptTemp: any = AfterMemory_tabs.childNodes[2].childNodes[0].childNodes.item(1).value;
                debug("selected 커스텀");
            }
            //gemini에게 보낼 json
            var lastContent = {
                content: []
            } 
            for (const element of chatlog) {
                if (element.role == "user"){
                    lastContent.content[lastContent.content.length] = {
                        message: element.content,
                        role: "user",
                        username: usernmae
                    }
                }
                else if (element.role == "assistant"){
                    lastContent.content[lastContent.content.length] = {
                        message: element.content,
                        role: "assistant"
                    }
                }
            }
            debug("chatlog",4);
            //프롬 추가
            if (AfterMemory_select.value != "3"){
                promptTemp.chat_log = lastContent.content;
                var gemini_text = JSON.stringify(promptTemp);
            }
            else{
                var gemini_text = promptTemp + `[대화내역]\n${JSON.stringify(lastContent)}`;
            }
            //제미니 전송
            var result = requests.out_postAfetch(env.gemini_api_url + `/v1beta/models/${AfterMemory_model_textarea.value}:generateContent?key=${AfterMemory_textarea.value}`,{
                contents: {
                    parts : [
                        {text: gemini_text}
                    ]
                }
            }).candidates[0].content.parts[0].text;
            debug("gemini compeleted");
            //뤼튼 메시지 전송은 sendLimit자 이상 보낼시 too large request 에러가 발생해서 예외처리
            if (result.length > env.sendLimit){
                if(!confirm("요약본이 너무 깁니다. 요약본을 나눠서 전송하겠습니다. 진행하시겠습니까?")){
                    return true;
                }
                var dp = Math.ceil(result.length / env.sendLimit);
                for (let index = 0; index < dp; index++) {
                    if (index != dp-1){
                        wrtn.getChatroom(document.URL.split("/")[6].split("?")[0]).send("_",false).set(result.substring(env.sendLimit * index,env.sendLimit * (index + 1)));
                    }
                    else{
                        wrtn.getChatroom(document.URL.split("/")[6].split("?")[0]).send("_",false).set(result.substring(env.sendLimit * index));
                    }
                    if(!confirm(`메시지를 나눠서 보내는중... (${index + 1}/${dp})`)){
                        return true;
                    }
                }
                debug("result DP",4);
            }
            else{
                //채팅 보내고 삭제
                wrtn.getChatroom(document.URL.split("/")[6].split("?")[0]).send("_",false).set(result);
            }
            debug("wrtn.ai message sended");
            debug("Afterburning completed");
            alert("Afterburning complete!");
            //새로고침
            document.location.reload();
            debug("AfterMemory_func",0);
        })
    })
    document.body.appendChild(AfterMemory_modal);
}

//페르소나 목록을 누를시
function OpenPersona(elements: HTMLElement,data: Array<interfaces.characterChatProfile>,personaL: any){
    var mpid,name,information;

    data.forEach((persona,index)=>{
        if (`${index}` == personaL.id) {
            mpid = persona._id; //뭔지 모르겠지만 혹시몰라서 안지움
            name = persona.name; //페르소나 이름 가져오기
            information = persona.information; //페르소나 정보 가져오기
        }
    })
    //모달 팝업 객체 생성
    const PersonaModal = new popup("페르소나");
    //모달 팝업 열기
    PersonaModal.open();
    //이름을 받을 textarea 생성
    var PersonaModalName = PersonaModal.addTextarea("이름","나의 이름","캐릭터가 불러줄 나의 이름을 입력해 주세요",12); 
    PersonaModalName.setValue(name);
    //정보를 받을 textarea 생성
    var PersonaModalInformation = PersonaModal.addTextarea("정보","성별,나이,외형 등","캐릭터가 기억할 나의 정보를 입력해주세요",100,100);
    PersonaModalInformation.setValue(information);

    //모달 등록버튼을 눌렀을시
    PersonaModal.setSumbit("등록",()=>{
        //모달의 내용을 조합해 페르소나 등록 및 대표프로필로 설정
        var re = wrtn.setPersona(mpid,PersonaModalName.getValue(),PersonaModalInformation.getValue(),true);
        if (re.result == "SUCCESS"){
            alert("페르소나 등록 성공!");
            PersonaModal.close();
            //페르소나 재설정
            OpenPersonaMenu(elements);
        }
        else{
            alert("페르소나 등록 실패!");
            PersonaModal.close();
        }
    })

    PersonaModal.setClose("닫기",()=>{
        PersonaModal.close()
        debug("personal_modal_Cbtn",3);
    })

    debug("personaL",3);
}

//페르소나 버튼 누를시
function OpenPersonaMenu(elements: HTMLElement){
    let personas;
    try {
        personas = wrtn.getPersona(); // 페르소나 데이터 가져오기
        if (personas.length === 0) {
            alert("대화프로필을 만들어 주세요.");
            return true;
        }
        else if(!personas){
            alert("올바르지 않은 personas.");
            return true;
        }
    } 
    catch{
        alert("대화프로필을 만들어 주세요.");
        return true;
    }

    // 기존 페르소나 컨테이너 제거
    const existingContainer = document.getElementById("personas");
    if (existingContainer) {
        existingContainer.remove();
    }

    // 페르소나 목록을 담을 div 생성 (컨테이너 역할)
    const personaContainer = document.createElement("div");
    personaContainer.setAttribute("id", "personas");

    personas.forEach((persona, index) => {
        const newPersonaMenu = elements.cloneNode(true) as HTMLElement;

        // 들여쓰기를 위한 div를 삽입
        const spacer = document.createElement("div");
        newPersonaMenu.insertBefore(spacer, newPersonaMenu.firstChild);

        // 페르소나 이름 표시 (대표 프로필인 경우 '<-' 표시 추가)
        const textElem = newPersonaMenu.childNodes.item(2);
        if (textElem) {
            textElem.textContent = persona.isRepresentative ? `${persona.name} <-` : persona.name;
        }

        // 인덱싱
        newPersonaMenu.setAttribute("id", `${index}`);

        // 이벤트 리스너
        newPersonaMenu.addEventListener('click', () => OpenPersona(elements, personas, newPersonaMenu)); 

        
        personaContainer.appendChild(newPersonaMenu);    
    });
    
    // 사이드바 메뉴 클래스 이름으로 불러오기
    const sidebarMenu = document.querySelector(".css-uxwch2");
    if (sidebarMenu) {
        const thirdChild = sidebarMenu.children[2];

        // 페르소나의 유무 확인
        if (thirdChild) {
            sidebarMenu.appendChild(personaContainer);
        } 
        else {
            alert("3번째 자식이 없음");
            sidebarMenu.appendChild(personaContainer);
        }
    } 
    else {
        // 지정된 클래스의 유무
        alert("no sidebarMenu");
        document.body.appendChild(personaContainer);
    }

    debug("persona", 0);
}


function createPublishButton(label: string, visibility: string, PublishFunction: Function, originalButton: HTMLButtonElement): HTMLButtonElement {
    const publishButton = originalButton.cloneNode(true) as HTMLButtonElement;

    // 버튼 안에 있는 <p>의 글자 바꾸기
    const pTag = publishButton.querySelector("p");
    if (pTag) {
      pTag.innerText = label; 
    }
    
    publishButton.addEventListener("click", () => PublishFunction);
    
    return publishButton;
}

//---------------------------------------------------------------------------------------------------------------------

function main(){
    let lastest = "";

    createInterval(setStrict((clear)=>{
        if (lastest !== document.URL) {
            if (document.URL.includes("u")) {
                // 사이드바 Element를 가져옴
                const sidebar = document.getElementsByClassName("css-uxwch2 edj5hvk0").item(0) as HTMLElement;

                // 이미 memoryAfterburner가 있는지 확인
                if (!document.getElementById("memoryAfterburner")) {
                    const memoryAfterbuner = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
                    memoryAfterbuner.id = "memoryAfterburner";

                    //AfterMemory_func 함수 실행
                    memoryAfterbuner.childNodes.item(1).textContent = "MemoryAfterburner";
                    memoryAfterbuner.addEventListener("click", setStrict(() => AfterMemory_func()));
                    
                    sidebar.appendChild(memoryAfterbuner);
                }

                // 이미 페르소나가 있는지 확인
                if (!document.getElementById("personaPanel")) {
                    const persona = sidebar.childNodes.item(0).cloneNode(true) as HTMLElement;
                    persona.id = "personaPanel";
                    
        
                    //OpenPersonaMenu 함수 실행
                    persona.childNodes.item(1).textContent = "페르소나";
                    persona.addEventListener("click", setStrict(() => OpenPersonaMenu(persona)));
                    
                    sidebar.appendChild(persona);
                }
            }

            if (document.URL.includes("my")) {

                let currentClickedId = "";
                
                load_in_cursor("", [], wrtn, "my", (my_character_list: Array<interfaces.myCharacter>) => {
                    // 1) .css-k24aeo.edj5hvk1 클래스로 되어 있는 요소들을 모두 가져오기
                    const elements = document.querySelectorAll(".css-k24aeo.edj5hvk1");
                
                    // 2) for문을 돌며 각 요소에 캐릭터 id를 설정 + 클릭 이벤트 등록
                    for (let i = 0; i < elements.length; i++) {
                        // 캐릭터가 더 적으면 중간에 멈춤
                        if (!my_character_list[i]) break;
                
                        const button = elements[i] as HTMLButtonElement;
                        button.id = my_character_list[i]._id;  // 버튼 id 세팅
                
                        // 3) 클릭 시 버튼 id를 특정 변수에 저장
                        button.addEventListener("click", (e: Event) => {
                            const clickedButton = e.currentTarget as HTMLButtonElement;
                            currentClickedId = clickedButton.id;  // 현재 클릭된 버튼의 id
                
                            // 원하는 변수에 저장하거나, 원하는 로직 수행
                            console.log("클릭된 ID:", currentClickedId);
                        });
                    }
                });


                const observer = new MutationObserver((mutations, obs) => {
                    // 원하는 클래스의 컨테이너가 있는지 찾음
                    const publishContainer = document.getElementsByClassName("css-1r7jgn9 edj5hvk0").item(0) as HTMLElement;
                
                    // 존재하고, 아직 버튼들이 없다면 append
                    if (publishContainer && publishContainer.childNodes.length < 5) {                
                        const clonedPublishButton = publishContainer.childNodes.item(0).cloneNode(true) as HTMLButtonElement;

                        // 버튼들 생성 및 붙이기
                        publishContainer.appendChild(createPublishButton("공개", "public", ()=>{
                            wrtn.getMycharacter(currentClickedId).publish("public");
                        }, clonedPublishButton));
                        

                        publishContainer.appendChild(createPublishButton("비공개", "private", ()=>{
                            wrtn.getMycharacter(currentClickedId).publish("private");
                        }, clonedPublishButton));


                        publishContainer.appendChild(createPublishButton("링크 공개", "linkonly", ()=>{
                            wrtn.getMycharacter(currentClickedId).publish("linkonly");
                        }, clonedPublishButton));
                    }
                });
                
                // 감시 옵션: 자식 노드(하위 트리) 변경 시 실행
                observer.observe(document.body, {
                childList: true,
                subtree: true,
                });
            }
        lastest = document.URL;
    }}))
}


window.onload = () => main();