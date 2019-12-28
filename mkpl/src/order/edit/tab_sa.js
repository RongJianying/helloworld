/* eslint-disable */
import { Row, Col } from 'spark-form';
import styles from './tab.modules.css';

const SA = () => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Row className={styles.header}>
        <p className={styles.headerName}>Test Order Name</p>
      </Row>
      <Row>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Geo</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Platform</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Content Duration</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Content Rating</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Language</p>
        </Col>
      </Row>

      <Row>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>US</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>Mobile</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>30s</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>S</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>Eng</p>
        </Col>
      </Row>

      <Row>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Brand / Channel</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Genre</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>On/Off-Domain</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>Stream Type</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.detailHeader}>IP Enabled</p>
        </Col>
      </Row>

      <Row>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>COKO</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>H</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>Off</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>A</p>
        </Col>
        <Col sm="1/5">
          <p className={styles.legendTitle2}>Y</p>
        </Col>
      </Row>
    </div>
  );
};

export default SA;
