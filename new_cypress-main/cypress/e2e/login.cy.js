import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
           });

    it('1 Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).contains('Авторизация прошла успешно');
     })

     it('2 Восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type(data.login);
        cy.get(recovery_password_page.email).type('{enter}');
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })

    it('3 Неверный пароль и верный логин', function () {
        cy.get(main_page.email).type('german@dolnikov.ru');
        cy.get(main_page.password).type(data.login);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('4 Верный пароль и неверный логин', function () {
        cy.get(main_page.email).type('geman@dolnikov.ru');
        cy.get(main_page.password).type('iLoveqastudio1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
        cy.get(result_page.close).should('be.visible');
    })

    it('5 Ввести правильный пароль и логин без @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })

    it('6 Верный пароль и ввести логин строчными буквами', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
    })

 })