/**
 * Created by vladtomsa on 2019-02-12
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Heart from 'mdi-material-ui/Heart';
import HeartOutline from 'mdi-material-ui/HeartOutline';
import HeartOff from 'mdi-material-ui/HeartOff';
import { saveFavNotary, removeFavNotary } from 'actions/notaries';
import { notariesConstants } from 'constants/notaries';

class NotaryFavButton extends Component {
  state = {
    isHovered: false,
  };

  renderIcon = (isFavorite) => {
    const {isHovered} = this.state;
    const {t} = this.props;

    if (isFavorite) {
      if (isHovered) {
        return (
          <Tooltip title={t('REMOVE_FROM_FAVORITES')}>
            <HeartOff />
          </Tooltip>
        );
      } else {
        return <Heart/>
      }
    } else {
      if (isHovered) {
        return (
          <Tooltip title={t('ADD_TO_FAVORITES')}>
            <Heart />
          </Tooltip>
        );
      } else {
        return <HeartOutline/>
      }
    }
  };

  render() {
    const {isLoading, favoriteNotaries, notaryInfo, removeFavNotary, saveFavNotary} = this.props;

    if (
      isLoading === notariesConstants.ON_SAVE_FAV_NOTARY_INIT + notaryInfo.id
      || isLoading === notariesConstants.ON_REMOVE_FAV_NOTARY_INIT + notaryInfo.id
    ) {
      return <CircularProgress size={24} color="secondary"/>
    }

    const isFavorite = !!favoriteNotaries[notaryInfo.id];

    const onClick = isFavorite
      ? () => removeFavNotary(favoriteNotaries[notaryInfo.id].id, notaryInfo.id)
      : () => saveFavNotary(notaryInfo.id);

    return (
      <IconButton
        color={isFavorite ? 'secondary' : 'default'}
        onClick={onClick}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {this.renderIcon(isFavorite)}
      </IconButton>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.notaries.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveFavNotary: (notaryId) => dispatch(saveFavNotary(notaryId)),
    removeFavNotary: (id, notaryId) => dispatch(removeFavNotary(id, notaryId)),
  };
};

NotaryFavButton.propTypes = {
  favoriteNotaries: PropTypes.object.isRequired,
  notaryInfo: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(NotaryFavButton);

