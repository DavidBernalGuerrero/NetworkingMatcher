import {Injectable, Input} from '@angular/core';
import {AuthService} from '../user-profile/auth.service';
import {DbService} from '../db.service';

@Injectable()
export class MeetingAttendanceService {

  MEETING_ATTENDANCE = 'MeetingAttendanceByUser';

  private userId;
  private allAttendance;

  constructor(private authService: AuthService,
              private db: DbService
  ) {
    this.userId = this.authService.user;

    authService.user.subscribe(user => {
      this.userId = user && user.uid;
    });
  }

  updateAttandance(meetingId: string, choice: boolean) {
    let path = this.MEETING_ATTENDANCE + '/' + meetingId + '/' + this.userId;
    this.allAttendance = this.db.list(path);

    this.allAttendance.push({
      going: choice
    });

    console.log("Changing attendance to: " + choice + "!");
  }
}
