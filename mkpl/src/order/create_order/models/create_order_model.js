import { createModel, PropTypes, ImmutablePropTypes, createConstants } from 'spark-modula';
import {List} from 'immutable';
import { DateRangeModel } from 'spark-calendar';

const ActionTypes = createConstants('TAB_DEMO', {
  TAB_TOGGLE: null
});

export const TABS = ['Listing Setup', 'Additional Order Info'];

const CreateOrderModel = createModel({
  displayName: 'CreateOrderModel',

  propTypes: {
    name: PropTypes.string,
    description: PropTypes.string,
    order_summary: ImmutablePropTypes.map,
    listing_items: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      listing_name: PropTypes.string,
      line_budget_goal: PropTypes.number,
      line_imps_per: PropTypes.string,
      line_flighting_date: PropTypes.instanceOf(DateRangeModel),
      line_pacing: PropTypes.string
    })),
    activeTab: PropTypes.string
  },

  defaults: {
    name: '',
    description: '',
    order_summary: null,
    listing_items: () => new List(),
    activeTab: 'Listing Setup'
  },

  sendTabToggle(tab) {
    this.dispatch({
      type: ActionTypes.TAB_TOGGLE,
      payload: { tab }
    });
  },

  recvTabToggle() {
    return {
      type: ActionTypes.TAB_TOGGLE,
      update(model, action) {
        const { tab } = action.payload;
        return [model.set('activeTab', tab)];
      }
    };
  },

  isActiveTab(tab) {
    return tab === this.get('activeTab');
  }
});

export default CreateOrderModel;
