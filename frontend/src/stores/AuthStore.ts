import { defineStore } from 'pinia';

const LOCALSTORAGE_DUOLINGO_JWT_TOKEN: string = 'duolingo_jwt_token';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            authenticationModalIsOpen: false as boolean,

            duolingoJwtToken: null as string | null,
        }
    },
    actions: {
        initialize(): void {
            this.duolingoJwtToken = window.localStorage.getItem(LOCALSTORAGE_DUOLINGO_JWT_TOKEN);
        },
        saveDuolingoJwtToken(jwtToken: string | null): void {
            this.duolingoJwtToken = jwtToken;

            if (! jwtToken) {
                window.localStorage.removeItem(LOCALSTORAGE_DUOLINGO_JWT_TOKEN);

                return;
            }

            window.localStorage.setItem(LOCALSTORAGE_DUOLINGO_JWT_TOKEN, jwtToken);
        }
    }
});
