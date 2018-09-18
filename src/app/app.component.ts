import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	myReactiveForm: FormGroup;
	formattedMessage: string;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.initForm();
		this.onChanges();
		this.onLoad();
	}

	initForm() {
		this.myReactiveForm = this.fb.group({
			name: ['', [
				Validators.required,
				Validators.pattern(/[a-zA-Z ]/)
			]
			],
			email: ['', [
				Validators.required, Validators.email
			]
			],
			phone: '',
			message: ['', [
				Validators.required
			]
			],
		});
	}

	onChanges(): void {
		this.myReactiveForm.get('name').valueChanges.subscribe(val => {
            localStorage.setItem('name', val)
		});
		this.myReactiveForm.get('email').valueChanges.subscribe(val => {
			localStorage.setItem('email', val)
		});
		this.myReactiveForm.get('phone').valueChanges.subscribe(val => {
			localStorage.setItem('phone', val)
		});
		this.myReactiveForm.get('message').valueChanges.subscribe(val => {
			localStorage.setItem('message', val)
		});
	}
	onLoad(): void {

		this.myReactiveForm.setValue({
			name: this.getValue('name'),
			email: this.getValue('email'),
			phone: this.getValue('phone'),
			message: this.getValue('message')
		});
	}

	getValue(key: string) {
		var someValue: any = localStorage.getItem(key);
		someValue = someValue == null ? '' : someValue;
		return someValue;
	}

	onSubmit() {

		const controls = this.myReactiveForm.controls;

		/** Проверяем форму на валидность */
		if (this.myReactiveForm.invalid) {
			/** Если форма не валидна, то помечаем все контролы как touched*/
			Object.keys(controls)
				.forEach(controlName => controls[controlName].markAsTouched());

			/** Прерываем выполнение метода*/
			return;
		}

		/* Обработка данных формы */
		console.log(this.myReactiveForm.value);
		localStorage.clear();
		this.initForm();
		this.onChanges();
	}
}