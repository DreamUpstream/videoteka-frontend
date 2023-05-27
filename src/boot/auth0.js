import { boot } from 'quasar/wrappers';
import { createAuth0 } from "@auth0/auth0-vue";


const auth0 = createAuth0({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    authorizationParams: {
        redirect_uri: process.env.AUTH0_CALLBACK_URL
    }
});

export default boot(({ app }) => {
    app.use(auth0);
});

export { auth0 };
