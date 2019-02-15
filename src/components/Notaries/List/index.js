/**
 * Created by vladtomsa on 12/11/2018
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NotaryListItem from './ListItem/index';


class NotaryList extends PureComponent {
  state = {
    activeTab: 0,
  };

  render() {
    const { favoriteNotaries, notaryInfoList, onMessage, onSelect, t } = this.props;

    return (
      <Fragment>
        {
          notaryInfoList && notaryInfoList.length
            ? (
              notaryInfoList.map((notaryInfo, index) => {
                return (
                  <NotaryListItem
                    key={index}
                    favoriteNotaries={favoriteNotaries}
                    notaryInfo={notaryInfo}
                    onMessage={onMessage}
                    onSelect={onSelect}
                    t={t}
                  />
                );
              })
            )
            : (
              <Typography variant="body1">
                {t('NO_NOTARIES_AVAILABLE')}
              </Typography>
            )

        }
      </Fragment>
    );
  }
}

NotaryList.propTypes = {
  notaryInfoList: PropTypes.array.isRequired,
  favoriteNotaries: PropTypes.object.isRequired,
  onMessage: PropTypes.func,
  onSelect: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default NotaryList;
