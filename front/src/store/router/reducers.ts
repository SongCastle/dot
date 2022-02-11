import { connectRouter, routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const reducer = connectRouter(history);
export const routerMiddleware = createRouterMiddleware(history);
