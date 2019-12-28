import {FormInput, Row, Col, Button} from 'spark-form';
import {PropTypes, createComponent} from 'spark-modula';
import CreateOrderModel from '../models/create_order_model'
import { Link } from 'spark-link';
import { FormSelect } from 'spark-form';
import { DateRangeComponent, DateRangeModel } from 'spark-calendar';
import { Tab, TabItem } from 'spark-navigation';
import { TABS } from '../models/create_order_model';
import { HorizontalTable, VerticalTable } from 'spark-table';


const columns = [
  'External Field',
  'External ID'
];
const cells = [
  ['Contract ID', '123456']
];

const columns2 = [
  'First Name',
  'Last Name',
  'Phone',
  'Email Address'
];
const cells2 = [
  ['Kathy', 'Molsness', '123-456-7890', 'KM@comcacst.com']
];

const impsSelectOptions = [
  { label: 'LifeCycle', value: 'life_cycle' },
];
const pacingSelectOptions = [
  { label: 'Fast As', value: 'fast_as' },
];

function switchTab(model, tab) {
  model.sendTabToggle(tab);
}

const AdditionalOrderInfo = ({_}) =>
  <div>
    <h2 style={ { paddingLeft: '10px', borderBottomStyle: 'solid', borderBottomWidth: '1px', margin: '15px' } }>{_('External IDs')}</h2>
    <Row style={ { paddingLeft: '10px' }}>
      <Col sm="1/3">
        <HorizontalTable columns={columns} cells={cells} />
      </Col>
    </Row>
    <h2 style={ { paddingLeft: '10px', borderBottomStyle: 'solid', borderBottomWidth: '1px', margin: '15px' } }>{_('Contacts')}</h2>
    <Row style={ { paddingLeft: '10px' }}>
      <Col sm="1/3">
        <p>{_('Select from MRM User')}</p>
        <FormInput/>
      </Col>
      <Col sm="1/2">
        <p>{_('Contact Overview')}</p>
        <VerticalTable columns={columns2} cells={cells2} />
      </Col>
    </Row>
  </div>;

const ListingSetup = ({listingItems, _}) =>
  <div>
    <Row style={ { paddingLeft: '30px', borderStyle: 'solid', borderWidth: '1px', margin: '5px' } }>
      <Col sm="1/2" style={{ borderRightStyle: 'solid', borderRightWidth: '1px' }}>
        <h3 style={{ marginTop:'15px' }}><strong>{_('SETUP LISTING ITEMS')}</strong></h3>
        <Row style={ { paddingLeft: '20px' } }>
          <Col sm="1/2">
            <p>{_('01/01/2020 - 12/31/2020')}</p>
          </Col>
          <Link style={{ float:'right' }}>
            {_('View Listing Details')}
          </Link>
        </Row>
        <Row style={ { paddingLeft: '20px' } }>
          <Col>
            <p><strong>{_('Listing 1')}</strong></p>
          </Col>
        </Row>
        <Row style={ { paddingLeft: '20px' } }>
          <Col>
            <p>{_('SELL BY VENDOR-BRAND-CHANNEL')}</p>
          </Col>
        </Row>
        <Row style={ { paddingLeft: '20px' } }>
          <Col sm="1/4">
            <p>{_('HARD GUARANTEED')}</p>
          </Col>
          <Col sm="24/100">
            <p>{_('NATIONAL')}</p>
          </Col>
        </Row>
      </Col>
      <Col sm="49/100">
        <Row>
          <h3 style={{ margin:'15px' }}><strong>{_('Acquired Price $15,00 CPM')}</strong></h3>
        </Row>
        <Row>
          <Col sm="1/5">
            <p>{_('Budget Goal')}</p>
          </Col>
          <Col sm="1/5">
            <FormInput/>
          </Col>
          <Col sm="1/9">
            <p>{_('Imps Per')}</p>
          </Col>
          <Col sm="1/5">
            <FormSelect
              options={impsSelectOptions}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="1/5">
            <p>{_('Flighting Date')}</p>
          </Col>
          <Col sm="3/5">
            <DateRangeComponent
              model={listingItems.get(0) ? listingItems.get(0).get('line_flighting_date') : new DateRangeModel()}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="1/5">
            <p>{_('Pacing')}</p>
          </Col>
          <Col sm="2/5">
            <FormSelect
              options={pacingSelectOptions}
            />
          </Col>
        </Row>
      </Col>
    </Row>
    {/*<div style={{ float:'right' }}>*/}
    {/*  <Button>Cancel</Button>*/}
    {/*  <Button type="primary">Place the order</Button>*/}
    {/*</div>*/}
  </div>;

const CreateOrderComponent = createComponent({
  displayName: 'CreateOrderComponent',
  propTypes: {
    model: PropTypes.instanceOf(CreateOrderModel).isRequired
  },
  contextTypes: {
    gettext: PropTypes.func
  },

  render() {
    const {model} = this.props;
    const listingItems = model.get('listing_items');
    const { gettext: _ } = this.context;
    return (
      <div style={{ width: '1000px', margin:'20px auto' }}>
        <Row>
          <Col sm="4/5">
            <h2>{_('Review Your Marketplace Order')}</h2>
          </Col>
          <div style={{ float:'right' }}>
            <Button>Cancel</Button>
            <Button type="primary">Place the order</Button>
          </div>
        </Row>
        <Row style={ { paddingLeft: '30px', borderStyle: 'solid', borderWidth: '1px', margin: '5px' } }>
          <Col sm="1/2" style={{ borderRightStyle: 'solid', borderRightWidth: '1px' }}>
            <h3 style={{ marginTop:'15px' }}><strong>{_('ORDER SUMMARY')}</strong></h3>
            <Row style={ { paddingLeft: '20px' } }>
              <Col sm="1/2">
                <p><strong>{_('Flighting Date')}</strong></p>
              </Col>
              <Col sm="49/100">
                <p><strong>{_('Gross Cost')}</strong></p>
              </Col>
            </Row>
          </Col>
          <Col sm="49/100">
            <h3 style={{ marginTop:'15px' }}><strong>{_('ORDER IDENTITY')}</strong></h3>
            <Row>
              <Col sm="1/3">
                <p>{_('Name: ')}</p>
              </Col>
              <Col sm="1/3">
                <FormInput/>
              </Col>
            </Row>
            <Row>
              <Col sm="1/3">
                <p>{_('Description: ')}</p>
              </Col>
              <Col sm="1/3">
                <FormInput/>
              </Col>
            </Row>
            <Row>
              <Col sm="45/100">
                <p>{_('Contact')}</p>
              </Col>
              <Col sm="45/100">
              </Col>
            </Row>
          </Col>
        </Row>

        <Tab>
          {TABS.map(tab => (
            <TabItem
              key={tab}
              active={model.isActiveTab(tab)}
              onClick={() => switchTab(model, tab)}
            >
              {tab}
            </TabItem>
          ))}
        </Tab>
        {model.get('activeTab') === 'Listing Setup'  && <ListingSetup listingItems={listingItems} _={_}/>}
        {model.get('activeTab') === 'Additional Order Info'  && <AdditionalOrderInfo _={_}/>}
      </div>
    );
  }
});

export default CreateOrderComponent;
