import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '../../app.constants';
import { NotificationDataMap } from '../../ClassModel/MapObject/NotificationDataMap';


@Injectable({
  providedIn: 'root'
})
export class NotificationServisceService {

  constructor(
    private http : HttpClient, 
  ) { }

  getNotification(userId,role,notificationType){
    return this.http.get<[NotificationDataMap]>(`${API_URL}/notification/${userId}/${role}/${notificationType}`);
  }

  //Mark Notification as read
  updateNotification(role,notificationList){
    return this.http.put<any>(`${API_URL}/notification/${role}`,notificationList);
  }
}
