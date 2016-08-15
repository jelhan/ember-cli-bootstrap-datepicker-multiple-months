import Ember from 'ember';
import layout from '../templates/components/bootstrap-datepicker-inline-multiple-months';

const { $, Component, computed, isArray, run } = Ember;

export default Component.extend({
  actions: {
    dateChanged(position, date) {
      // if multidate is `true` date is an array
      // in this case last element is used by bootstrap-datepicker to set viewDate
      let viewDate = isArray(date) ? date[date.length - 1] : date;
      this.send('monthChanged', position, viewDate);
    },
    monthChanged(position, viewDate) {
      let datepickers = this.get('childViews');
      datepickers.forEach((datepicker, index) => {
        if (index === position) {
          return;
        }

        let el = datepicker.get('element');
        let divInMonth = index - position;
        let newViewDate = new Date(
          Date.UTC(
            viewDate.getFullYear(),
            viewDate.getMonth() + divInMonth,
            1
          )
        );

        run.schedule('afterRender', () => {
          $(el).datepicker('_setDate', newViewDate, 'view');
        });
      });
    }
  },
  calendars: computed('count', 'defaultViewDate', {
    get() {
      let calendars = [];
      let count = this.get('count');
      let defaultViewDate = this.get('defaultViewDate');

      for (let i = 0; i < count; i++) {
        let monthToAdd = i;
        let month = (defaultViewDate.month + monthToAdd) % 12;
        let year = defaultViewDate.year + Math.floor((defaultViewDate.month + monthToAdd) / 12);

        calendars.push({
          defaultViewDate: {
            day: defaultViewDate.day,
            month,
            year
          }
        });
      }

      return calendars;
    }
  }),
  defaultViewDate: {
    year: new Date().getFullYear(),
    month: 0,
    day: 1
  },
  count: 2,
  layout,
  value: null
});
