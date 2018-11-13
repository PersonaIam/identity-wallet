import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';

import Downshift from 'downshift';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Search from 'mdi-material-ui/Magnify';
import { RenderInput } from 'components/FormInputs';
import debounce from "lodash/debounce";
import styles from './styles';

const renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={index + suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 300,
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

class LocationSearchForm extends Component {

  state = {
    inputValue: '',
    suggestions: [],
  };

  getSuggestions = debounce(async (inputValue) => {
    const { provider } = this.props;

    const results = await provider.search({ query: inputValue, limit: 3, });

    const suggestions = results.map(result => {
      return {
        ...result,
        name: result.label,
      };
    });

    this.setState({ suggestions });
  }, 300);

  onSuggestionSelected = async (suggestion) => {
    const { onSubmit } = this.props;
    const { suggestions } = this.state;

    const selectedSuggestion = suggestions.find((s) => s.name === suggestion);

    onSubmit(selectedSuggestion);
  };

  render() {
    const { classes, t } = this.props;

    const { inputValue, suggestions } = this.state;

    return (
      <div className={classes.searchCard}>
          <Downshift onSelect={(selection, x) => this.onSuggestionSelected(selection, x)}>
            {
              (downshiftprops) => {
                const {
                  getInputProps,
                  getItemProps,
                  isOpen,
                  selectedItem,
                  highlightedIndex
                } = downshiftprops;

                const inputProps = getInputProps();

                const initialOnchange = inputProps.onChange;

                inputProps.onChange=(event) => {
                  initialOnchange(event);

                  const inputValue = event.target.value;
                  this.setState({ inputValue });
                  this.getSuggestions(inputValue);
                };

                inputProps.disableUnderline = true;

                return (
                  <div className={classes.container}>
                    <Input
                      value={inputValue}
                      autoFocus
                      disableUnderline
                      fullWidth
                      placeholder={ t('LOCATION_SEARCH') }
                      startAdornment={
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      }
                      { ...inputProps}
                    />

                    {
                      isOpen && suggestions && suggestions.length
                        ? (
                          <Paper className={classes.paper} square>
                            {
                              suggestions
                                .map((suggestion, index) =>
                                  renderSuggestion({
                                    suggestion,
                                    index,
                                    itemProps: getItemProps({ item: suggestion.name }),
                                    highlightedIndex,
                                    selectedItem,
                                  }),
                                )
                            }
                          </Paper>
                        )
                        : null
                    }
                  </div>
                )
              }
            }
          </Downshift>
      </div>
    )
  }
}

LocationSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const withStyle = withStyles(styles)(LocationSearchForm);

export default withStyle;
