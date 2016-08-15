import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

export default Router.extend({
  location: config.locationType
}).map(function() {
});
