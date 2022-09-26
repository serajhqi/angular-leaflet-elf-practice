import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	constructor(private toastr: ToastrService) {}

	notify({
		title,
		content,
		toastType
	}: {
		title: string;
		content: string;
		toastType: ToastType;
	}) {
		switch (toastType) {
			case 'success':
				this.toastr?.success(content, title, { progressBar: true });
				break;
			case 'error':
				this.toastr?.error(content, title, { progressBar: true });
				break;
			case 'warning':
				this.toastr?.warning(content, title, { progressBar: true });
				break;
			case 'info':
				this.toastr?.info(content, title, { progressBar: true });
				break;
			default:
				this.toastr?.error(content, title, { progressBar: true });
		}
	}
}
