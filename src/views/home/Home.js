import React from 'react';
import { useWeb3Context } from 'web3-react';
import { useQuery } from '@apollo/react-hooks';
import _ from 'lodash';

import DaoList from '../../components/daoList/DaoList';
import SummonButton from '../../components/summonButton/summonButton';
import ActivateButton from '../../components/activateButton/ActivateButton';
import { GET_MOLOCHES } from '../../util/queries';
import HeroBackground from '../../assets/daohaus__hero--falling.png';

import './Home.scss';

const Home = () => {
  const context = useWeb3Context();
  const { loading, error, data } = useQuery(GET_MOLOCHES);

  console.log('error', error);

  const filterDaos = daos => {
    return _.sortBy(daos.filter(dao => !dao.apiData.hide), dao => {
      return +dao.tokenInfo.guildBankValue;
    }).reverse();
  };

  return (
    <>
      <div
        className="Hero"
        style={{ backgroundImage: 'url(' + HeroBackground + ')' }}
      >
        <h1>
          Explore the
          <br />
          Haus of Moloch
        </h1>
        <h2>
          Discover and Pledge to existing Moloch daos, or summon your own.
        </h2>
        {context.active && !context.error ? (<SummonButton />):(<ActivateButton msg={'Sign in'} />) }
      </div>
      <div className="View">
        {loading ? <p>Loading DAOs</p> : null}
        {error ? <p>Sorry there's been an error</p> : null}
        {data ? <DaoList daos={filterDaos(data.factories)} /> : null}
      </div>
    </>
  );
};

export default Home;
