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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var libgame_service_1 = require("./../services/libgame.service");
var TasksearchComponent = (function () {
    function TasksearchComponent(router, lService) {
        this.router = router;
        this.lService = lService;
        this.specificcontent = {};
        this.loading_specificcontent = true;
    }
    TasksearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Specific Content
        this.loading_specificcontent = true;
        this.lService.specificcontent$.subscribe(function (specificcontent) {
            _this.specificcontent = specificcontent;
            _this.loading_specificcontent = false;
            _this.initMap();
        });
        this.lService.loadSpecificContent('tasksearch');
    };
    TasksearchComponent.prototype.getLocationsWhereUserCanFindTaskOrQuest = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['LOCATIONS_WHERE_USER_CAN_FIND_TASK_OR_QUEST'] !== 'undefined' ? this.specificcontent['LOCATIONS_WHERE_USER_CAN_FIND_TASK_OR_QUEST'] : [];
    };
    TasksearchComponent.prototype.getAllLocations = function () {
        return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['ALL_LOCATIONS'] !== 'undefined' ? this.specificcontent['ALL_LOCATIONS'] : [];
    };
    TasksearchComponent.prototype.getUniversalContent = function (content_mapper) {
        if ($.isEmptyObject(this.universalcontent) || typeof this.universalcontent['_Content'] === 'undefined') {
            return "";
        }
        var t_content = this.universalcontent['_Content'].filter(function (x) { return x.content_mapper.toLowerCase() == content_mapper.toLowerCase(); });
        if (t_content.length > 0) {
            return t_content[0].text;
        }
        else {
            return "";
        }
    };
    TasksearchComponent.prototype.navigateToQuest = function (quest_id) {
        this.router.navigate(['/l/quest', quest_id]);
    };
    TasksearchComponent.prototype.navigateToTask = function (task_id) {
        this.router.navigate(['/l/task', task_id]);
    };
    TasksearchComponent.prototype.navigateToBadge = function (badge_id) {
        this.router.navigate(['/l/badge', badge_id]);
    };
    TasksearchComponent.prototype.initMap = function () {
        var _this = this;
        OpenLayers.Lang.setCode('de');
        // Position und Zoomstufe der Karte
        this.map = new OpenLayers.Map('show_map', {
            projection: new OpenLayers.Projection("EPSG:900913"),
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar()
            ],
            maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
            numZoomLevels: 18,
            maxResolution: 156543,
            units: 'meters'
        });
        this.layer_mapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
        this.layer_markers = new OpenLayers.Layer.Markers("Address", { projection: new OpenLayers.Projection("EPSG:4326"),
            visibility: true, displayInLayerSwitcher: false });
        this.layer_vector = new OpenLayers.Layer.Vector('vector');
        this.map.addLayers([this.layer_mapnik, this.layer_markers, this.layer_vector]);
        // Position des Markers
        //this.addMarker(this.layer_markers, 8.45657, 49.4875);
        var t_locations = this.getAllLocations();
        for (var t_location_key in t_locations) {
            this.addMarker(this.layer_markers, parseFloat(t_locations[t_location_key].geo_long), parseFloat(t_locations[t_location_key].geo_lati));
        }
        //Jump to Main Location
        var lon = 8.4610;
        var lat = 49.4855;
        var zoom = 14;
        var t_root_location = t_locations.length > 0 ? t_locations[0] : {};
        for (var t_location_key in t_locations) {
            if (t_locations[t_location_key].location_id + "" == this.getUniversalContent("ROOT_LOCATION")) {
                t_root_location = t_locations[t_location_key];
            }
        }
        if (typeof t_root_location.location_id !== 'undefined') {
            lon = parseFloat(t_root_location.geo_long);
            lat = parseFloat(t_root_location.geo_lati);
        }
        this.jumpTo(lon, lat, zoom);
        this.geolocate = new OpenLayers.Control.Geolocate({
            bind: false,
            geolocationOptions: {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: 7000
            }
        });
        this.map.addControl(this.geolocate);
        this.geolocate.events.register("locationupdated", this.geolocate, function (e) {
            _this.layer_vector.removeAllFeatures();
            var circle = new OpenLayers.Feature.Vector(OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(e.point.x, e.point.y), e.position.coords.accuracy / 8, 40, 0), {}, {
                fillColor: '#000',
                fillOpacity: 0.1,
                strokeWidth: 0
            });
            _this.layer_vector.addFeatures([
                new OpenLayers.Feature.Vector(e.point, {}, {
                    graphicName: 'cross',
                    strokeColor: '#f00',
                    strokeWidth: 2,
                    fillOpacity: 0,
                    pointRadius: 10
                }),
                circle
            ]);
        });
        this.geolocate.activate();
        this.locate();
    };
    TasksearchComponent.prototype.jumpTo = function (lon, lat, zoom) {
        var x = this.Lon2Merc(lon);
        var y = this.Lat2Merc(lat);
        this.map.setCenter(new OpenLayers.LonLat(x, y), zoom);
        return false;
    };
    TasksearchComponent.prototype.Lon2Merc = function (lon) {
        return 20037508.34 * lon / 180;
    };
    TasksearchComponent.prototype.Lat2Merc = function (lat) {
        var PI = 3.14159265358979323846;
        lat = Math.log(Math.tan((90 + lat) * PI / 360)) / (PI / 180);
        return 20037508.34 * lat / 180;
    };
    TasksearchComponent.prototype.addMarker = function (layer, lon, lat) {
        var ll = new OpenLayers.LonLat(this.Lon2Merc(lon), this.Lat2Merc(lat));
        var marker = new OpenLayers.Marker(ll);
        layer.addMarker(marker);
    };
    TasksearchComponent.prototype.locate = function () {
        var _this = this;
        this.geolocate.getCurrentLocation();
        setTimeout(function () { _this.locate(); }, 5000);
    };
    return TasksearchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TasksearchComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TasksearchComponent.prototype, "universalcontent", void 0);
TasksearchComponent = __decorate([
    core_1.Component({
        selector: 'tasksearch-component',
        providers: [libgame_service_1.LibgameService],
        template: "\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12 col-sm-3\" style=\"padding:0;\">\n\n          <div id=\"cf-ho-overview\" class=\"content-frame\">\n\n              <p class=\"headline\"><span class=\"special-font-color\">{{user?.username}}</span></p>\n\n              <div class=\"depend-on-device-table-to-none\" style=\"width:100%;\">\n\n                  <div class=\"depend-on-device-tablerow-to-none\" style=\"vertical-align:top;width:100%;color:rgb(255,255,255);\">\n\n                      <div id=\"cf-ho-overview-stats-experience\" class=\"depend-on-device-tablecell-to-none\" style=\"width:100%;vertical-align:middle;\">\n                          <p class=\"depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width\" style=\"font-size:1.3em;font-weight:bold;text-align:center;margin-top:0.5em;\">Erfahrung</p>\n                          <p class=\"depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width\" style=\"font-size:1em;text-align:center;\"><span style=\"font-size:1.6em!important;font-weight:bold;color:#0e9873;\">{{user?.user_score}}</span></p>\n                          <div style=\"clear:both;\"></div>\n                      </div>\n\n                  </div>\n\n              </div>\n\n          </div>\n      </div>\n\n      <div class=\"col-xs-12 col-sm-9 padding-left-10px-sm-md-lg\" style=\"padding:0;\">\n\n          <!-- Locations where user can find a task or a quest -->\n          <div *ngFor=\"let t_location of getLocationsWhereUserCanFindTaskOrQuest();\" class=\"content-frame\">\n             <p class='headline' style=\"background:rgb(120,255,120);padding-left:1em;text-align:left;\">\n                 <span class=\"fa fa-exclamation-triangle\"></span> Besuche {{t_location.locationname}}\n             </p>\n          </div>\n\n      </div>\n\n\n\n  </div>\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <!-- Searching for near tasks -->\n          <div id=\"cf-ma-map\" class=\"content-frame\">\n\n              <p class=\"headline\">Suche nach Aufgaben in deiner N\u00E4he</p>\n\n              <div id=\"show_map\" style=\"width:100%;height:500px;text-align:center;font-size:1.5em;color:black;background:url(../public/images/kachel.png);background-repeat:repeat;\">\n              </div>\n\n              <div style=\"background: white;\">\n               <div id=\"osm\">\u00A9 <a href=\"http://www.openstreetmap.org\">OpenStreetMap</a>\n                 und <a href=\"http://www.openstreetmap.org/copyright\">Mitwirkende</a>,\n                 <a href=\"http://creativecommons.org/licenses/by-sa/2.0/deed.de\">CC-BY-SA</a>\n               </div>\n              </div>\n\n          </div>\n\n\n      </div>\n\n\n\n  </div>\n\n  <div class=\"row\">\n\n      <div class=\"col-xs-12\" style=\"padding:0;\">\n\n          <div class=\"content-frame\">\n              <p class='headline' style=\"background:rgb(120,255,120);padding-left:1em;text-align:left;\">\n                  <span class=\"fa fa-exclamation-triangle\"></span> Du kannst auch den QR-Code an dem Ort scannen und dem Link folgen!\n              </p>\n          </div>\n\n      </div>\n\n  </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, libgame_service_1.LibgameService])
], TasksearchComponent);
exports.TasksearchComponent = TasksearchComponent;
var _a;
//# sourceMappingURL=tasksearch.component.js.map