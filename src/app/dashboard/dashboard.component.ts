import { Component, OnInit } from '@angular/core';
import { SpaceXService } from '../space-x.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  missions;
  constructor(private spaceX: SpaceXService) { }

  ngOnInit() {
    this.spaceX.getSpaceXData()
      .pipe(map((mission: any) => this.dataMapping(mission)))
      .subscribe(missions => this.missions = missions);
  }

  getLaunchSuccessData(isLaunch: boolean) {
    this.spaceX.getLaunchSuccessSpaceData(isLaunch)
      .pipe(map((mission: any) => this.dataMapping(mission)))
      .subscribe(missions => this.missions = missions);
  }

  getLaunchLandData(isLaunch: boolean) {
    this.spaceX.getLaunchLandSpaceData(isLaunch)
      .pipe(map((mission: any) => this.dataMapping(mission)))
      .subscribe(missions => this.missions = missions);
  }

  getAllData(year) {
    this.spaceX.getAllSpaceData(year)
      .pipe(map((mission: any) => this.dataMapping(mission)))
      .subscribe(missions => this.missions = missions);
  }

  dataMapping(mission: any) {
    return mission.map((m: any) => {
      let obj = {}
      obj['missionID'] = m.mission_id
      obj['missionName'] = m.mission_name
      obj['launchYear'] = m.launch_year
      obj['successfulLaunch'] = m.launch_success
      return obj;
    })
  }
}
