
import * as env from "../.env/env";

export function debug(content: string,code: number | null = null): void{
    if (JSON.parse(String(localStorage.getItem(env.local_IsDebug))).IsDebug){
        if (code == 0){
            console.log(`[FAST WRTN][DEBUG](function) ${content} loaded`);
        }
        else if(code == 1){
            console.log(`[FAST WRTN][DEBUG](body value) ${content} loaded`);
        }
        else if(code == 2){
            console.log(`[FAST WRTN][DEBUG](request) ${content} loaded`);
        }
        else if(code == 3){
            console.log(`[FAST WRTN][DEBUG](event) ${content} evented`)
        }
        else if(code == 4){
            console.log(`[FAST WRTN][DEBUG](for) ${content} completed`)
        }
        else if(code == 5){
            console.log(`[FAST WRTN][DEBUG](add) ${content} added`)
        }
        else{
            console.log(`[FAST WRTN][DEBUG] ${content}`);
        }
    }
}
