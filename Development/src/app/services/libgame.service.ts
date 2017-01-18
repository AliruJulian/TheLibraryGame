import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

declare var $: any;

@Injectable()
export class LibgameService implements OnInit {

    user$: Observable<Array<any>>;
    universalcontent$: Observable<Array<any>>;
    specificcontent$: Observable<Array<any>>;

    user: any = {};

    public linkToWebservice: string = "./webservice/webservice.php";

    private _userObserver: any;
    private _universalcontentObserver: any;
    private _specificcontentObserver: any;

    public _dataStore: {

        //Private Data
        user_id: number,


        //Mass Data
        user: any,
        universalcontent: any,
        specificcontent: any
    };


    constructor(private _http: Http) {
      this.user$ = new Observable<any[]>((observer:any) => this._userObserver = observer).share();
      this.universalcontent$ = new Observable<any[]>((observer:any) => this._universalcontentObserver = observer).share();
      this.specificcontent$ = new Observable<any[]>((observer:any) => this._specificcontentObserver = observer).share();

      this._dataStore = {
        user_id: -1,
        user: {},
        universalcontent: {},
        specificcontent: {}
      };



    }

    ngOnInit() {
    }

    //User
    loadUser() {

        let sendString:string = "t=get&dt=user";

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        if(this._dataStore.user_id != -1) {
          this._userObserver.next(this._dataStore.user);
        }

        this._http.post(this.linkToWebservice,sendString,options)
                  .map((response:any) => response.json()).subscribe((data:any) => {
                        console.log(data);
                        this._dataStore.user = {};
                        if(!$.isEmptyObject(data.data)) {
                          this._dataStore.user = data.data;
                          this._dataStore.user_id = data.data["user_id"];
                        } else {
                          this._dataStore.user_id = -1;
                        }

                        this._userObserver.next(this._dataStore.user);

                    }, (error:any) => {console.error('Could not load user.');});

    }

    loginUser(username:any,pwd:any) {

        let sendString:string = "t=login&username="+username+"&pwd="+pwd;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.linkToWebservice,sendString,options)
                          .map((response:any) => response.json());
    }

    loginAsAnonym() {

        let sendString:string = "t=loginanonym";

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.linkToWebservice,sendString,options)
                          .map((response:any) => response.json());
    }

    logoutUser() {

        let sendString:string = "t=logout";

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.linkToWebservice,sendString,options)
                          .map((response:any) => response.json());
    }

    deleteUser() {
      let sendString:string = "t=set&dt=deleteuser";

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    updatePassword(old_password:any, new_password:any) {
      let sendString:string = "t=set&dt=password&new_password="+new_password+"&old_password="+old_password;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    checkUsername(username:any) {
      let sendString:string = "t=get&dt=checkusername&username="+username;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    checkEmail(email:any) {
      let sendString:string = "t=get&dt=checkemail&email="+email;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    registerUser(username:any, email:any, password:any, password_repeat:any, faculty_id:any) {
      let sendString:string = "t=set&dt=new_user&username="+username+"&email="+email+"&password="+password+"&password_repeat="+password_repeat+"&faculty_id="+faculty_id;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    sendNewPassword(email:any) {
      let sendString:string = "t=fp&email="+email;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    setNewAdmin(newadminid:any) {
      let sendString:string = "t=set&dt=addadmin&user_id="+newadminid;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    removeAdmin(user_id:any) {
      let sendString:string = "t=set&dt=removeadmin&user_id=" + user_id;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    sendEmailMessageToAllUsers(email:any) {
      let sendString:string = "t=set&dt=sendemail&headline="+email.headline+"&content="+email.content;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    //Universal Content
    loadUniversalContent() {

        let sendString:string = "t=get&dt=content";

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        if($.isEmptyObject(this._dataStore.universalcontent) == false) {
          this._universalcontentObserver.next(this._dataStore.universalcontent);
        }

        this._http.post(this.linkToWebservice,sendString,options)
                  .map((response:any) => response.json()).subscribe((data:any) => {
                        console.log(data);
                        this._dataStore.universalcontent = {};
                        if(!$.isEmptyObject(data.data)) {
                          this._dataStore.universalcontent = data.data;
                        }

                        this._universalcontentObserver.next(this._dataStore.universalcontent);

                    }, (error:any) => {console.error('Could not load universalcontent.');});

    }

    upsertGeneralContent(generalcontent:any) {
      let sendString:string = "t=set&dt=generalcontent&generalcontent=" + encodeURIComponent(JSON.stringify(generalcontent));

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    //Specific Content
    loadSpecificContent(dt:any) {

        let sendString:string = "t=get&dt=" + dt;

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        this._http.post(this.linkToWebservice,sendString,options)
                  .map((response:any) => response.json()).subscribe((data:any) => {
                        console.log(data);
                        this._dataStore.specificcontent = {};
                        if(!$.isEmptyObject(data.data)) {
                          this._dataStore.specificcontent = data.data;
                        }

                        this._specificcontentObserver.next(this._dataStore.specificcontent);

                    }, (error:any) => {console.error('Could not load specificcontent.');});

    }

    //Location
    checkLocation(lati:any,long:any,location_id:any) {
      let sendString:string = "t=get&dt=checklocation&lati=" + lati + "&long=" + long + "&location_id="+location_id;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }


    //task
    upsertTask(taskdata:any) {
      let sendString:string = "t=set&dt=task&taskdata=" + encodeURIComponent(JSON.stringify(taskdata));

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    deleteTask(task_id:any) {
      let sendString:string = "t=set&dt=deletetask&task_id=" + task_id;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    solveTask(solvedata:any, task_id:any) {
      let sendString:string = "t=set&dt=solvetask&task_id=" + task_id + "&solvedata=" + encodeURIComponent(solvedata);

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    getSolveLinkForLocationTask(task_id:any, location_id:any) {
      //TODO
      return "./l/task/"+task_id+"/"+location_id;
    }

    //badge
    upsertBadge(badgedata:any) {
      let sendString:string = "t=set&dt=badge&badgedata=" + encodeURIComponent(JSON.stringify(badgedata));

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    deleteBadge(badge_id:any) {
      let sendString:string = "t=set&dt=deletebadge&badge_id=" + badge_id;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    //quest
    upsertQuest(questdata:any) {
      let sendString:string = "t=set&dt=quest&questdata=" + encodeURIComponent(JSON.stringify(questdata));

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    deleteQuest(quest_id:any) {
      let sendString:string = "t=set&dt=deletequest&quest_id=" + quest_id;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    //location
    upsertLocation(locationdata:any) {
      let sendString:string = "t=set&dt=location&locationdata=" + encodeURIComponent(JSON.stringify(locationdata));

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    deleteLocation(location_id:any) {
      let sendString:string = "t=set&dt=deletelocation&location_id=" + location_id;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    getLocationFoundLink(location_id:any) {
      //TODO
      return "http://aliru.de";
    }


    //resetFacultyScore
    resetFacultyScore() {
      let sendString:string = "t=set&dt=resetfacultyscore";

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.linkToWebservice,sendString,options)
                        .map((response:any) => response.json());
    }

    //Picture
    uploadPicture(picturedata:any, picturefiles: Array<File>) {
        let url = this.linkToWebservice;
        let params = {
          t: "set",
          dt: "uploadpicture",
          picturename: picturedata.picturename
        };

        return new Promise((resolve, reject) => {

            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            if(typeof picturefiles !== 'undefined' && picturefiles != null) {
              for(var i = 0; i < picturefiles.length; i++) {
                  formData.append("pictureupload", picturefiles[i], picturefiles[i].name);
              }
            }
            for(var key in params) {
              if(typeof params[key] !== 'undefined' && typeof params[key] !== 'object')
                formData.append(key, params[key]);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }


    //
    //Helper Function
    //
    getFormatedDate(str_datetime: string) {
      if(typeof str_datetime === 'undefined' || str_datetime==null || typeof str_datetime !== 'string' || str_datetime.length==0) {
        return '';
      }
      str_datetime = str_datetime.replace("-","/").replace("-","/");
      let tempDate = new Date(str_datetime.split(" ")[0]);
      let date =  tempDate.getDate()<=9 ?  "0"+tempDate.getDate() : tempDate.getDate();
      let month = (tempDate.getMonth()+1)<=9 ?  "0"+(tempDate.getMonth()+1) : (tempDate.getMonth()+1);
      return date+"."+month+"."+tempDate.getFullYear();
    }

    getPictureLink(picture_id:any) {
      return this.linkToWebservice+"?t=get&dt=picture&picture_id="+picture_id;
    }

    getLabelsAndDataForChart(jsonStringProgress:any, days:any, months:any, years:any, flag:any) {

        var returnObject:any = {};
        returnObject["labels"] = {};
        returnObject["ts"] = {};
        returnObject["data"] = {};
        var progressObject:any = JSON.parse(jsonStringProgress);

        //Aktuelles Datum ermitteln
        var nowTime:any = new Date();


        //Herausfinden wie viele months verschoben wird durch days
        var tempDateForCalculatePushMonths:any = new Date(nowTime);
        tempDateForCalculatePushMonths.setDate(tempDateForCalculatePushMonths.getDate()-days);

        var pushMonths:any = nowTime.getMonth()-tempDateForCalculatePushMonths.getMonth();

        var tempDateForCalculatePushYears:any = new Date(tempDateForCalculatePushMonths);
        tempDateForCalculatePushYears.setMonth(tempDateForCalculatePushYears.getMonth()-months);

        var pushYears:any = nowTime.getFullYear()-tempDateForCalculatePushYears.getFullYear();


        //Berechnung von label_points
        //Jahre
        for(var i = years+pushYears; i>(0+pushYears); i--)
        {
            returnObject["labels"][Object.keys(returnObject["labels"]).length] = ''+(new Date(nowTime.getFullYear()-i,0,1,0,0,0)).getFullYear();
            returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear()-i,0,1,0,0,0)).getTime()/1000;
        }

        //Months
        for(var i = months+pushMonths; i>(0+pushMonths); i--)
        {
            returnObject["labels"][Object.keys(returnObject["labels"]).length] = ''+((new Date(nowTime.getFullYear(),nowTime.getMonth()-i,1,0,0,0)).getMonth()+1)+'.'+(new Date(nowTime.getFullYear(),nowTime.getMonth()-i,1,0,0,0)).getFullYear();
            returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear(),nowTime.getMonth()-i,1,0,0,0)).getTime()/1000;
        }

        //Days
        for(var i = days; i>0; i--)
        {
            returnObject["labels"][Object.keys(returnObject["labels"]).length] = ''+((new Date(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate()-i,0,0,0)).getDate())+'.'+((new Date(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate()-i,0,0,0)).getMonth()+1)+'.'+(new Date(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate()-i,0,0,0)).getFullYear();
            returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate()-i+1,0,0,0)).getTime()/1000;
        }

        //Today
        returnObject["labels"][Object.keys(returnObject["labels"]).length] = 'Heute';
        returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate()+1,0,0,0)).getTime()/1000;

        //Calculate Data
        if(flag=="sum")
        {
            //Aufsummiert von beginn an
            for(var keyLabelsAndTs in returnObject["ts"])
            {
                //returnObject["data"]
                let tempData:any = 0;
                for(var key in progressObject)
                {
                    if(progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData+ progressObject[key]["data"];
                    }
                }

                returnObject["data"][keyLabelsAndTs] = tempData;

            }
        }
        else if(flag=="normal_comb")
        {
            for(var keyLabelsAndTs in returnObject["ts"])
            {
                let tempData:any = 0;
                for(var key in progressObject)
                {
                    if(progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                }

                returnObject["data"][keyLabelsAndTs] = tempData==0 ? ( keyLabelsAndTs=='0' ? 0 : returnObject["data"][parseInt(keyLabelsAndTs)-1] ) : tempData;
            }
        }
        else if(flag=="normal")
        {
            var first = true;
            for(var keyLabelsAndTs in returnObject["ts"])
            {
                let tempData:any = 0;
                for(var key in progressObject)
                {
                    if(first==true && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                    else if(first==false && progressObject[key]["ts"]>returnObject["ts"][parseInt(keyLabelsAndTs)-1] && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                }

                returnObject["data"][keyLabelsAndTs] = tempData;

                first = false;
            }
        }
        else if(flag=="diff")
        {
            var first = true;
            var maxDataBefore = 0;
            for(var keyLabelsAndTs in returnObject["ts"])
            {
                let tempData:any = 0;
                for(var key in progressObject)
                {
                    if(first==true && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                    else if(first==false && progressObject[key]["ts"]>returnObject["ts"][parseInt(keyLabelsAndTs)-1] && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                }

                returnObject["data"][keyLabelsAndTs] = tempData - maxDataBefore>=0?tempData - maxDataBefore:0;

                maxDataBefore = tempData>maxDataBefore ? tempData: maxDataBefore;

                first = false;
            }

            if(typeof returnObject["data"][0] !== 'undefined') {
              delete returnObject["data"][0];
            }
            if(typeof returnObject["ts"][0] !== 'undefined') {
              delete returnObject["ts"][0];
            }
            if(typeof returnObject["labels"][0] !== 'undefined') {
              delete returnObject["labels"][0];
            }
        }
        else if(flag=="avg")
        {
            //Durchschnitt im Zeitraum
            for(var keyLabelsAndTs in returnObject["ts"])
            {
                //returnObject["data"]
                let tempData:any = 0;
                let tempCountData:any = 0;
                for(var key in progressObject)
                {
                    if(keyLabelsAndTs=='0' && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                    else if(returnObject["ts"][parseInt(keyLabelsAndTs)-1]<progressObject[key]["ts"] && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                }

                returnObject["data"][keyLabelsAndTs] = isNaN(tempData/tempCountData) ? 0 : tempData/tempCountData;

            }
        }
        else if(flag=="avg_comb")
        {
            //Durchschnitt im Zeitraum
            for(var keyLabelsAndTs in returnObject["ts"])
            {
                //returnObject["data"]
                let tempData:any = 0;
                let tempCountData:any = 0;
                for(var key in progressObject)
                {
                    if(keyLabelsAndTs=='0' && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                    else if(returnObject["ts"][parseInt(keyLabelsAndTs)-1]<progressObject[key]["ts"] && progressObject[key]["ts"]<returnObject["ts"][keyLabelsAndTs])
                    {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                }

                returnObject["data"][keyLabelsAndTs] = isNaN(tempData/tempCountData) ? ( keyLabelsAndTs=='0' ? 0 : returnObject["data"][parseInt(keyLabelsAndTs)-1] ) : tempData/tempCountData;

            }
        }

        return returnObject;

    }

}
