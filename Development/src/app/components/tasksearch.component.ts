import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, Params } from '@angular/router';
import { LibgameService } from './../services/libgame.service';

declare var $:any;
declare var OpenLayers:any;

@Component({
  selector: 'tasksearch-component',
  providers: [LibgameService],
  template: `

  <div class="row">

      <div class="col-xs-12 col-sm-3" style="padding:0;">

          <div id="cf-ho-overview" class="content-frame">

              <p class="headline"><span class="special-font-color">{{user?.username}}</span></p>

              <div class="depend-on-device-table-to-none" style="width:100%;">

                  <div class="depend-on-device-tablerow-to-none" style="vertical-align:top;width:100%;color:rgb(255,255,255);">

                      <div id="cf-ho-overview-stats-experience" class="depend-on-device-tablecell-to-none" style="width:100%;vertical-align:middle;">
                          <p class="depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width" style="font-size:1.3em;font-weight:bold;text-align:center;margin-top:0.5em;">Erfahrung</p>
                          <p class="depend-on-device-none-to-left-float depend-on-device-none-to-49-percentage-width" style="font-size:1em;text-align:center;"><span style="font-size:1.6em!important;font-weight:bold;color:#0e9873;">{{user?.user_score}}</span></p>
                          <div style="clear:both;"></div>
                      </div>

                  </div>

              </div>

          </div>
      </div>

      <div class="col-xs-12 col-sm-9 padding-left-10px-sm-md-lg" style="padding:0;">

          <!-- Locations where user can find a task or a quest -->
          <div *ngFor="let t_location of getLocationsWhereUserCanFindTaskOrQuest();" class="content-frame">
             <p class='headline' style="background:rgb(120,255,120);padding-left:1em;text-align:left;">
                 <span class="fa fa-exclamation-triangle"></span> Besuche {{t_location.locationname}}
             </p>
          </div>

      </div>



  </div>

  <div class="row">

      <div class="col-xs-12" style="padding:0;">

          <!-- Searching for near tasks -->
          <div id="cf-ma-map" class="content-frame">

              <p class="headline">Suche nach Aufgaben in deiner Nähe</p>

              <div id="show_map" style="width:100%;height:500px;text-align:center;font-size:1.5em;color:black;background:url(../public/images/kachel.png);background-repeat:repeat;">
              </div>

              <div style="background: white;">
               <div id="osm">© <a href="http://www.openstreetmap.org">OpenStreetMap</a>
                 und <a href="http://www.openstreetmap.org/copyright">Mitwirkende</a>,
                 <a href="http://creativecommons.org/licenses/by-sa/2.0/deed.de">CC-BY-SA</a>
               </div>
              </div>

          </div>


      </div>



  </div>

  <div class="row">

      <div class="col-xs-12" style="padding:0;">

          <div class="content-frame">
              <p class='headline' style="background:rgb(120,255,120);padding-left:1em;text-align:left;">
                  <span class="fa fa-exclamation-triangle"></span> Du kannst auch den QR-Code an dem Ort scannen und dem Link folgen!
              </p>
          </div>

      </div>

  </div>

  `
})
export class TasksearchComponent implements OnInit {

  @Input() user:any;
  @Input() universalcontent:any;

  specificcontent: any = {};
  loading_specificcontent: any = true;

  map:any;
  layer_mapnik:any;
  layer_markers:any;
  layer_vector:any;
  geolocate:any;


  constructor(
    private router: Router,
    private lService: LibgameService){}

  ngOnInit() {

    //Specific Content
    this.loading_specificcontent = true;
    this.lService.specificcontent$.subscribe((specificcontent:any) => {
      this.specificcontent = specificcontent;
      this.loading_specificcontent = false;

      this.initMap();
    });
    this.lService.loadSpecificContent('tasksearch');

  }

  getLocationsWhereUserCanFindTaskOrQuest() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['LOCATIONS_WHERE_USER_CAN_FIND_TASK_OR_QUEST'] !== 'undefined' ? this.specificcontent['LOCATIONS_WHERE_USER_CAN_FIND_TASK_OR_QUEST'] : [];
  }

  getAllLocations() {
    return !$.isEmptyObject(this.specificcontent) && typeof this.specificcontent['ALL_LOCATIONS'] !== 'undefined' ? this.specificcontent['ALL_LOCATIONS'] : [];
  }

  getUniversalContent(content_mapper:any) {
    if($.isEmptyObject(this.universalcontent) || typeof this.universalcontent['_Content'] === 'undefined') {
      return "";
    }

    let t_content = this.universalcontent['_Content'].filter((x:any) => {return x.content_mapper.toLowerCase() == content_mapper.toLowerCase();});

    if(t_content.length > 0) {
      return t_content[0].text;
    } else {
      return "";
    }

  }

  navigateToQuest(quest_id:any) {
    this.router.navigate(['/l/quest', quest_id]);
  }

  navigateToTask(task_id:any) {
    this.router.navigate(['/l/task', task_id]);
  }

  navigateToBadge(badge_id:any) {
    this.router.navigate(['/l/badge', badge_id]);
  }

  initMap() {

    OpenLayers.Lang.setCode('de');

    // Position und Zoomstufe der Karte

    this.map = new OpenLayers.Map('show_map', {
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar()],
        maxExtent:
            new OpenLayers.Bounds(-20037508.34,-20037508.34,
                                    20037508.34, 20037508.34),
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
    let t_locations = this.getAllLocations();
    for(let t_location_key in t_locations) {
      this.addMarker(this.layer_markers, parseFloat(t_locations[t_location_key].geo_long), parseFloat(t_locations[t_location_key].geo_lati));
    }

    //Jump to Main Location
    var lon = 8.4610;
    var lat = 49.4855;
    var zoom = 14;
    let t_root_location = t_locations.length > 0 ? t_locations[0] : {};
    for(let t_location_key in t_locations) {
      if(t_locations[t_location_key].location_id+"" == this.getUniversalContent("ROOT_LOCATION")) {
        t_root_location = t_locations[t_location_key];
      }
    }

    if(typeof t_root_location.location_id !== 'undefined') {
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

    this.geolocate.events.register("locationupdated",this.geolocate,(e:any) => {
        this.layer_vector.removeAllFeatures();
        let circle = new OpenLayers.Feature.Vector(
            OpenLayers.Geometry.Polygon.createRegularPolygon(
                new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                e.position.coords.accuracy/8,
                40,
                0
            ),
            {},
            {
                fillColor: '#000',
                fillOpacity: 0.1,
                strokeWidth: 0
            }
        );
        this.layer_vector.addFeatures([
            new OpenLayers.Feature.Vector(
                e.point,
                {},
                {
                    graphicName: 'cross',
                    strokeColor: '#f00',
                    strokeWidth: 2,
                    fillOpacity: 0,
                    pointRadius: 10
                }
            ),
            circle
        ]);
    });

    this.geolocate.activate();
    this.locate();

  }

  jumpTo(lon:any, lat:any, zoom:any) {
      let x = this.Lon2Merc(lon);
      let y = this.Lat2Merc(lat);
      this.map.setCenter(new OpenLayers.LonLat(x, y), zoom);
      return false;
  }

  Lon2Merc(lon:any) {
      return 20037508.34 * lon / 180;
  }

  Lat2Merc(lat:any) {
      let PI = 3.14159265358979323846;
      lat = Math.log(Math.tan( (90 + lat) * PI / 360)) / (PI / 180);
      return 20037508.34 * lat / 180;
  }

  addMarker(layer:any, lon:any, lat:any) {

      let ll = new OpenLayers.LonLat(this.Lon2Merc(lon), this.Lat2Merc(lat));

      let marker = new OpenLayers.Marker(ll);

      layer.addMarker(marker);
  }

  locate() {
    this.geolocate.getCurrentLocation();
    setTimeout(() => {this.locate();},5000);
  }

}
