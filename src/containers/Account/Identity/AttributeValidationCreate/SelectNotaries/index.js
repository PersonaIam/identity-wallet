/**
 * Created by vladtomsa on 2019-02-15
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NotaryList from 'components/Notaries/List';
import NotariesSearchForm from 'components/Notaries/SearchForm';

const NOTARY_LIST_TABS = [
  {name: 'SEARCH', value: 0},
  {name: 'FAVORITES', value: 1},
];

class SelectNotaries extends Component {
  state = {
    isSearchSubmitted: false,
    notarySelectTab: NOTARY_LIST_TABS[0].value,
  };

  toggleIsSearchSubmitted = () => {
    this.setState((prevState) => ({
      ...prevState,
      isSearchSubmitted: !prevState.isSearchSubmitted,
    }));
  };

  toggleSelectNotaryTab = (event, value) => {
    this.setState({notarySelectTab: value});
  };

  render() {
    const {
      favoriteNotaries,
      notaryInfoList,
      onSearchSubmit,
      onSelectNotary,
      t,
    } = this.props;

    const {
      isSearchSubmitted,
      notarySelectTab,
    } = this.state;

    const getTabLabel = (index) => {
      switch (index) {
        case 1:
          return `${t(NOTARY_LIST_TABS[index].name)} (${Object.keys(favoriteNotaries).length})`;
        default:
          return t(NOTARY_LIST_TABS[index].name);
      }
    };

    const isSearchTab = notarySelectTab === NOTARY_LIST_TABS.find(tab => tab.name === 'SEARCH').value;

    const displayNotaryList = isSearchTab
      ? notaryInfoList
      : Object
        .keys(favoriteNotaries)
        .map(key => favoriteNotaries[key].notaryInfo);

    return (
      <Paper>
        <AppBar position="static" color="primary">
          <Tabs value={notarySelectTab} onChange={this.toggleSelectNotaryTab}>
            {
              NOTARY_LIST_TABS.map((tab, index) => (
                <Tab value={tab.value} key={tab.value} label={getTabLabel(index)}/>
              ))
            }
          </Tabs>
        </AppBar>

        {
          isSearchTab
            ? (
              isSearchSubmitted
                ? (
                  'will need to implement back to search'
                )
                : (
                  <NotariesSearchForm
                    onSubmit={
                      (values) => {
                        onSearchSubmit(values);
                        this.toggleIsSearchSubmitted();
                      }
                    }
                    t={t}
                  />
                )
            )
            : null
        }

        {
          displayNotaryList && displayNotaryList.length
            ? (
              <CardContent>
                <NotaryList
                  notaryInfoList={displayNotaryList}
                  favoriteNotaries={favoriteNotaries}
                  onSelect={onSelectNotary}
                  t={t}
                />
              </CardContent>
            )
            : null
        }
      </Paper>
    )
  }
}

SelectNotaries.propTypes = {
  favoriteNotaries: PropTypes.object.isRequired,
  notaryInfoList: PropTypes.array,
  onSearchSubmit: PropTypes.func.isRequired,
  onSelectNotary: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default SelectNotaries;
