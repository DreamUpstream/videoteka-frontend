import { boot } from 'quasar/wrappers';
import { createAuth0 } from "@auth0/auth0-vue";

const auth0 = createAuth0({
    domain: 'dev-r9sh2y9g.us.auth0.com',
    clientId: 'JyuPU3Bo489j177lD0IbysztF27KYnuE',
    authorizationParams: { 
        audience: 'https://videoteka.komandospavadinimas.lt', 
        redirect_uri: window.location.origin,
    }
});

export default boot(({ app }) => {
    app.use(auth0);
});

export { auth0 };
