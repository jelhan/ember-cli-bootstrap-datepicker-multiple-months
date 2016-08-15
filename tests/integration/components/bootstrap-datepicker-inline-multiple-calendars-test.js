import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('bootstrap-datepicker-inline-multiple-months', 'Integration | Component | bootstrap datepicker inline multiple months', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.set('count', 3);
  this.render(hbs`
    {{bootstrap-datepicker-inline-multiple-months count=count}}
  `);
  assert.equal(this.$('.datepicker').length, 3, 'it renders correct amount of datepickers');

  this.set('count', 4);
  assert.equal(this.$('.datepicker').length, 4, 'it observes changes to count');
});

test('it shows month in correct order', function(assert) {
  assert.expect(3);
  this.set('count', 4);
  this.set('defaultViewDate', {
    year: 2015,
    month: 10,
    day: 1
  });
  this.render(hbs`
    {{bootstrap-datepicker-inline-multiple-months count=count defaultViewDate=defaultViewDate}}
  `);
  assert.deepEqual(
    this.$('.datepicker .datepicker-switch:visible').toArray().map((el) => $(el).text()),
    ['November 2015', 'December 2015', 'January 2016', 'February 2016']
  );
  run(() => {
    this.$('.datepicker:visible').first().find('.next:visible').click();
  });
  assert.deepEqual(
    this.$('.datepicker .datepicker-switch:visible').toArray().map((el) => $(el).text()),
    ['December 2015', 'January 2016', 'February 2016', 'March 2016']
  );
  run(() => {
    this.$('.datepicker:visible').last().find('.prev:visible').click();
  });
  assert.deepEqual(
    this.$('.datepicker .datepicker-switch:visible').toArray().map((el) => $(el).text()),
    ['November 2015', 'December 2015', 'January 2016', 'February 2016']
  );
});

test('all calendar show same dates', function(assert) {
  assert.expect(1);
  this.set('dates', []);
  this.render(hbs`
    {{bootstrap-datepicker-inline-multiple-months count=2 multidate=true value=dates}}
  `);
  let dates = [new Date(2015, 0, 1), new Date(2015, 4, 1)];
  let datepickers = this.$().children().eq(0).children();
  datepickers.eq(0).datepicker('setDates', dates);
  assert.deepEqual(
    datepickers.eq(1).datepicker('getDates').map((date) => date.toISOString()),
    dates.map((date) => date.toISOString())
  );
});
