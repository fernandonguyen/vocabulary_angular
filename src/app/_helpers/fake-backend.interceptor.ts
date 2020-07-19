import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {Vocabulary} from '@app/_models';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
const test: Vocabulary[] = [
    {
        id: '1',
        word: 'hello',
        mean: 'xin chao',
        des: 'Xin chao ay ma',
        lang: 'English',
        idUser: '1'
    }
]
let vocabularys = JSON.parse(localStorage.getItem('vocabularys')) || test;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            // tslint:disable-next-line:max-line-length
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.match(/\/vocabularys\/\d+$/) && method === 'GET':
                    return getWordsbyUser();
                case url.match(/\/addVocabularys\/\d+$/) && method === 'POST':
                    return addWordsbyUser();
                case url.match(/\/getVocabulary\/\d+$/) && method === 'GET':
                    return getVocabularyById();
                case url.match(/\/vocabulary\/\d+$/) && method === 'PUT':
                    return updateVocabularyById();
                case url.match(/\/deleteVocabulary\/\d+$/) && method === 'DELETE':
                    return deleteVocabulary();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) { return error('Username or password is incorrect'); }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            });
        }

        function register() {
            const user = body;

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken');
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) { return unauthorized(); }
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) { return unauthorized(); }

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function getVocabularyById() {
            if (!isLoggedIn()) { return unauthorized(); }
            // tslint:disable-next-line:triple-equals
            const vocabulary = vocabularys.find(x => x.id == idFromUrl());
            return ok(vocabulary);
        }

        function updateUser() {
            if (!isLoggedIn()) { return unauthorized(); }

            const params = body;
            const user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) { return unauthorized(); }

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        // tslint:disable-next-line:no-shadowed-variable
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            // tslint:disable-next-line:radix
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function getWordsbyUser() {
            if (!isLoggedIn()) { return unauthorized(); }
            // tslint:disable-next-line:triple-equals
            vocabularys = vocabularys.filter(x => x.idUser == idFromUrl());
            return ok(vocabularys);
        }

        // if (users.find(x => x.username === user.username)) {
        //     return error('Username "' + user.username + '" is already taken');
        // }
        //
        // user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        // users.push(user);
        // localStorage.setItem('users', JSON.stringify(users));
        // return ok();
        function addWordsbyUser() {
            const regex = /( |<([^>]+)>)/ig;
            if (!isLoggedIn()) { return unauthorized(); }
            const vocabulary = body;
            const  idUser = idFromUrl();
            vocabulary.id = vocabularys.length ? Math.max(...vocabularys.map(x => x.id)) + 1 : 1;
          //  vocabulary.des = vocabulary.des.replace(regex, '');
            vocabulary.idUser = idUser;
            vocabularys.push(vocabulary);
            localStorage.setItem('vocabularys', JSON.stringify(vocabularys));
            return ok();
        }

        function updateVocabularyById() {
            const regex = /( |<([^>]+)>)/ig;
            if (!isLoggedIn()) { return unauthorized(); }
            const params = body;
            // tslint:disable-next-line:triple-equals
            const vocabulary = vocabularys.find(x => x.id == idFromUrl());
           // params.des = params.des.replace(regex, '');
            Object.assign(vocabulary, params);
            localStorage.setItem('vocabularys', JSON.stringify(vocabularys));
            return ok();
        }

        function deleteVocabulary() {
            if (!isLoggedIn()) { return unauthorized(); }
            vocabularys = vocabularys.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(vocabularys));
            return ok();
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
