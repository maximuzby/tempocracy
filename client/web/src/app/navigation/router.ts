import { createBrowserHistory } from 'history';
import {
	HistoryAdapter,
	Route,
	RouterState,
	RouterStore,
} from 'mobx-state-router';

const routes: Route[] = [
	{
		name: 'home',
		pattern: '/',
	},
	{
		name: 'notFound',
		pattern: '/not-found',
	},
];

const notFound = new RouterState('notFound');

export const router = new RouterStore(undefined, routes, notFound);

// export class RootStore {
// 	public routerStore: RouterStore = new RouterStore(this, routes, notFound);
// }

const history = createBrowserHistory();

const historyAdapter = new HistoryAdapter(router, history);
historyAdapter.observeRouterStateChanges();
