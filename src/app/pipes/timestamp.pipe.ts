import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/app'

@Pipe({
  name: 'toDate'
})
export class TimestampPipe implements PipeTransform {

  transform(value: Date | firebase.firestore.Timestamp): Date {
    return 'seconds' in value ? new Date(value.seconds * 1000) : value;
  }

}
