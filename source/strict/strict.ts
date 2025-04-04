export function setStrict<T extends (...args: any[]) => any>(callback: T,catchCallback?:(error:unknown)=>void,finallyCallback?:()=>void): (...args: Parameters<T>) => ReturnType<T> | undefined  {
    return (...args: Parameters<T>): ReturnType<T> | undefined => {
        try {
            return callback(...args);
        } catch (error) {
            console.error(`[STRICT ERROR] ${error}`);
            if (catchCallback) catchCallback(error);
            return undefined;
        } finally {
            if(finallyCallback) finallyCallback();
        }
    };
}

export function setCatch<T extends (...args: any[]) => any>(callback: T):  (...args: Parameters<T>) => {catch(CatchCallback: (error:unknown)=> void): undefined | ReturnType<T>} {
    return (...args: Parameters<T>): {catch(CatchCallback: (error:unknown)=> void): undefined | ReturnType<T>} => {
        return {
                catch(CatchCallback: (error:unknown)=> void): undefined | ReturnType<T>{
                try {
                    return callback(...args);
                }
                catch (e) {
                    CatchCallback(e);
                    return undefined;
                }
            }
        }
    }
}

export function setStrictAsync<T extends (...args: any[]) => Promise<any>>(callback: T, catchCallback?:(error:unknown)=>void,finallyCallback?:()=>void): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | undefined> {
    return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | undefined> => {
        try {
            return await callback(...args);
        } catch (error) {
            console.error(`[STRICT ERROR] ${error}`);
            if (catchCallback) catchCallback(error);
            return undefined;
        } finally {
            if(finallyCallback) finallyCallback();
        }
    };
}

export function createInterval(callback:(closeInterval:()=>void)=>void,ms?: number): void{
    let ID = setInterval(()=>callback(()=>clearInterval(ID)),ms);
}

export function TimeReadOnly<T>(value : T, limit: number = 1){
    return new class {
        private value : T = value;
        private count : number = limit;
        public get(): T{
            if (this.count == limit){
                throw Error("[STRICT ERROR]This Variable can use only one time");
            }
            this.count++;
            return this.value
        }
        public set(value: T): void{
            this.value = value;
        }
    }
}

export function TimeWriteOnly<T>(value : T, limit: number = 1){
    return new class {
        private value : T = value;
        private count : number = limit;
        public get(): T{
            return this.value
        }
        public set(value: T): void{
            if (this.count == limit){
                throw Error("[STRICT ERROR]This Variable can use only one time");
            }
            this.count++;
            this.value = value;
        }
    }
}

export function TimeOnly<T>(value : T, limit: number = 1){
    return new class {
        private value : T = value;
        private count : number = limit;
        public get(): T{
            if (this.count == limit){
                throw Error("[STRICT ERROR]This Variable can use only one time");
            }
            this.count++;
            return this.value
        }
        public set(value: T): void{
            if (this.count == limit){
                throw Error("[STRICT ERROR]This Variable can use only one time");
            }
            this.count++;
            this.value = value;
        }
    }
}