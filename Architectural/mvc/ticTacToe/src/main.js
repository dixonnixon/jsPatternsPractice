import Controller from './controller';
import ConfigLoader from './configLoader';


const app = new Controller(new ConfigLoader());

app.run();