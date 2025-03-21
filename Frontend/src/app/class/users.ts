export interface Users {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive:Boolean;
    timeStamp : Date;
    authority :Authority[]
    
    
   

}
export interface Authority {

    role:String;
    
}


