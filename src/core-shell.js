import * as singleSpa from 'single-spa';
import { menuData } from './topmenu.js'; 

function registerApps(){
	
	singleSpa.registerApplication('navbar', () => import('./core/navbar/navbar.app.js'), () => true);
	singleSpa.registerApplication('dashboard', () => import('./core/dashboard/dashboard.app.js'), () => location.pathname === "" || location.pathname === "/");
	
	singleSpa.start();
}

function pathPrefix(prefix) {
    return function(location) {
        return location.pathname.indexOf(`${prefix}`) === 0;
    }
}

// Register the apps
registerApps();
