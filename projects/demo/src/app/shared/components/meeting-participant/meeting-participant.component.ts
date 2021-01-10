import { Component, Input, OnInit } from '@angular/core';
import { IAudioTrack, IMediaTrack, IRemoteAudioTrack, IRemoteUser, IRemoteVideoTrack, IVideoTrack } from 'ngx-agora-sdk-ng';

import { IMeetingUser } from '../../../pages/meeting-page/meeting-page.component';

@Component({
  selector: 'app-meeting-participant',
  templateUrl: './meeting-participant.component.html',
  styleUrls: ['./meeting-participant.component.css']
})
export class MeetingParticipantComponent implements OnInit {
  myUser: any;
  @Input() set user(value: IMeetingUser) {
    this.myUser = value;
    if (value.type === 'remote') {
      this.videoTrack = value.user?.videoTrack;
      this.audioTrack = value.user?.audioTrack;
      this.micStatus = !!value.user?.hasAudio;
      this.camStatus = !!value.user?.hasVideo;
    }
    else {
      this.mediaTrack = value.mediaTrack;
    }
  }

  mediaTrack?: IMediaTrack;
  audioTrack?: IRemoteAudioTrack;
  videoTrack?: IRemoteVideoTrack;
  controlsVisible = false;
  micStatus = false;
  camStatus = false;

  constructor() { }

  ngOnInit(): void {
  }

  showControls(value: boolean): void {
    if (this.myUser.type === 'remote') {
      this.controlsVisible = value;
    }
  }

  onCamOff(): void {
    this.camStatus = !this.camStatus;
    this.camStatus ? this.mediaTrack?.cameraOn() : this.mediaTrack?.cameraOff();
  }
  onMicMute(): void {
    this.micStatus = !this.micStatus;
    this.micStatus ? this.mediaTrack?.microphoneUnMute() : this.mediaTrack?.microphoneMute();
  }
  onPin(): void {

  }
  onCick(): void {

  }

}
