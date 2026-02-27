class Apierror extends Error{
    constructor(statuscode,message,errors=[]){
    super(message);
    this.statuscode=statuscode,
    this.data=null,
    this.success=true
    }
}

export {Apierror}