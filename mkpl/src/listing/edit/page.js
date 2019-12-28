import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

import { DataRights } from './tab_data_rights';
import { General } from './tab_general';
import { Insights } from './tab_insights';
import { Inventory } from './tab_inventory';
import styles from './edit.modules.css';

// TODO: add style for the back icon per mockup, there should be an icon symbol replaced for.
const BackToList = ({ targetHref }) => (
  <Link className={styles.navBack} to={targetHref}>
    <div>⇽ Back to listing list</div>
  </Link>
);

const basicInfoTitles = [
  'STATUS',
  'DELIVERY STATUS',
  'LISTING ID',
  'AVAILABILITY',
  'TOTAL OF ITEMS'
];
const titlesMap = {
  STATUS: {
    fieldKey: 'status',
    colWidth: '15%'
  },
  'DELIVERY STATUS': {
    fieldKey: 'delivery_status',
    colWidth: '20%'
  },
  'LISTING ID': {
    fieldKey: 'listing_id',
    colWidth: '20%'
  },
  AVAILABILITY: {
    fieldKey: 'availability',
    colWidth: '30%'
  },
  'TOTAL OF ITEMS': {
    fieldKey: 'total_items',
    colWidth: '15%'
  }
};

const BasicInfo = ({ data }) => {
  return (
    <table className={styles.infoTable}>
      <colgroup>
        {basicInfoTitles.map(title => (
          <col key={title} style={{ width: titlesMap[title].colWidth }} />
        ))}
      </colgroup>
      <tbody>
        <tr>
          {basicInfoTitles.map(title => (
            <th key={title} align="left" className={styles.infoTitle}>
              {title}
            </th>
          ))}
        </tr>
        <tr>
          {basicInfoTitles.map(title => (
            <td
              key={title}
              align="left"
              className={title === 'STATUS' ? styles.statusInfoContent : styles.infoContent}
            >
              {data[titlesMap[title].fieldKey]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const tabs = ['general', 'inventory', 'data_rights', 'insights'];
const tabNameMap = {
  general: 'General',
  inventory: 'Inventory',
  data_rights: 'Data Rights',
  insights: 'Insights'
};

const Body = ({ tab, data }) => {
  return (
    <React.Fragment>
      {tab === 'general' && <General data={data} onSubmit={() => {}} />}
      {tab === 'inventory' && <Inventory data={data} onSubmit={() => {}} />}
      {tab === 'data_rights' && <DataRights data={data} onSubmit={() => {}} />}
      {tab === 'insights' && <Insights data={data} onSubmit={() => {}} />}
    </React.Fragment>
  );
};

export const ListingEdit = props => {
  // TODO: currently below used as mocked data
  const {
    params: { networkID, id, tab }
  } = props;
  const mockData = {
    tab,
    id: 12345,
    data: {
      data: {
        name: 'HALLOWEEN HORROR MOVIES',
        status: 'Future',
        delivery_status: 'Guaranteed',
        listing_id: '568-HIR-459',
        availability: '3 Oct. 2019 > 30 Oct. 2019',
        total_items: 138
      }
    }
  };
  const { data } = mockData;
  const isLoading = false;
  const targetHref = `/app/${networkID}/mkpl/listing`;

  return (
    <div style={{ opacity: isLoading ? 0.5 : 1 }}>
      <div className={styles.editPageHeader}>
        <div className={styles.header}>
          <BackToList targetHref={targetHref} />
          <div className={styles.headerName}>{data && data.data.name}</div>
        </div>
        {data && <BasicInfo data={data.data} />}
        <div className={styles.tabs}>
          {tabs.map(t => {
            // TODO: will adopt new themed tab in the near future
            return (
              <Link key={t} to={`${targetHref}/${id}/edit/${t.toLowerCase()}`}>
                <div className={classNames(styles.tab, mockData.tab === t && styles.active)}>
                  {tabNameMap[t]}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Body tab={mockData.tab} data={data ? data.data : undefined} />
    </div>
  );
};
