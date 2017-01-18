"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/share");
require("rxjs/add/operator/map");
var LibgameService = (function () {
    function LibgameService(_http) {
        var _this = this;
        this._http = _http;
        this.user = {};
        this.linkToWebservice = "./webservice/webservice.php";
        this.user$ = new Observable_1.Observable(function (observer) { return _this._userObserver = observer; }).share();
        this.universalcontent$ = new Observable_1.Observable(function (observer) { return _this._universalcontentObserver = observer; }).share();
        this.specificcontent$ = new Observable_1.Observable(function (observer) { return _this._specificcontentObserver = observer; }).share();
        this._dataStore = {
            user_id: -1,
            user: {},
            universalcontent: {},
            specificcontent: {}
        };
    }
    LibgameService.prototype.ngOnInit = function () {
    };
    LibgameService.prototype.loadUser = function () {
        var _this = this;
        var sendString = "t=get&dt=user";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        if (this._dataStore.user_id != -1) {
            this._userObserver.next(this._dataStore.user);
        }
        this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            console.log(data);
            _this._dataStore.user = {};
            if (!$.isEmptyObject(data.data)) {
                _this._dataStore.user = data.data;
                _this._dataStore.user_id = data.data["user_id"];
            }
            else {
                _this._dataStore.user_id = -1;
            }
            _this._userObserver.next(_this._dataStore.user);
        }, function (error) { console.error('Could not load user.'); });
    };
    LibgameService.prototype.loginUser = function (username, pwd) {
        var sendString = "t=login&username=" + username + "&pwd=" + pwd;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.loginAsAnonym = function () {
        var sendString = "t=loginanonym";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.logoutUser = function () {
        var sendString = "t=logout";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.deleteUser = function () {
        var sendString = "t=set&dt=deleteuser";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.updatePassword = function (old_password, new_password) {
        var sendString = "t=set&dt=password&new_password=" + new_password + "&old_password=" + old_password;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.checkUsername = function (username) {
        var sendString = "t=get&dt=checkusername&username=" + username;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.checkEmail = function (email) {
        var sendString = "t=get&dt=checkemail&email=" + email;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.registerUser = function (username, email, password, password_repeat, faculty_id) {
        var sendString = "t=set&dt=new_user&username=" + username + "&email=" + email + "&password=" + password + "&password_repeat=" + password_repeat + "&faculty_id=" + faculty_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.sendNewPassword = function (email) {
        var sendString = "t=fp&email=" + email;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.setNewAdmin = function (newadminid) {
        var sendString = "t=set&dt=addadmin&user_id=" + newadminid;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.removeAdmin = function (user_id) {
        var sendString = "t=set&dt=removeadmin&user_id=" + user_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.sendEmailMessageToAllUsers = function (email) {
        var sendString = "t=set&dt=sendemail&headline=" + email.headline + "&content=" + email.content;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.loadUniversalContent = function () {
        var _this = this;
        var sendString = "t=get&dt=content";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        if ($.isEmptyObject(this._dataStore.universalcontent) == false) {
            this._universalcontentObserver.next(this._dataStore.universalcontent);
        }
        this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            console.log(data);
            _this._dataStore.universalcontent = {};
            if (!$.isEmptyObject(data.data)) {
                _this._dataStore.universalcontent = data.data;
            }
            _this._universalcontentObserver.next(_this._dataStore.universalcontent);
        }, function (error) { console.error('Could not load universalcontent.'); });
    };
    LibgameService.prototype.upsertGeneralContent = function (generalcontent) {
        var sendString = "t=set&dt=generalcontent&generalcontent=" + encodeURIComponent(JSON.stringify(generalcontent));
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.loadSpecificContent = function (dt) {
        var _this = this;
        var sendString = "t=get&dt=" + dt;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); }).subscribe(function (data) {
            console.log(data);
            _this._dataStore.specificcontent = {};
            if (!$.isEmptyObject(data.data)) {
                _this._dataStore.specificcontent = data.data;
            }
            _this._specificcontentObserver.next(_this._dataStore.specificcontent);
        }, function (error) { console.error('Could not load specificcontent.'); });
    };
    LibgameService.prototype.checkLocation = function (lati, long, location_id) {
        var sendString = "t=get&dt=checklocation&lati=" + lati + "&long=" + long + "&location_id=" + location_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.upsertTask = function (taskdata) {
        var sendString = "t=set&dt=task&taskdata=" + encodeURIComponent(JSON.stringify(taskdata));
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.deleteTask = function (task_id) {
        var sendString = "t=set&dt=deletetask&task_id=" + task_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.solveTask = function (solvedata, task_id) {
        var sendString = "t=set&dt=solvetask&task_id=" + task_id + "&solvedata=" + encodeURIComponent(solvedata);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.getSolveLinkForLocationTask = function (task_id, location_id) {
        return "./l/task/" + task_id + "/" + location_id;
    };
    LibgameService.prototype.upsertBadge = function (badgedata) {
        var sendString = "t=set&dt=badge&badgedata=" + encodeURIComponent(JSON.stringify(badgedata));
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.deleteBadge = function (badge_id) {
        var sendString = "t=set&dt=deletebadge&badge_id=" + badge_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.upsertQuest = function (questdata) {
        var sendString = "t=set&dt=quest&questdata=" + encodeURIComponent(JSON.stringify(questdata));
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.deleteQuest = function (quest_id) {
        var sendString = "t=set&dt=deletequest&quest_id=" + quest_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.upsertLocation = function (locationdata) {
        var sendString = "t=set&dt=location&locationdata=" + encodeURIComponent(JSON.stringify(locationdata));
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.deleteLocation = function (location_id) {
        var sendString = "t=set&dt=deletelocation&location_id=" + location_id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.getLocationFoundLink = function (location_id) {
        return "http://aliru.de";
    };
    LibgameService.prototype.resetFacultyScore = function () {
        var sendString = "t=set&dt=resetfacultyscore";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.linkToWebservice, sendString, options)
            .map(function (response) { return response.json(); });
    };
    LibgameService.prototype.uploadPicture = function (picturedata, picturefiles) {
        var url = this.linkToWebservice;
        var params = {
            t: "set",
            dt: "uploadpicture",
            picturename: picturedata.picturename
        };
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            if (typeof picturefiles !== 'undefined' && picturefiles != null) {
                for (var i = 0; i < picturefiles.length; i++) {
                    formData.append("pictureupload", picturefiles[i], picturefiles[i].name);
                }
            }
            for (var key in params) {
                if (typeof params[key] !== 'undefined' && typeof params[key] !== 'object')
                    formData.append(key, params[key]);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    LibgameService.prototype.getFormatedDate = function (str_datetime) {
        if (typeof str_datetime === 'undefined' || str_datetime == null || typeof str_datetime !== 'string' || str_datetime.length == 0) {
            return '';
        }
        str_datetime = str_datetime.replace("-", "/").replace("-", "/");
        var tempDate = new Date(str_datetime.split(" ")[0]);
        var date = tempDate.getDate() <= 9 ? "0" + tempDate.getDate() : tempDate.getDate();
        var month = (tempDate.getMonth() + 1) <= 9 ? "0" + (tempDate.getMonth() + 1) : (tempDate.getMonth() + 1);
        return date + "." + month + "." + tempDate.getFullYear();
    };
    LibgameService.prototype.getPictureLink = function (picture_id) {
        return this.linkToWebservice + "?t=get&dt=picture&picture_id=" + picture_id;
    };
    LibgameService.prototype.getLabelsAndDataForChart = function (jsonStringProgress, days, months, years, flag) {
        var returnObject = {};
        returnObject["labels"] = {};
        returnObject["ts"] = {};
        returnObject["data"] = {};
        var progressObject = JSON.parse(jsonStringProgress);
        var nowTime = new Date();
        var tempDateForCalculatePushMonths = new Date(nowTime);
        tempDateForCalculatePushMonths.setDate(tempDateForCalculatePushMonths.getDate() - days);
        var pushMonths = nowTime.getMonth() - tempDateForCalculatePushMonths.getMonth();
        var tempDateForCalculatePushYears = new Date(tempDateForCalculatePushMonths);
        tempDateForCalculatePushYears.setMonth(tempDateForCalculatePushYears.getMonth() - months);
        var pushYears = nowTime.getFullYear() - tempDateForCalculatePushYears.getFullYear();
        for (var i = years + pushYears; i > (0 + pushYears); i--) {
            returnObject["labels"][Object.keys(returnObject["labels"]).length] = '' + (new Date(nowTime.getFullYear() - i, 0, 1, 0, 0, 0)).getFullYear();
            returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear() - i, 0, 1, 0, 0, 0)).getTime() / 1000;
        }
        for (var i = months + pushMonths; i > (0 + pushMonths); i--) {
            returnObject["labels"][Object.keys(returnObject["labels"]).length] = '' + ((new Date(nowTime.getFullYear(), nowTime.getMonth() - i, 1, 0, 0, 0)).getMonth() + 1) + '.' + (new Date(nowTime.getFullYear(), nowTime.getMonth() - i, 1, 0, 0, 0)).getFullYear();
            returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear(), nowTime.getMonth() - i, 1, 0, 0, 0)).getTime() / 1000;
        }
        for (var i = days; i > 0; i--) {
            returnObject["labels"][Object.keys(returnObject["labels"]).length] = '' + ((new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - i, 0, 0, 0)).getDate()) + '.' + ((new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - i, 0, 0, 0)).getMonth() + 1) + '.' + (new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - i, 0, 0, 0)).getFullYear();
            returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() - i + 1, 0, 0, 0)).getTime() / 1000;
        }
        returnObject["labels"][Object.keys(returnObject["labels"]).length] = 'Heute';
        returnObject["ts"][Object.keys(returnObject["ts"]).length] = (new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate() + 1, 0, 0, 0)).getTime() / 1000;
        if (flag == "sum") {
            for (var keyLabelsAndTs in returnObject["ts"]) {
                var tempData = 0;
                for (var key in progressObject) {
                    if (progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData + progressObject[key]["data"];
                    }
                }
                returnObject["data"][keyLabelsAndTs] = tempData;
            }
        }
        else if (flag == "normal_comb") {
            for (var keyLabelsAndTs in returnObject["ts"]) {
                var tempData = 0;
                for (var key in progressObject) {
                    if (progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                }
                returnObject["data"][keyLabelsAndTs] = tempData == 0 ? (keyLabelsAndTs == '0' ? 0 : returnObject["data"][parseInt(keyLabelsAndTs) - 1]) : tempData;
            }
        }
        else if (flag == "normal") {
            var first = true;
            for (var keyLabelsAndTs in returnObject["ts"]) {
                var tempData = 0;
                for (var key in progressObject) {
                    if (first == true && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                    else if (first == false && progressObject[key]["ts"] > returnObject["ts"][parseInt(keyLabelsAndTs) - 1] && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                }
                returnObject["data"][keyLabelsAndTs] = tempData;
                first = false;
            }
        }
        else if (flag == "diff") {
            var first = true;
            var maxDataBefore = 0;
            for (var keyLabelsAndTs in returnObject["ts"]) {
                var tempData = 0;
                for (var key in progressObject) {
                    if (first == true && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                    else if (first == false && progressObject[key]["ts"] > returnObject["ts"][parseInt(keyLabelsAndTs) - 1] && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData > parseInt(progressObject[key]["data"]) ? tempData : parseInt(progressObject[key]["data"]);
                    }
                }
                returnObject["data"][keyLabelsAndTs] = tempData - maxDataBefore >= 0 ? tempData - maxDataBefore : 0;
                maxDataBefore = tempData > maxDataBefore ? tempData : maxDataBefore;
                first = false;
            }
            if (typeof returnObject["data"][0] !== 'undefined') {
                delete returnObject["data"][0];
            }
            if (typeof returnObject["ts"][0] !== 'undefined') {
                delete returnObject["ts"][0];
            }
            if (typeof returnObject["labels"][0] !== 'undefined') {
                delete returnObject["labels"][0];
            }
        }
        else if (flag == "avg") {
            for (var keyLabelsAndTs in returnObject["ts"]) {
                var tempData = 0;
                var tempCountData = 0;
                for (var key in progressObject) {
                    if (keyLabelsAndTs == '0' && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                    else if (returnObject["ts"][parseInt(keyLabelsAndTs) - 1] < progressObject[key]["ts"] && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                }
                returnObject["data"][keyLabelsAndTs] = isNaN(tempData / tempCountData) ? 0 : tempData / tempCountData;
            }
        }
        else if (flag == "avg_comb") {
            for (var keyLabelsAndTs in returnObject["ts"]) {
                var tempData = 0;
                var tempCountData = 0;
                for (var key in progressObject) {
                    if (keyLabelsAndTs == '0' && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                    else if (returnObject["ts"][parseInt(keyLabelsAndTs) - 1] < progressObject[key]["ts"] && progressObject[key]["ts"] < returnObject["ts"][keyLabelsAndTs]) {
                        tempData = tempData + progressObject[key]["data"];
                        tempCountData++;
                    }
                }
                returnObject["data"][keyLabelsAndTs] = isNaN(tempData / tempCountData) ? (keyLabelsAndTs == '0' ? 0 : returnObject["data"][parseInt(keyLabelsAndTs) - 1]) : tempData / tempCountData;
            }
        }
        return returnObject;
    };
    return LibgameService;
}());
LibgameService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], LibgameService);
exports.LibgameService = LibgameService;
var _a;
//# sourceMappingURL=libgame.service.js.map