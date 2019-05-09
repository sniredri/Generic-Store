class SingleTonClass{
    static dataBase =null;//static type is saved on the memory awhile the app is running (the whole life of the app)
    
    static createInstance(){
        var object = new SingleTonClass()
        return object
    }

    static savedDataBase=(db)=>{
        if(!SingleTonClass.instance){//if the database is empty.
            SingleTonClass.dataBase=SingleTonClass.createInstance();
        }
        SingleTonClass.dataBase=db
    }

    static getDataBase(){
        return SingleTonClass.dataBase;
    }
}

export default SingleTonClass